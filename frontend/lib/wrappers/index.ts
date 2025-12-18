import { ParseError } from "@/lib/errors";
import { Effect } from "effect";

export const timestampLog = (...args: unknown[]) =>
  console.log(`[${new Date().toISOString()}] - `, ...args);

export const parseJson = <T>(content: string) =>
  Effect.sync(() => JSON.parse(content) as T).pipe(
    Effect.mapError(
      (error) =>
        new ParseError({
          cause: error,
          message: "Failed to parse json",
        }),
    ),
  );
