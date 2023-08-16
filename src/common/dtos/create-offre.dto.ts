import { IsNotEmpty } from "class-validator";
export class CreateOffreDto{
    @IsNotEmpty()
        title: string;
    
        @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    role: string;

    
   
}