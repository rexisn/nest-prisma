import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports : [PrismaModule],
  providers: [AdminService] ,
  controllers  : [AdminController]
})
export class AdminModule {}
