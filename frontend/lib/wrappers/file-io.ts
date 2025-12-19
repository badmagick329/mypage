import { EnvError, FileIOError } from "@/lib/errors";
import { CachedData } from "@/lib/types";
import { parseJson, timestampLog } from "@/lib/wrappers";
import { Effect, Schedule } from "effect";

const tryReadFile = (filePath: string) =>
  Effect.tryPromise({
    try: () =>
      import("fs/promises").then((fs) => fs.readFile(filePath, "utf-8")),
    catch: (error) => new FileIOError({ cause: error }),
  });

const tryWriteFile = (filePath: string, content: string) =>
  Effect.tryPromise(() =>
    import("fs/promises").then((fs) => fs.writeFile(filePath, content)),
  );

export const tryStatFile = (filePath: string) =>
  Effect.tryPromise({
    try: () => import("fs/promises").then((fs) => fs.stat(filePath)),
    catch: (error) => new FileIOError({ cause: error }),
  });

export const loadFileWithInMemoryCache = <T>(
  filename: string,
  cachedData: CachedData<T>,
  postProcessData?: (rawData: T) => T,
) =>
  Effect.gen(function* () {
    const dataDir = getDataDir();
    if (!dataDir) {
      return yield* Effect.fail(new EnvError({ variable: "DATA_DIR" }));
    }
    const fullName = `${dataDir}/${filename}`;

    const stat = yield* tryStatFile(fullName);
    if (stat.mtimeMs === cachedData.lastUpdate && cachedData.data !== null) {
      timestampLog("Returning in-memory cached");
      return cachedData.data as T;
    }
    const content = yield* tryReadDataFile(filename);

    let parsed = yield* parseJson<T>(content);
    if (postProcessData) {
      parsed = postProcessData(parsed);
    }

    cachedData.data = parsed;
    cachedData.lastUpdate = stat.mtimeMs;
    timestampLog("Updated in-memory cache");
    return parsed as T;
  });

const readFileWithBackoff = (filePath: string) =>
  Effect.suspend(() => tryReadFile(filePath)).pipe(
    Effect.retryOrElse(
      Schedule.exponential("50 millis").pipe(
        Schedule.intersect(Schedule.recurs(4)),
      ),
      (error) => Effect.fail(new FileIOError({ cause: error })),
    ),
  );

const writeFileWithBackoff = (filePath: string, content: string) =>
  tryWriteFile(filePath, content).pipe(
    Effect.retryOrElse(
      Schedule.exponential("100 millis").pipe(
        Schedule.union(Schedule.recurs(4)),
      ),
      (error) => Effect.fail(new FileIOError({ cause: error })),
    ),
  );

export const tryReadDataFile = (filename: string) =>
  Effect.gen(function* () {
    const dataDir = getDataDir();
    if (!dataDir) {
      return yield* Effect.fail(new EnvError({ variable: "DATA_DIR" }));
    }
    const fullName = `${dataDir}/${filename}`;
    return yield* readFileWithBackoff(fullName);
  });

export const tryWriteDataFile = (filename: string, content: string) =>
  Effect.gen(function* () {
    const dataDir = getDataDir();
    if (!dataDir) {
      return yield* Effect.fail(new EnvError({ variable: "DATA_DIR" }));
    }
    const fullName = `${dataDir}/${filename}`;
    return yield* writeFileWithBackoff(fullName, content);
  });

function getDataDir(): string | undefined {
  return process.env.DATA_DIR;
}
