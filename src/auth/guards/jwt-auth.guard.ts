import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  handleRequest(err, user, info) {
    
    if (err || !user) {
      throw err || new UnauthorizedException('Você precisa estar logado para acessar este recurso.');
    }
    return user;
  }
}