import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BrandService } from '@brand/brand.service'
import { BrandController } from '@brand/brand.controller'
import { Brand } from '@brand/entities'

@Module({
    imports: [
        TypeOrmModule.forFeature([Brand])
    ],
    providers: [BrandService],
    controllers: [BrandController]
})
export class BrandModule {}
