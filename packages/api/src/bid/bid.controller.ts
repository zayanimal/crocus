import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { Request } from "express";
import { BidService } from '../bid/bid.service'

@Controller('bid')
export class BidController {
    constructor(private readonly bidService: BidService) {}

    @Get('current')
    @UseGuards(JwtAuthGuard)
    current(@Req() req: Request) {
        return req.user;
    }
}
