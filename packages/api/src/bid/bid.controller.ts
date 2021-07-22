import { Observable, of } from 'rxjs';
import { Controller, UseGuards, Put, Req, Body } from '@nestjs/common';
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { Request } from "express";
import { BidService } from '../bid/bid.service'
import { BidDto } from './dto'
import { UserObservable } from '@shared/types'

@Controller('bid')
export class BidController {
    constructor(private readonly bidService: BidService) {}

    @Put('create')
    @UseGuards(JwtAuthGuard)
    create(@Req() req: Request, @Body() bid: BidDto) {
        return this.bidService.create(req.user as UserObservable, bid)
    }
}
