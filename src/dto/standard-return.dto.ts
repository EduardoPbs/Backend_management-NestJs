export class StandardReturnDto {
  constructor(
    private readonly message: string,
    private readonly content?: Object,
  ) {}
}
