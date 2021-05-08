import type { Observable } from 'rxjs'

export interface ValidationService {
    /**
     * Проверить сущность на ошибки валидатора
     * @param entity
     */
    check$<T>(entity: T): Observable<T>

    /**
     * Проверить сущности на ошибки валидации
     * @param entities
     */
    checkEntities$<T>(entities: T): Observable<Record<string, unknown>>
}
