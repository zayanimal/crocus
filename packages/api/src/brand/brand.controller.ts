import {
    Controller,
    Delete,
    Get,
    Put,
    Param,
    Query,
    UseGuards,
    ParseIntPipe,
    Body
} from "@nestjs/common";
import { BrandService } from "@brand/brand.service";
import { BrandDto } from '@brand/dto'

@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Put('create')
    create(@Body() brand: BrandDto) {
        return this.brandService.create(brand);
    }

    @Get()
    getList() {
        return this.brandService.getList();
    }
}
