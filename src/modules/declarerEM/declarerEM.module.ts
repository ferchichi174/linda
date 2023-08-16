import { Module } from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm'
import {AuthModule} from '../auth/auth.module'
import { Declarerem } from 'src/enteties/declarerem.entity';
import { DeclarerController } from './declarerEM.controller';
import { DeclarerService } from './declarerEM.service';
import { Archieve } from 'src/enteties/archieve.entity';
import { Remarque } from 'src/enteties/remarque.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Declarerem,Archieve,Remarque]),
  AuthModule,],
  controllers: [DeclarerController],
  providers: [DeclarerService],
  exports: [ DeclarerService]


  
})
export class DeclarerModule {}