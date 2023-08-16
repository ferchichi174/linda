import { IsNotEmpty, IsOptional } from "class-validator";
import { manieredeclaration } from "../enums/manieredeclaration.enum";

export class CreateDeclaredDto{
    // non :  
    // oui : not being : nom prenom fonction 
    ManiereDeclaration:manieredeclaration;
    @IsOptional() // Make the attribute optional
    Nom: string | null;
  
    @IsOptional() // Make the attribute optional
    Prenom: string | null;
  
    @IsOptional() // Make the attribute optional
    Fonction: string | null;
    @IsNotEmpty()
    Date_Dec:Date;
    @IsNotEmpty()
    DateEvent:Date;
    @IsNotEmpty()
    service:string;
    @IsNotEmpty()
    NeverEvent:string; 
    @IsNotEmpty()
    Lequel:string;
    @IsNotEmpty()
    EtatPatient:string;
    
    @IsNotEmpty()
    PatientRisque:string;
    @IsNotEmpty()
    CatégoriePatient:string;
    @IsNotEmpty()
    NomMedicament:string;
    @IsNotEmpty()
    Medicamentarisque:string;
    @IsNotEmpty()
    CategorieMedicamentarisque:string;
    @IsNotEmpty()
    NomVoie:string;
    @IsNotEmpty()
    VoieAdministrationarisque:string;
    @IsNotEmpty()
    CategorieVoiearisque:string;
    @IsNotEmpty()
    Degrerealisation:string;
    @IsNotEmpty()
    etapedesurvenu:string;
    @IsNotEmpty()
    DescEvent:string;
    @IsNotEmpty()
    Impact:string;
    @IsNotEmpty()
    email:string;
    
    

    
    
    }
