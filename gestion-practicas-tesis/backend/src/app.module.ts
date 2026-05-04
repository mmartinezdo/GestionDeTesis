import { Module } from '@nestjs/common';
import { TrpcModule } from './trpc/trpc.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [TrpcModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
