import {
    Controller,
    Get,
    Put,
    Req,
    UseGuards,
    Body
} from "@nestjs/common";
import { Request } from 'express'
import { BrandService } from "@brand/brand.service";
import { BrandDto } from '@brand/dto'
import { UserObservable } from '@shared/types'
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";

@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Put('create')
    @UseGuards(JwtAuthGuard)
    create(@Req() req: Request, @Body() brand: BrandDto) {
        return this.brandService.create(req.user as UserObservable, brand);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getList(@Req() req: Request) {
        return this.brandService.getList(req.user as UserObservable);
    }
}
