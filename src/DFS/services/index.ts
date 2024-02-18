import { validateOrReject, ValidationError } from 'class-validator';
import Errors from '../../core/errors';

class ClassValidatorHelper {
  public async validateOrRejectHelper<T extends Record<string, any>>(
      reqBody: Record<string, any>,
      dtoClass: { new (reqBodyObj: Record<string, any>): T }
  ): Promise<T> {
    try {
      const validatedBody = new dtoClass(reqBody);
      await validateOrReject(validatedBody);
      return validatedBody;
    } catch (errors) {
      if (Array.isArray(errors)) {
        const errorMessage = (errors as ValidationError[])
            .map((error) => Object.values(error.constraints?error.constraints : "").join(', '))
            .join(', ');

        throw new Errors.BadRequestError(errorMessage);
      } else throw errors;
    }
  }
}

export default new ClassValidatorHelper();
