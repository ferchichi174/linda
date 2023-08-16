import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAnalyseemDto{
@IsOptional()
    ManiereDeclaration:string;
    @IsOptional() // Make the attribute optional
    Nom: string | null;
  
    @IsOptional() // Make the attribute optional
    Prenom: string | null;
  
    @IsOptional() // Make the attribute optional
    Fonction: string | null;
    @IsNotEmpty()
    DateAnalyse:Date;
    @IsNotEmpty()
    DateCrex:Date;
    @IsNotEmpty()
    NomMembre:string;
    @IsNotEmpty()
    PrenomMembre:string;
    @IsNotEmpty()
    FonctionMembre:string;
    @IsNotEmpty()
    DateEvent:Date;
    
    @IsNotEmpty()
    Quoi:string;
    @IsNotEmpty()
    Impact:string;
    @IsNotEmpty()
    Probleme:string;
    @IsNotEmpty()
    Action:string;
    @IsNotEmpty()
    Concernemedicament:string;
    @IsNotEmpty()
    Criticite:string;
    @IsNotEmpty()
    Defaillances:string;
    @IsNotEmpty()
    Autre:string;
    @IsNotEmpty()
    erreurlieeauxpatients:string;
    @IsNotEmpty()
    erreurlieealindividu:string;
    @IsNotEmpty()
    erreurlieeaequipe:string;
    @IsNotEmpty()
    erreurlieeauxtachesaaccomplir:string;
    
    
    @IsNotEmpty()
    erreurlieeaenvironnement:string;
    @IsNotEmpty()
    erreurlieeaorganisation:string;
    @IsNotEmpty()
    erreurlieeaucontexteinstitutionnel:string;
    @IsNotEmpty()
    Eviterei:string;
    @IsNotEmpty()
    Defense:string;


    @IsNotEmpty()
    CauseLatente:string;
    @IsNotEmpty()
    ActionPreventive:string;
    @IsNotEmpty()
    ActionCorrective:string;
    @IsNotEmpty()
    EffetAttendu:string;
    @IsNotEmpty()
    Pilote:string;
    @IsNotEmpty()
    ServiceMembre:string;


    @IsNotEmpty()
    EcheancePrevue:Date;
    @IsNotEmpty()
    EcheanceEffective:Date;
    @IsNotEmpty()
    service:string;
    @IsNotEmpty()
    origine:string;
    @IsNotEmpty()
    autrePatient:string;
    @IsNotEmpty()
    autreindividuels:string
    @IsNotEmpty()
    autreEquipe:string
    @IsNotEmpty()
    autreAcompli:string
    @IsNotEmpty()
    autreEnv:string
    @IsNotEmpty()
    autreOrganisation:string
    @IsNotEmpty()
    autreinstitutionnel:string
        
    @IsNotEmpty()
    NomPilote:string;
    @IsNotEmpty()
    PrenomPilote:string;
    @IsNotEmpty()
    Pole:string;
     
    
    
    
    
    }
