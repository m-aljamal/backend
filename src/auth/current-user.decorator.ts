import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest().user;
    }

    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    if (user.role !== 'admin') {
      throw new UnauthorizedException();
    }
    console.log('user', user.role);

    return ctx.getContext().req.user;
  },
);
