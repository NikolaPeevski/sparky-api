import { Controller, Post } from 'routing-controllers';

@Controller('/auth/')
export class AuthController {
  @Post('signin')
  signIn(): string {
    return 'Signing in...';
  }

  @Post('signup')
  signUp(): string {
    return 'Signing up..';
  }

  @Post('logout')
  logout(): string {
    return 'Logging out..';
  }

  @Post('refresh')
  refresh(): string {
    return 'Refreshing token...';
  }
}
