export default interface IResult {
  code: number;
  msg: string;
}

export class Result implements IResult {
  readonly code: number;
  readonly msg: string;
  constructor(httpStatus: number, msg: string) {
    this.code = httpStatus;
    this.msg = msg;
  }

  wasSuccessful(): boolean {
    return this.code >= 200 && this.code < 300;
  }
}
