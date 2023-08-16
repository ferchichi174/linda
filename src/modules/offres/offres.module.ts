import { Module } from '@nestjs/common';
import { OffresController } from './offres.controller';
import { OffresService } from './offres.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import {AuthModule} from '../auth/auth.module'
import { Offre } from 'src/enteties/offre.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Offre]),
  AuthModule,],
  controllers: [OffresController],
  providers: [OffresService],
  
})
export class OffresModule {}