import { Controller, HttpRequest, HttpResponse, Authentication, Validation } from './login-controller-protocols'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/http-helper'

export class LoginController implements Controller {
  constructor (private readonly authentication: Authentication, private readonly validation: Validation) {
    this.authentication = authentication
    this.validation = validation
  }

  async handle (httprequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httprequest.body)
      if (error) return badRequest(error)

      const { email, password } = httprequest.body
      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) return unauthorized()

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
