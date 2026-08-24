export class ExistingUserError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ExistingUserError';
    // Restore prototype chain
    Object.setPrototypeOf(this, ExistingUserError.prototype);
  }
}

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
    // Restore prototype chain
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class ExistingPixKeyError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ExistingPixKeyError';
    // Restore prototype chain
    Object.setPrototypeOf(this, ExistingPixKeyError.prototype);
  }
}

