
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor(private prisma: PrismaService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,

      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
    console.log('JWT_SECRET lido na estratégia:', this.configService.get<string>('JWT_SECRET'));
  }

  async validate(payload: { email: string; sub: number; name: string }) { 
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub }, 
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado ou token inválido.');
    }

    return user;
  }
}