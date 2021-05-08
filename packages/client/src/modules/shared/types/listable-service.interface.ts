import type { Observable } from 'rxjs'
import type { AjaxResponse } from 'rxjs/ajax'

export interface ListableService {
    /**
     * Получить список (пагинация)
     * @param page
     */
    getList$(page: number): Observable<AjaxResponse>

    /**
     * Добавить нового новый объект
     * @param dto
     */
    create$(dto: object): Observable<AjaxResponse>

    /**
     * Найти по имени
     * @param item
     */
    find$(item: string): Observable<AjaxResponse>

    /**
     * Обновить по имени
     * @param item
     * @param dto
     */
    update$(dto: object, item?: string): Observable<AjaxResponse>

    /**
     * Удалить по имени
     * @param item
     */
    delete$(item: string): Observable<AjaxResponse>
}
