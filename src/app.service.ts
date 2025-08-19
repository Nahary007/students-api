import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string): Promise<any> {
    // Ici, normalement on chercherait un User en DB
    // Pour simplifier, tout email existant dans students sera autorisé
    if (!email) throw new UnauthorizedException();
    return { email };
  }

  async login(user: any) {
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}