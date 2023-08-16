import { Injectable, InternalServerErrorException, Logger, NotFoundException,UnauthorizedException } from '@nestjs/common';

import {InjectRepository} from '@nestjs/typeorm'
import { Between, Repository } from 'typeorm';
import { Analyseem } from 'src/enteties/analyseem.entity';
import { CreateAnalyseemDto } from 'src/common/dtos/analyseem-create.dto';
import { DeclarerService } from '../declarerEM/declarerEM.service';
import { analysestatus } from 'src/common/enums/analyse-status.enum';
import { Remarque } from 'src/enteties/remarque.entity';
import { AddRemarque } from 'src/common/dtos/Remarque.dto';

@Injectable()
export class AnalyseemService {
  constructor(
    @InjectRepository(Analyseem)
    private analyseemRepository: Repository<Analyseem>,
    private declaredService: DeclarerService,
    

  ){}

 async createDeclareem( declaremId:number, CreatedeclaredDto: CreateAnalyseemDto): Promise<Analyseem> {
  const declaration = await this.declaredService.getOffresById(declaremId);
  if (!declaration) {
    throw new NotFoundException('Declaration not found');
  }  const {
    Nom,
    Prenom,
    ManiereDeclaration,
    Fonction,
    DateAnalyse,
    DateCrex,
    NomMembre,
    PrenomMembre,
    FonctionMembre,
    DateEvent,
    Quoi,
    Impact,
    Probleme,
    Action,
    Concernemedicament,
    Criticite,
    Defaillances,
    Autre,
    erreurlieeauxpatients,
    erreurlieealindividu,
    erreurlieeaequipe,
    erreurlieeauxtachesaaccomplir,
    erreurlieeaenvironnement,
    erreurlieeaorganisation,
    erreurlieeaucontexteinstitutionnel,
    Eviterei,
    Defense,
    CauseLatente,
    ActionPreventive,
    ActionCorrective,
    EffetAttendu,
    Pilote,
    EcheancePrevue,
  EcheanceEffective,
  ServiceMembre,
service,
origine,
autrePatient,
autreindividuels,
autreEquipe,
autreAcompli,
autreEnv,
autreOrganisation,
autreinstitutionnel,
NomPilote,
PrenomPilote,
Pole
  } = CreatedeclaredDto;

  const Declared = new Analyseem();

  Declared.Nom = Nom != null ? Nom : "";
  Declared.Prenom = Prenom != null ? Prenom : "";
  Declared.ManiereDeclaration = ManiereDeclaration != null ? ManiereDeclaration : "";
  Declared.DateAnalyse = DateAnalyse;
  Declared.DateCrex = DateCrex;
  Declared.NomMembre = NomMembre;
  Declared.PrenomMembre = PrenomMembre;
  Declared.FonctionMembre = FonctionMembre;
  Declared.DateEvent = DateEvent;
  Declared.Quoi = Quoi;
  Declared.Fonction=Fonction;
  Declared.Impact = Impact;
  Declared.Probleme = Probleme;
  Declared.Action = Action;
  Declared.Concernemedicament = Concernemedicament;
  Declared.Criticite = Criticite;
  Declared.Defaillances = Defaillances;
  Declared.Autre = Autre;
  Declared.erreurlieeauxpatients = erreurlieeauxpatients;
  Declared.erreurlieealindividu = erreurlieealindividu;
  Declared.erreurlieeaequipe = erreurlieeaequipe;
  Declared.erreurlieeauxtachesaaccomplir = erreurlieeauxtachesaaccomplir;
  Declared.erreurlieeaenvironnement = erreurlieeaenvironnement;
  Declared.erreurlieeaorganisation = erreurlieeaorganisation;
  Declared.erreurlieeaucontexteinstitutionnel = erreurlieeaucontexteinstitutionnel;
  Declared.Eviterei = Eviterei;
  Declared.Defense = Defense;
  Declared.CauseLatente = CauseLatente;
  Declared.ActionPreventive = ActionPreventive;
  Declared.ActionCorrective = ActionCorrective;
  Declared.EffetAttendu = EffetAttendu;
  Declared.Pilote = Pilote;
  Declared.EcheancePrevue = EcheancePrevue;
  Declared.EcheanceEffective = EcheanceEffective;
  Declared.ServiceMembre=ServiceMembre
  Declared.declaremId=declaremId
  Declared.service=service
  Declared.origine=origine
  Declared.status = analysestatus.EN_COURS
  Declared.autrePatient=autrePatient
  Declared.autreindividuels=autreindividuels
  Declared.autreEquipe=autreEquipe
  Declared.autreAcompli=autreAcompli
  Declared.autreEnv=autreEnv
  Declared.autreOrganisation=autreOrganisation
  Declared.autreinstitutionnel=autreinstitutionnel
    Declared.NomPilote=NomPilote
    Declared.PrenomPilote=PrenomPilote
    Declared.Pole=Pole

  const createdAnalyseem = await this.analyseemRepository.save(Declared);

  // Update the status of the corresponding Declaration entity
  await this.declaredService.updateDeclaredStatus(declaremId);

  return createdAnalyseem;
  
  }
  async getall(): Promise<Analyseem[]> {
    const result =await this.analyseemRepository.find()
    return result 
  
}
async getAutrePatients(): Promise<Analyseem[]> {
  const result = await this.analyseemRepository.find();
  const autrePatients: Analyseem[] = [];
  
  result.forEach(analyse => {
    if (analyse.autrePatient) {
      const autrePatient = {
        autrePatient: analyse.autrePatient,
      } as Analyseem;
      autrePatients.push(autrePatient);
    }
  });
  
  return autrePatients;
}
async getautreindividuels(): Promise<Analyseem[]> {
  const result = await this.analyseemRepository.find();
  const autreindividuels: Analyseem[] = [];
  
  result.forEach(analyse => {
    if (analyse.autreindividuels) {
      const autreindividuel = {
        autreindividuels: analyse.autreindividuels,
      } as Analyseem;
      autreindividuels.push(autreindividuel);
    }
  });
  
  return autreindividuels;
}


async getautreEquipe(): Promise<Analyseem[]> {
  const result = await this.analyseemRepository.find();
  const autreEquipe: Analyseem[] = [];
  
  result.forEach(analyse => {
    if (analyse.autreEquipe) {
      const autreEquipeData = {
        autreEquipe: analyse.autreEquipe,
      } as Analyseem;
      autreEquipe.push(autreEquipeData);
    }
  });
  
  return autreEquipe;
}


async getautreEnv(): Promise<Analyseem[]> {
  const result = await this.analyseemRepository.find();
  const autreEnv: Analyseem[] = [];
  
  result.forEach(analyse => {
    if (analyse.autreEnv) {
      const autreEnvData = {
        autreEnv: analyse.autreEnv,
      } as Analyseem;
      autreEnv.push(autreEnvData);
    }
  });
  
  return autreEnv;
}




async getAutreAcompli(): Promise<Analyseem[]> {
  const result = await this.analyseemRepository.find();
  const autreAcompli: Analyseem[] = [];
  
  result.forEach(analyse => {
    if (analyse.autreAcompli) {
      const autreAcompliData = {
        autreAcompli: analyse.autreAcompli,
      } as Analyseem;
      autreAcompli.push(autreAcompliData);
    }
  });
  
  return autreAcompli;
}

async getdonuts(): Promise<{ status: string; percentage: number }[]> {
  const results = await this.getall();

  const totalCount = results.length;
  let acceptableCount = 0;
  let controlCount = 0;
  let inacceptableCount = 0;

  for (const result of results) {
    const status = result.status;

    if (status === analysestatus.EN_COURS) {
      acceptableCount++;
    } else if (status === analysestatus.EN_RETARD) {
      controlCount++;
    } else if (status === analysestatus.REALISER) {
      inacceptableCount++;
    }
  }

  const totalPercentage = (acceptableCount + controlCount + inacceptableCount) / totalCount * 100;

  // Calculate the adjusted percentages if the total percentage exceeds 100%
  const acceptablePercentage = (acceptableCount / totalCount) * 100;
  const controlPercentage = (controlCount / totalCount) * 100;
  const inacceptablePercentage = (inacceptableCount / totalCount) * 100;

  const adjustedTotalPercentage = acceptablePercentage + controlPercentage + inacceptablePercentage;
  const adjustmentFactor = 100 / adjustedTotalPercentage;

  const percentageDistribution: { status: string; percentage: number }[] = [
    { status: analysestatus.EN_COURS, percentage: acceptablePercentage * adjustmentFactor || 0 },
    { status:  analysestatus.EN_RETARD, percentage: controlPercentage * adjustmentFactor || 0},
    { status: analysestatus.REALISER, percentage: inacceptablePercentage * adjustmentFactor || 0 },
  ];

  return percentageDistribution;
}









    
async getautreOrg(): Promise<Analyseem[]> {
  const result = await this.analyseemRepository.find();
  const autreOrganisation: Analyseem[] = [];
  
  result.forEach(analyse => {
    if (analyse.autreOrganisation) {
      const autreorgeData = {
        autreOrganisation: analyse.autreOrganisation,
      } as Analyseem;
      autreOrganisation.push(autreorgeData);
    }
  });
  
  return autreOrganisation;
}


    
async getautre(): Promise<Analyseem[]> {
  const result = await this.analyseemRepository.find();
  const autreinstitutionnel: Analyseem[] = [];
  
  result.forEach(analyse => {
    if (analyse.autreinstitutionnel) {
      const autreinstitutionneldata = {
        autreinstitutionnel: analyse.autreinstitutionnel,
      } as Analyseem;
      autreinstitutionnel.push(autreinstitutionneldata);
    }
  });
  
  return autreinstitutionnel;
}














async getTotalNumberOfDeclarations(): Promise<number> {
  const count = await this.analyseemRepository.count();
  return count;
}
async getCriticiteDistribution(): Promise<{ criticite: string; percentage: number }[]> {
  const results = await this.getall();
  const totalCount = results.length;

  if (totalCount === 0) {
    // Return an empty distribution with 0 percentage for all categories
    return [
      { criticite: 'Risque acceptable', percentage: 0 },
      { criticite: 'Risque acceptable sous control', percentage: 0 },
      { criticite: 'Risque inacceptable', percentage: 0 },
    ];
  }

  let acceptableCount = 0;
  let controlCount = 0;
  let inacceptableCount = 0;

  for (const result of results) {
    const criticite = result.Criticite;

    if (criticite === 'Risque acceptable') {
      acceptableCount++;
    } else if (criticite === 'Risque acceptable sous control') {
      controlCount++;
    } else if (criticite === 'Risque inacceptable') {
      inacceptableCount++;
    }
  }

  const totalPercentage = (acceptableCount + controlCount + inacceptableCount) / totalCount * 100;

  // Calculate the adjusted percentages if the total percentage exceeds 100%
  let adjustedTotalPercentage = totalPercentage;
  let adjustmentFactor = 1;

  if (totalPercentage > 100) {
    adjustmentFactor = 100 / totalPercentage;
    adjustedTotalPercentage = 100;
  }

  const acceptablePercentage = (acceptableCount / totalCount) * adjustedTotalPercentage;
  const controlPercentage = (controlCount / totalCount) * adjustedTotalPercentage;
  const inacceptablePercentage = (inacceptableCount / totalCount) * adjustedTotalPercentage;

  const percentageDistribution: { criticite: string; percentage: number }[] = [
    { criticite: 'Risque acceptable', percentage: acceptablePercentage },
    { criticite: 'Risque acceptable sous control', percentage: controlPercentage },
    { criticite: 'Risque inacceptable', percentage: inacceptablePercentage },
  ];

  return percentageDistribution;
}


//get by id 
async getanalyseById(
  id: number,
  ): Promise<Analyseem> {
    const found =await this.analyseemRepository.findOne({
        where: { id }
 });
    if(!found){
throw new NotFoundException(`declared with ID "${id}" not found`);
}
return found
}

async updateDecStatus(id:number
  ,status:analysestatus
  
  ): Promise<Analyseem>{
const alanysed= await this.getanalyseById(id)
alanysed.status=status;
await alanysed.save();
return alanysed
  }






  














}