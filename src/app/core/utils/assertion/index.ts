export class AssertionError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'Assertion Error';
  }
}

export function asserts(cond: unknown, message?: string): asserts cond {
  if (!cond) {
    throw new AssertionError(message);
  }
}
