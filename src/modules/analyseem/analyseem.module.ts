import { Module } from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm'
import {AuthModule} from '../auth/auth.module'
import { Analyseem } from 'src/enteties/analyseem.entity';
import { AnalyseemController } from './analyseem.controller';
import { AnalyseemService } from './analyseem.service';
import { DeclarerModule } from '../declarerEM/declarerEM.module';
import { Remarque } from 'src/enteties/remarque.entity';
;


@Module({
  imports: [TypeOrmModule.forFeature([Analyseem]),
  AuthModule,
DeclarerModule
],
  controllers: [AnalyseemController],
  providers: [AnalyseemService, AnalyseemService],
  
})
export class AnalyseemModule {}