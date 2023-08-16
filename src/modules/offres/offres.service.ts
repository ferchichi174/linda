import { Injectable, InternalServerErrorException, Logger, NotFoundException,UnauthorizedException } from '@nestjs/common';

import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { CreateOffreDto } from 'src/common/dtos/create-offre.dto';
import { GetOffresFilterDto } from 'src/common/dtos/get-offres-filter.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/enteties/user.entity';
import { Offre } from 'src/enteties/offre.entity';
import { OffreStatus } from 'src/common/enums/offre-status.enum';

@Injectable()
export class OffresService {
  constructor(
    @InjectRepository(Offre)
    private offresRepository: Repository<Offre>,

  ){}
//GET all offres
private logger =new Logger('offresRepository')

//get all data for the admin 
async getall(): Promise<Offre[]> {
  const result =await this.offresRepository.find()
  return result 

}


//get data for only authaurized
async getOffres(filterDto: GetOffresFilterDto, user: User): Promise<Offre[]> {
  if (!user) {
    throw new UnauthorizedException('User not authorized.');
  }
  try{
  const offres = await this.offresRepository.createQueryBuilder('offre')
    .where('offre.userId = :userId', { userId: user.id })
    .andWhere(filterDto.status ? 'offre.status = :status' : '1=1', { status: filterDto.status })
    
    .andWhere(filterDto.search ? '(LOWER(offre.title) LIKE LOWER(:search) OR LOWER(offre.description) LIKE LOWER(:search))' : '1=1', { search: `%${filterDto.search}%` })
    .getMany();
  return offres;
  } catch(error){
    this.logger.error(`Failed to get offres for user "${user.email}" , Filters :${JSON.stringify(filterDto)}`, error.stack);
    throw new InternalServerErrorException();


  }
}

    //get by id
    async getOffresById(
      id: number,
      user:User
      ): Promise<Offre> {
        const found =await this.offresRepository.findOne({
            where: { id, userId: user.id }
     });
        if(!found){
throw new NotFoundException(`offre with ID "${id}" not found`);
}
return found
}

//create offres
async createOffre(CreateOffreDto:CreateOffreDto,
  user:User
  ): Promise<Offre>{
    console.log('===>')
    const {title, description } = CreateOffreDto;
    const offre = new Offre();
    offre.title=title;
    offre.description = description;
    offre.status = OffreStatus.OPEN;
    offre.user=user;
    return await this.offresRepository.save(offre);
}

//deleteOffre
async deleteOffre(id: number,
  @GetUser() user:User 
  
  ):Promise<void>{
  const result=await this.offresRepository.delete({id, userId:user.id});
if (result.affected===0){
    throw new NotFoundException(`Offre with ID "${id}" not found`);

}
}

//update dtatus
async updateOffreStatus(id:number, status:OffreStatus,
  @GetUser()user:User
  
  ): Promise<Offre>{
const offre= await this.getOffresById(id, user)
offre.status=status;
await offre.save();
return offre
  }
//get offre with filters
async getOffreswithFilters(filterDto:GetOffresFilterDto):Promise<Offre[]>{
  const {status, search}= filterDto;
  let offres = await this.getall(); // call getOffres() as a function
  if (status){
      offres=offres.filter(offre => offre.status === status);
  }
  if (search) {
    offres = offres.filter(offre => 
      offre.title.includes(search ) || offre.description.includes(search),
          
          )
  }
  return offres
  }
  

    }

    

