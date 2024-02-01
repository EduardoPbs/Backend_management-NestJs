export class ShowProductDto {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly value: number,
    ) {}
}