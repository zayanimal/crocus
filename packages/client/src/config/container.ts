import * as System from '@system/services'
import * as Shared from '@shared/services'
import * as Main from '@main/services'
import * as Brand from '@brand/services'
import * as Bid from '@bid/services'

const tokenService = new System.TokenService()
const restService = new System.RestService(tokenService)

export const dependencies = {
    rest: restService,
    token: tokenService,
    router: new System.RouterService(),
    validation: new Shared.ValidationServiceImp(),
    dictionary: new System.DictionaryService(restService),
    users: new Main.UsersService(restService),
    brandList: new Brand.ListService(restService),
    brandControl: new Brand.ControlService(restService),
    bidList: new Bid.ListService(restService)
}

export type Dependencies = typeof dependencies
