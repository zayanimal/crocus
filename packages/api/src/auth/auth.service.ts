import { Observable, of, from, throwError, forkJoin } from "rxjs";
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
import { UsersService } from "@users/services/users.service";
import { CreateUserDto } from "@users/dto/create-user.dto";
import { LoginUserDto } from "@users/dto/login-user.dto";
import { LoginStatus } from "@auth/interfaces/login-status.interface";
import { JwtPayload } from "@auth/interfaces/payload.interface";
import { User } from "@users/entities/user.entity";
import { Role } from "@auth/entities/role.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  /**
   * Проверка пользователя для аутентификации
   * @param payload
   */
  validateUser(payload: JwtPayload) {
    return this.usersService.findByUsername(payload.username);
  }

  /**
   * Проверка существования пользователя
   * @param username
   */
  checkUser(username: string) {
    return from(this.usersRepository.findOne({ where: { username } })).pipe(
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

  /**
   * Проверка существования введеной роли в словаре ролей
   * @param role
   */
  checkRole(role: string) {
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


  /**
   * Проверить существует ли пользователь в базе, если нет создать нового
   * @param userDto логин и пароль пользователя
   */
  register(userDto: CreateUserDto): Observable<{ message: string }> {
    const { username, password, role } = userDto;

    return this.checkUser(username).pipe(
      mergeMap(() =>
        forkJoin({
          roleId: this.checkRole(role).pipe(map(({ id }) => id)),
        })
      ),
      mergeMap(({ roleId }) =>
        of(this.usersRepository.create({ username, password })).pipe(
          map((newUser) => {
            newUser.roleId = roleId;

            return newUser;
          })
        )
      ),
      mergeMap((readyUser) => from(this.usersRepository.save(readyUser))),
      mapTo({ message: `Пользователь ${username} добавлен` })
    );
  }

  /**
   * Проверить есть ли пользователь в базе и соответствует ли его пароль
   * @param param введеные пользователем логин и пароль
   */
  login({ username, password }: LoginUserDto): Observable<LoginStatus> {
    return from(
      this.usersRepository.findOne({
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
}
