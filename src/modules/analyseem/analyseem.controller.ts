import { Body, Controller, Get, Param, Post ,SetMetadata , Delete , Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards} from '@nestjs/common';

import { AnalyseemService } from './analyseem.service';
import { CreateAnalyseemDto } from 'src/common/dtos/analyseem-create.dto';
import { Analyseem } from 'src/enteties/analyseem.entity';
import { analysestatus } from 'src/common/enums/analyse-status.enum';
import { AddRemarque } from 'src/common/dtos/Remarque.dto';
import { Remarque } from 'src/enteties/remarque.entity';

@Controller('analyse')
export class AnalyseemController {
constructor(private analyseemService: AnalyseemService){}

@Post(':declaremId')
createOffre(
    @Body() createdeclaredDto:CreateAnalyseemDto,
    @Param('declaremId') declaremId: number
    ): Promise <Analyseem> {
    return this.analyseemService.createDeclareem(declaremId, createdeclaredDto);
  }
@Get()
  async findAll(): Promise<Analyseem[]> {
    return this.analyseemService.getall();
  }

  @Get('count')
  async getNumberOfDeclarationsToday(): Promise<number> {
    return this.analyseemService.getTotalNumberOfDeclarations();
  }

  @Get('distribution')
  async getCriticiteDistribution(): Promise<{ criticite: string; percentage: number }[]> {
    return await this.analyseemService.getCriticiteDistribution();
  }

  @Patch('/:id/status')

  updateStatus(
      @Param('id')id:number,
      @Body('status')status:analysestatus,
  ): Promise<Analyseem>{
  return this.analyseemService.updateDecStatus(id,status);
  } 
  @Get('/autrePatients')
  async getAutrePatients(): Promise<Analyseem[]> {
    return this.analyseemService.getAutrePatients();
  }
  @Get('/autreindiv')
  async getAutrePIndiv(): Promise<Analyseem[]> {
    return this.analyseemService.getautreindividuels();
  }
  @Get('/autreequipe')
  async getAutreEq(): Promise<Analyseem[]> {
    return this.analyseemService.getautreEquipe();
  }


  @Get('/autreacompli')
  async getAutracompli(): Promise<Analyseem[]> {
    return this.analyseemService.getAutreAcompli();
  }
  @Get('/autreenv')
  async getAutrEnv(): Promise<Analyseem[]> {
    return this.analyseemService.getautreEnv();
  }
  @Get('/org')
  async getAutrorg(): Promise<Analyseem[]> {
    return this.analyseemService.getautreOrg();
  }
  @Get('/inst')
  async getAutrins(): Promise<Analyseem[]> {
    return this.analyseemService.getautre();
  }
  @Get('donut')
  async getdonuts(): Promise<{ status: string; percentage: number }[]> {
    return await this.analyseemService.getdonuts();
  }


}


  
  