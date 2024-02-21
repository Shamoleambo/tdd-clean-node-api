import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  async handle (httprequest: HttpRequest): Promise<HttpResponse> {
    if (!httprequest.body.email) {
      return badRequest(new MissingParamError('email'))
    } else if (!httprequest.body.password) {
      return badRequest(new MissingParamError('password'))
    }
  }
}
