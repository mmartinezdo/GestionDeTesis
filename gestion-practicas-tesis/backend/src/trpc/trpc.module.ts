import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [TrpcService, PrismaService],
  exports: [TrpcService],
})
export class TrpcModule {}
