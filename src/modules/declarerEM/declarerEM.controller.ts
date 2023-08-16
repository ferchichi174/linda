import { Body, Controller, Get, Param, Post ,SetMetadata , Delete , Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Put} from '@nestjs/common';
import {Logger} from '@nestjs/common'



import { DeclarerService } from './declarerEM.service';
import { Declarerem } from 'src/enteties/declarerem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeclaredDto } from 'src/common/dtos/declare.dto';
import { ModifiedDeclaredDto } from 'src/common/dtos/modify-declared.dto';
import { DeclardStatus } from 'src/common/enums/declare-status.enum';
import { Archieve } from 'src/enteties/archieve.entity';
import { AddRemarque } from 'src/common/dtos/Remarque.dto';
import { Remarque } from 'src/enteties/remarque.entity';

@Controller('declared')
export class DeclarerController {
constructor(private declaredService: DeclarerService){}

@Post()
createOffre(
    @Body() createdeclaredDto:CreateDeclaredDto,
    ): Promise <Declarerem> {
return this.declaredService.createOffre(createdeclaredDto);
}

@Get()
  async findAll(): Promise<Declarerem[]> {
    return this.declaredService.getall();
  }

  
@Get('archive')
async findarchieve(): Promise<Archieve[]> {
  return this.declaredService.getarchive();
}

  @Get('byid/:id')

getOffresById(@Param('id') id:number,

): Promise<Declarerem>{
    console.log(id)
    return this.declaredService.getOffresById(id)
  }
  @Put(':id')
  async modifyOffre(@Param('id') declaredId: number, @Body() modifiedDeclaredDto: ModifiedDeclaredDto): Promise<Declarerem> {
    return await this.declaredService.modifyOffre(declaredId, modifiedDeclaredDto);
  }
  @Patch('/:id')

updateOffreStatus(
    @Param('id')id:number,
): Promise<Declarerem>{
return this.declaredService.updateDeclaredStatus(id);
} 

@Post('/remarque')
createRemarque(
    @Body() createRemarquedto:AddRemarque,
    ): Promise <Remarque> {
    return this.declaredService.createRemarque(createRemarquedto);
  }


@Patch('/:id/status')

updateStatus(
    @Param('id',ParseIntPipe)id:number,
    @Body('status')status:DeclardStatus,
): Promise<Declarerem>{
return this.declaredService.updateDecStatus(id,status);
} 

@Get('count')
async getNumberOfDeclarationsToday(): Promise<number> {
  return this.declaredService.getTotalNumberOfDeclarations();
}


  @Get('countNeverEvent')
  async getNumberOfEMToday(): Promise<number> {
    return this.declaredService.getNumberOfNeverEvents();
  }
  
  @Get('countGraphique')
  async getNumberOfDeclarationsForAllServices(): Promise<{ service: string; count: number }[]> {
    return this.declaredService.getNumberOfDeclarationsForAllServices();
  }
  @Get('distribution')
  async getCriticiteDistribution(): Promise<{ status: string; percentage: number }[]> {
    return await this.declaredService.getCriticiteDistribution();
  }
  //chart patient a risque with category
  @Get('risque')
  async getCountOfPatientsAtRiskByCategory(): Promise<{ category: number, count: number }[]> {
    const counts = await this.declaredService.getCountOfPatientsAtRiskByCategory();
    return counts;
  }
    //chart medicament a risque with category
  @Get('medicament')
  async getCountOfMedicamentByCategory(): Promise<{ category: number, count: number }[]> {
    const counts = await this.declaredService.getCountOfmedicamentByCategory();
    return counts;
  }
  @Get('voieadmin')
  async getCountOfAdminByCategory(): Promise<{ category: number, count: number }[]> {
    const counts = await this.declaredService.getCountOfadminByCategory();
    return counts;
  }
  }



  