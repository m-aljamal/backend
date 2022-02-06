import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entity/auth/auth';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth, { name: 'login' })
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return await this.authService.login(username, password);
  }
}
