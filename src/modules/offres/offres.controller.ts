import { Body, Controller, Get, Param, Post ,SetMetadata , Delete , Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards} from '@nestjs/common';
import {Logger} from '@nestjs/common'

import { OffresService } from './offres.service';

import { AuthGuard } from '@nestjs/passport';
import { CreateOffreDto } from 'src/common/dtos/create-offre.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/enteties/user.entity';
import { GetOffresFilterDto } from 'src/common/dtos/get-offres-filter.dto';
import { Offre } from 'src/enteties/offre.entity';
import { OffreStatusValidationPipe } from 'src/common/pipes/offre-status-validation.pipes';
import { OffreStatus } from 'src/common/enums/offre-status.enum';

@Controller('offres')
export class OffresController {
  private logger = new Logger('OffresController') 
constructor(private offresService: OffresService){}

@Get('/all')

//this method to get data and get data with filter 
getall(@Query(ValidationPipe) filterDto:GetOffresFilterDto): Promise<Offre[]>{
    if (Object.keys(filterDto).length){
 return this.offresService.getOffreswithFilters(filterDto);
   
    }else{
        return this.offresService.getall();
    }
}
@Post('')
@UseGuards(AuthGuard() )

// @UsePipes(ValidationPipe)
createOffre(
    @Body() createOffreDto:CreateOffreDto,
   @GetUser() user:User
    ): Promise <Offre> {
      console.log('=====>')
      this.logger.verbose(`User "${user.email}" creating a new offre. Data: ${JSON.stringify(CreateOffreDto)}`)
    console.log('====>',CreateOffreDto)
return this.offresService.createOffre(createOffreDto, user);
}


@Get()
@UseGuards(AuthGuard())

getOffres(
  @Query(ValidationPipe) filterDto: GetOffresFilterDto,
  @GetUser() user: User,
): Promise<Offre[]> {
  this.logger.verbose(`user "${user.email}" retrieving all offres. Filtres: ${JSON.stringify(filterDto)}`)
  return this.offresService.getOffres(filterDto, user);
}


@Get('/:id')
@UseGuards(AuthGuard())

getOffresById(@Param('id', ParseIntPipe) id:number,
@GetUser()user:User

): Promise<Offre>{
    console.log(id)
    return this.offresService.getOffresById(id,user)
}




 @Delete('/:id')
 @UseGuards(AuthGuard())

deleteOffre(@Param('id',  ParseIntPipe) id:number,
@GetUser() user:User
):Promise <void>{
return this.offresService.deleteOffre(id,user);
} 

@Patch('/:id/status')
@UseGuards(AuthGuard())

updateOffreStatus(
    @Param('id',ParseIntPipe)id:number,
    @Body('status', OffreStatusValidationPipe)status:OffreStatus,
    @GetUser() user: User
): Promise<Offre>{
return this.offresService.updateOffreStatus(id,status,user);
} 

}