import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from "../users/users.module";
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UsersService } from "../users/users.service";
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1200s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
  exports: [AuthService]
})
export class AuthModule {}
