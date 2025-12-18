import { Data } from "effect";

export class FileIOError extends Data.TaggedError("FileIOError")<{
  cause?: unknown;
  message?: string;
}> {}

export class EnvError extends Data.TaggedError("EnvError")<{
  variable: string;
}> {}

export class ParseError extends Data.TaggedError("ParseError")<{
  cause?: unknown;
  message?: string;
}> {}
