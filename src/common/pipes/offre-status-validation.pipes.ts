import { BadRequestException, PipeTransform } from "@nestjs/common";
import { OffreStatus } from "../enums/offre-status.enum";

export class OffreStatusValidationPipe implements PipeTransform{
 readonly allowedStatuses = [
OffreStatus.OPEN,
OffreStatus.DONE,
OffreStatus.IN_PROGRESS
 ];
    transform(value: any){
    value = value.toUpperCase();
if (!this.isStatuValid(value)){
    throw new BadRequestException(`"${value}" is an invalid status `)
}

        return value;
    }
    private isStatuValid(status: any){
      const idx =  this.allowedStatuses.indexOf(status);
return idx !== -1; 
}

}