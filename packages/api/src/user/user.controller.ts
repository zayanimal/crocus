import {
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  Body,
} from "@nestjs/common";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@auth/guards/roles.guard";
import { UserService } from "@user/user.service";
import { Roles } from "@auth/decorators/roles.decorator";
import { CreateUserDto } from "@user/dto/create-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("search/:username")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  search(@Param("username") username: string) {
    return this.userService.search(username);
  }

  @Get(":username")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  findOne(@Param("username") username: string) {
    return this.userService.findUserForEdit(username);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  getUsers(
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number
  ) {
    return this.userService.getUsers(page, limit);
  }

  @Put("edit/:username")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  editUser(
    @Param("username") username: string,
    @Body() editUser: CreateUserDto & { isActive: boolean }
  ) {
    return this.userService.editUser(username, editUser);
  }

  @Delete(":username")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  removeUser(@Param("username") username: string) {
    return this.userService.removeUser(username);
  }
}
