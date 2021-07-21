import { IsNotEmpty } from "class-validator";

export class BrandDto {
    @IsNotEmpty()
    type!: string;

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    brandNames!: string;

    @IsNotEmpty()
    shopsTotal!: number;

    @IsNotEmpty()
    shopsInMalls!: number;

    @IsNotEmpty()
    malls!: string;
}
