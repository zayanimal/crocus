import { from } from "rxjs";
import {
  map,
  mapTo,
  mergeMap,
  switchMap,
} from "rxjs/operators";
import { Repository, EntityRepository, Raw } from "typeorm";
import { plainToClass } from "class-transformer";
import { User } from "@users/entities/user.entity";
import { checkEntity } from "@shared/utils";
import {
  UsersEntity,
  LIST_GROUP,
  FIND_GROUP,
  EDIT_GROUP,
} from "@users/users.serializer";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  errorMessage: string = "Пользователь не существует";

  private dbRequest(username: string) {
    return {
      where: { username },
      relations: ["role", "permissions"],
    };
  }

  list() {
    return this.createQueryBuilder("u")
      .select(["u.id", "u.username", "r.name", "u.time", "u.isActive"])
      .leftJoin("u.role", "r", "u.roleId = r.id")
      .orderBy("u.time", "ASC");
  }

  edit(username: string) {
    return from(
      this.createQueryBuilder("u")
        .select([
          "u.username",
          "u.isActive",
          "r.name",
          "p.name",
          "c.email",
          "c.phone",
          "c.position",
        ])
        .innerJoin("u.role", "r")
        .innerJoin("u.permissions", "p")
        .innerJoin("u.contacts", "c")
        .where("u.username = :name", { name: username })
        .getOne()
    ).pipe(
      mergeMap(checkEntity(this.errorMessage)),
      map((user) => this.transform(user, EDIT_GROUP))
    );
  }

  search(username: string) {
    return from(
      this.find({
        username: Raw(
          (col) => `to_tsvector(${col}) @@ to_tsquery('${username}:*')`
        ),
      })
    ).pipe(map((users) => users.map(({ username }) => username)));
  }

  searchRaw(username: string) {
    return from(this.findOne(this.dbRequest(username))).pipe(
      mergeMap(checkEntity(this.errorMessage))
    );
  }

  searchId(id: string) {
    return from(this.findOne({ id })).pipe(
      mergeMap(checkEntity(this.errorMessage))
    );
  }

  searchName(username: string) {
    return from(this.findOne(this.dbRequest(username))).pipe(
      mergeMap(checkEntity(this.errorMessage)),
      map((user) => this.transform(user, FIND_GROUP))
    );
  }

  removeUser(username: string) {
    return from(this.findOne({ username })).pipe(
      mergeMap(checkEntity(this.errorMessage)),
      switchMap((user) =>
        from(this.remove(user)).pipe(
          mapTo({ message: `Пользователь ${username} удалён` })
        )
      )
    );
  }

  transform(users: User | User[], options?: object) {
    return plainToClass(UsersEntity, users, options);
  }

  transformList(users: User[]) {
    return this.transform(users, LIST_GROUP);
  }
}
