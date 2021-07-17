import * as System from '@system/services'
import * as Shared from '@shared/services'
import * as Main from '@main/services'

const tokenService = new System.TokenService()
const restService = new System.RestService(tokenService)

export const dependencies = {
    rest: restService,
    token: tokenService,
    router: new System.RouterService(),
    validation: new Shared.ValidationServiceImp(),
    dictionary: new System.DictionaryService(restService),
    users: new Main.UsersService(restService)
}

export type Dependencies = typeof dependencies
