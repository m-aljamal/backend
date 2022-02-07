import { AuthGuard } from '@nestjs/passport';

//  rest api
export class JwtAuthGuard extends AuthGuard('jwt') {}
