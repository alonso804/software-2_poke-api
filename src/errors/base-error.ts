class BaseError extends Error {
  constructor(public status = 500, message: string) {
    super(message);
    this.status = status;
  }
}

export default BaseError;
