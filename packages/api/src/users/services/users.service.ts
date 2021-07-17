import { of, from, throwError, forkJoin } from "rxjs";
import { map, mergeMap, catchError, mapTo } from "rxjs/operators";
import {
  Injectable,
  Inject,
  forwardRef,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate } from "nestjs-typeorm-paginate";
import { hash } from "bcrypt";
import { AuthService } from "@auth/auth.service";
import { CreateUserDto } from "@users/dto/create-user.dto";
import { UsersRepository } from "@users/repositories/users.repository";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  search(username: string) {
    return this.usersRepository.search(username);
  }

  /**
   * Поиск пользователя по id
   * @param id
   */
  searchId(id: string) {
    return this.usersRepository.searchId(id);
  }

  /**
   * Пагинация юзеров общий список
   * @param page
   * @param limit
   */
  getUsers(page: number, limit: number) {
    return from(paginate(this.usersRepository.list(), { page, limit })).pipe(
      map(({ items, meta }) => ({
        items: this.usersRepository.transformList(items),
        meta,
      })),

      catchError((err) =>
        throwError(new InternalServerErrorException(err.message))
      )
    );
  }

  /**
   * Найти пользователя в базе по имени
   * @param param имя пользователя
   */
  findByUsername(username: string) {
    return this.usersRepository.searchName(username);
  }

  /**
   * Найти пльзователя и его контакты, чтобы отредактировать
   * @param username
   */
  findUserForEdit(username: string) {
    return this.usersRepository.edit(username);
  }

  /**
   * Редактирование пользователя
   * @param editableUser имя редактируемого пользователя
   * @param userDto данные для редактирования
   */
  editUser(
    editableUser: string,
    userDto: CreateUserDto
  ) {
    const {
      username,
      password,
      role,
      permissions
    } = userDto;

    return forkJoin({
      user: this.usersRepository.searchRaw(editableUser),
      foundRole: from(this.authService.checkRole(role)),
      hashedPassword: password.length ? from(hash(password, 10)) : of(""),
    }).pipe(
      mergeMap((props) => {
        const { user, foundRole, hashedPassword } = props;

        user.username = username;
        if (hashedPassword.length) {
          user.password = hashedPassword;
        }
        user.role = foundRole;

        return from(this.usersRepository.save(user));
      }),
      catchError((err) => of(err.message))
    );
  }

  /**
   * Удалить пользователя
   * @param username
   */
  removeUser(username: string) {
    return this.usersRepository.removeUser(username);
  }
}
