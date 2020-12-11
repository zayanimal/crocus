import { Observable } from 'rxjs';
import { Good } from '@good/entities/good.entity';
import { IMessage } from '@shared/interfaces/message.interface';

export interface IGoodService {
    /**
     * Добавить позиции в базу из файла xls
     * @param buffer файл прайслиста
     * @param vendor название вендора
     */
    createFromFile(buffer: ArrayBuffer, vendor: string): Observable<IMessage>;

    /**
     * Поиск товара по заданной подстроке
     * @param name
     */
    search(name: string): Observable<Good[]>

    /**
     * Поиск товара по id
     * @param id
     */
    searchId(id: string): Observable<Good>
}
