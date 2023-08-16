import {IsOptional,IsIn,IsNotEmpty} from 'class-validator'
import { OffreStatus } from '../enums/offre-status.enum';


export class GetOffresFilterDto{
    @IsOptional()
    //is in the status need to be one of the attribute 
    @IsIn([OffreStatus.OPEN,OffreStatus.DONE,OffreStatus.IN_PROGRESS])
    status: OffreStatus;
    @IsOptional()
    //must not be empty
    @IsNotEmpty()
    search:string;
}