import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httprequest: HttpRequest): Promise<HttpResponse> {
    if (!httprequest.body.email) {
      return badRequest(new MissingParamError('email'))
    } else if (!httprequest.body.password) {
      return badRequest(new MissingParamError('password'))
    }

    this.emailValidator.isValid(httprequest.body.email)
  }
}
