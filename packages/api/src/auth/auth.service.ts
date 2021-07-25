import { Observable, of, from, throwError } from "rxjs";
import { map, mergeMap, mapTo } from "rxjs/operators";
import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "@user/user.service";
import { CreateUserDto } from "@user/dto/create-user.dto";
import { LoginUserDto } from "@user/dto/login-user.dto";
import { LoginStatus } from "@auth/interfaces/login-status.interface";
import { JwtPayload } from "@auth/interfaces/payload.interface";
import { User, UserInfo } from "@user/entities";
import { Role } from "@auth/entities/role.entity";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserInfo)
        private readonly userInfoRepository: Repository<UserInfo>,
        @InjectRepository(Role)
        private readonly rolesRepository: Repository<Role>,
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    public register(userDto: CreateUserDto): Observable<{ message: string }> {
        const { username, role, info, ...rest  } = userDto;

        return this.checkUser(username).pipe(
            mergeMap(() => this.checkRole(role).pipe(map(({ id }) => id))),
            mergeMap((roleId) =>
              of(this.userRepository.create({ username, ...rest })).pipe(
                map((newUser) => {
                  newUser.roleId = roleId;

                  return newUser;
                })
              )
            ),
            mergeMap((readyUser) => from(this.userRepository.save(readyUser))),
            map((savedUser) => this.userInfoRepository.create({ ...info, userId: savedUser.id})),
            mergeMap((userInfo) => from(this.userInfoRepository.save(userInfo))),
            mapTo({ message: `Пользователь ${username} добавлен` })
        );
    }

    public login({ username, password }: LoginUserDto): Observable<LoginStatus> {
        return from(
          this.userRepository.findOne({
            where: { username },
            relations: ["role"],
          })
        ).pipe(
          mergeMap((user) =>
            user
              ? from(compare(password, user.password)).pipe(
                  mergeMap((state) =>
                    state
                      ? of(user)
                      : throwError(
                          new HttpException(
                            "Неверный пароль",
                            HttpStatus.UNAUTHORIZED
                          )
                        )
                  )
                )
              : throwError(
                  new HttpException(
                    "Пользователь не найден",
                    HttpStatus.UNAUTHORIZED
                  )
                )
          ),
          map((user) => ({
            username: user.username,
            accessToken: this.jwtService.sign({
              id: user.id,
              username: user.username,
            }),
            role: user.role.name
          }))
        );
    }

    public validateUser(payload: JwtPayload) {
        return this.userService.findByUsername(payload.username);
    }

    private checkUser(username: string) {
      return from(this.userRepository.findOne({ where: { username } })).pipe(
          mergeMap((user) =>
            user
              ? throwError(
                  new HttpException(
                    "Пользователь уже существует",
                    HttpStatus.BAD_REQUEST
                  )
                )
              : of(user)
            )
      );
    }

    public checkRole(role: string) {
        return from(this.rolesRepository.findOne({ where: { name: role } })).pipe(
          mergeMap((role) =>
            role
              ? of(role)
              : throwError(
                  new HttpException("Введена неверная роль", HttpStatus.BAD_REQUEST)
                )
          )
        );
    }
}
