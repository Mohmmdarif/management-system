export class CustomError extends Error {
  statusCode;
  details;

  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}