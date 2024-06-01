export class HandleError extends Error {
  constructor(message = 'Something went wrong.') {
    super(message);
    this.name = 'HandleError';
  }
}
