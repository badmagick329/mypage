import { EnvError, FileIOError } from "@/lib/errors";
import { Effect, Schedule } from "effect";

const tryReadFile = (filePath: string) =>
  Effect.tryPromise(() =>
    import("fs/promises").then((fs) => fs.readFile(filePath, "utf-8")),
  );

const tryWriteFile = (filePath: string, content: string) =>
  Effect.tryPromise(() =>
    import("fs/promises").then((fs) => fs.writeFile(filePath, content)),
  );

const readFileWithBackoff = (filePath: string) =>
  tryReadFile(filePath).pipe(
    Effect.retryOrElse(
      Schedule.exponential("100 millis").pipe(
        Schedule.union(Schedule.recurs(4)),
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
