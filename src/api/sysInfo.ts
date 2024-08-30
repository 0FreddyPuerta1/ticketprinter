import os from "os";

export function getSystemArchitecture(): string {
  return os.arch();
}
