import { denormalize, normalize } from 'normalizr'
import { schemaFabric, SchemaFabricKeys } from '@shared/services'
import { Normalizator } from '@shared/types'

export class NormalizatorImp implements Normalizator {
    schema = {}

    constructor(schemaName: SchemaFabricKeys) {
        const checkSchema = schemaFabric.get(schemaName)
        if (checkSchema) {
            this.schema = checkSchema
        }
    }

    normalize<T>(entity: T) {
        return normalize(entity, this.schema)
    }

    denormalize<T, E>(requisites: T, entities: E) {
        return denormalize({ requisites }, this.schema, entities)
    }
}
