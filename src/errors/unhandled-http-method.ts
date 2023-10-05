import BaseError from './base-error';

class UnhaldeledHTTPMethodError extends BaseError {
  constructor(method: string) {
    super(500, `Unhandled HTTP Method: ${method}`);
  }
}

export default UnhaldeledHTTPMethodError;
