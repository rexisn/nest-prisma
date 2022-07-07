import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports : [PrismaModule, JwtModule.register({})],
  providers: [AuthService , AtStrategy , RtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
