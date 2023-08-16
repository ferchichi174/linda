import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {

      return true;
    }
    
    const { body } = context.switchToHttp().getRequest();
    console.log('==>', body)
    console.log('==>', requiredRoles.some((role) => body.role?.includes(role)))
    return requiredRoles.some((role) => body.role?.includes(role));
  }
}

/* import { Injectable, CanActivate, ExecutionContext ,HttpException,HttpStatus} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from '.././../enteties/user.entity';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private readonly _reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext): boolean {
    const passportActive = super.canActivate(context);
    if (!passportActive) {
      throw new HttpException(
        'You do not have permission ',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const roles = this._reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    console.log("====>",roles)

    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // this should come from passport
    const user: InstanceType<any> = request.user;

    // i want to get the role from JWT in here

    const hasRole = () => roles.indexOf(user.role) >= 0;

    if (user && user.role && hasRole()) {
      return true;
    }

    throw new HttpException(
      'You do not have permission (Roles)',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
*/