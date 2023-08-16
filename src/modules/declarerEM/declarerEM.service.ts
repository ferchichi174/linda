import { Injectable, InternalServerErrorException, Logger, NotFoundException,UnauthorizedException } from '@nestjs/common';

import {InjectRepository} from '@nestjs/typeorm'
import { Between, Not, Repository } from 'typeorm';
import { CreateOffreDto } from 'src/common/dtos/create-offre.dto';
import { GetOffresFilterDto } from 'src/common/dtos/get-offres-filter.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/enteties/user.entity';
import { Offre } from 'src/enteties/offre.entity';
import { OffreStatus } from 'src/common/enums/offre-status.enum';
import { Declarerem } from 'src/enteties/declarerem.entity';
import { CreateDeclaredDto } from 'src/common/dtos/declare.dto';
import { manieredeclaration } from 'src/common/enums/manieredeclaration.enum';
import { ModifiedDeclaredDto } from 'src/common/dtos/modify-declared.dto';
import { DeclardStatus } from 'src/common/enums/declare-status.enum';
import { Archieve } from 'src/enteties/archieve.entity';
import { AddRemarque } from 'src/common/dtos/Remarque.dto';
import { Remarque } from 'src/enteties/remarque.entity';
import * as nodemailer from 'nodemailer';


@Injectable()
export class DeclarerService {
  constructor(
    @InjectRepository(Declarerem)
    private declarerRepository: Repository<Declarerem>,
    @InjectRepository(Archieve)
    private archieveRepository: Repository<Archieve>,
    @InjectRepository(Remarque)
    private remarqueRepository: Repository<Remarque>,

  ){}

  async createOffre(CreatedeclaredDto: CreateDeclaredDto): Promise<Declarerem> {
    const {
      Nom,
      Prenom,
      ManiereDeclaration,
      PatientRisque,
      CatégoriePatient,
      NomMedicament,
      Medicamentarisque,
      CategorieMedicamentarisque,
      NomVoie,
      VoieAdministrationarisque,
      CategorieVoiearisque,
      Degrerealisation,
      etapedesurvenu,
      DescEvent,
      Impact,
      Fonction,
      Date_Dec,
      DateEvent,
      service,
      NeverEvent,
      Lequel,
      EtatPatient,
      email
    } = CreatedeclaredDto;
  
    const Declared = new Declarerem();
  
    
      Declared.Nom = Nom;
      Declared.Prenom = Prenom;
      Declared.Fonction = Fonction;
     
    
  
    Declared.ManiereDeclaration = ManiereDeclaration;
    Declared.PatientRisque = PatientRisque;
    Declared.CatégoriePatient = CatégoriePatient;
    Declared.NomMedicament = NomMedicament;
    Declared.Medicamentarisque = Medicamentarisque;
    Declared.CategorieMedicamentarisque = CategorieMedicamentarisque;
    Declared.NomVoie = NomVoie;
    Declared.VoieAdministrationarisque = VoieAdministrationarisque;
    Declared.CategorieVoiearisque = CategorieVoiearisque;
    Declared.Degrerealisation = Degrerealisation;
    Declared.etapedesurvenu = etapedesurvenu;
    Declared.DescEvent = DescEvent;
    Declared.Impact = Impact;
    Declared.Date_Dec = Date_Dec;
    Declared.DateEvent = DateEvent;
    Declared.service = service;
    Declared.NeverEvent = NeverEvent;
    Declared.Lequel = Lequel;
    Declared.EtatPatient = EtatPatient;
    Declared.status = DeclardStatus.DECLARER;
    Declared.email=email
    const archieve = new Archieve();
  
    
    archieve.Nom = Nom;
    archieve.Prenom = Prenom;
    archieve.Fonction = Fonction;
     
    
  
    archieve.ManiereDeclaration = ManiereDeclaration;
    archieve.PatientRisque = PatientRisque;
    archieve.CatégoriePatient = CatégoriePatient;
    archieve.NomMedicament = NomMedicament;
    archieve.Medicamentarisque = Medicamentarisque;
    archieve.CategorieMedicamentarisque = CategorieMedicamentarisque;
    archieve.NomVoie = NomVoie;
    archieve.VoieAdministrationarisque = VoieAdministrationarisque;
    archieve.CategorieVoiearisque = CategorieVoiearisque;
    archieve.Degrerealisation = Degrerealisation;
    archieve.etapedesurvenu = etapedesurvenu;
    archieve.DescEvent = DescEvent;
    archieve.Impact = Impact;
    archieve.Date_Dec = Date_Dec;
    archieve.DateEvent = DateEvent;
    archieve.service = service;
    archieve.NeverEvent = NeverEvent;
    archieve.Lequel = Lequel;
    archieve.EtatPatient = EtatPatient;
    archieve.status = DeclardStatus.DECLARER;

  
    await this.declarerRepository.save(Declared); // Save the entry in Declarerem table
    await this.archieveRepository.save(archieve); 
    const declareddec = await this.declarerRepository.save(Declared);

    // Send email notification
    if (Declared.email) {
      const emailSubject = 'New declaration Created';
      await this.sendEmail(emailSubject, declareddec, Declared.email);
    }
    return declareddec

  }
 
  
  //get   all data
  async getall(): Promise<Declarerem[]> {
    const result = await this.declarerRepository.find({
      where: {
        status: Not(DeclardStatus.REJECTED),
      },
    });
    return result;
  }



  async getarchive(): Promise<Archieve[]> {
    const result =await this.archieveRepository.find()
    return result 
  
  }

  async getOffresById(
    id: number,
    ): Promise<Declarerem> {
      const found =await this.declarerRepository.findOne({
          where: { id }
   });
      if(!found){
throw new NotFoundException(`declared with ID "${id}" not found`);
}
return found
}
async modifyOffre(id: number, ModifiedDeclaredDto: ModifiedDeclaredDto): Promise<Declarerem> {
  const {
    Nom,
    Prenom,
    ManiereDeclaration,
    PatientRisque,
    CatégoriePatient,
    NomMedicament,
    Medicamentarisque,
    CategorieMedicamentarisque,
    NomVoie,
    VoieAdministrationarisque,
    CategorieVoiearisque,
    Degrerealisation,
    etapedesurvenu,
    DescEvent,
    Impact,
    Fonction,
    Date_Dec,
    DateEvent,
    service,
    NeverEvent,
    Lequel,
    EtatPatient
  } = ModifiedDeclaredDto;

  const declared = await this.getOffresById(id)

  ;
  if (!declared) {
    throw new Error('Declaration not found');
  }

  declared.Nom = Nom;
  declared.Prenom = Prenom;
  declared.Fonction = Fonction;
  declared.ManiereDeclaration = ManiereDeclaration;
  declared.PatientRisque = PatientRisque;
  declared.CatégoriePatient = CatégoriePatient;
  declared.NomMedicament = NomMedicament;
  declared.Medicamentarisque = Medicamentarisque;
  declared.CategorieMedicamentarisque = CategorieMedicamentarisque;
  declared.NomVoie = NomVoie;
  declared.VoieAdministrationarisque = VoieAdministrationarisque;
  declared.CategorieVoiearisque = CategorieVoiearisque;
  declared.Degrerealisation = Degrerealisation;
  declared.etapedesurvenu = etapedesurvenu;
  declared.DescEvent = DescEvent;
  declared.Impact = Impact;
  declared.Date_Dec = Date_Dec;
  declared.DateEvent = DateEvent;
  declared.service = service;
  declared.NeverEvent = NeverEvent;
  declared.Lequel = Lequel;
  declared.EtatPatient = EtatPatient;
  declared.status=DeclardStatus.VALIDER


  return await this.declarerRepository.save(declared);
}

//update status 
async updateDeclaredStatus(id:number
  
  ): Promise<Declarerem>{
const declared= await this.getOffresById(id)
declared.status=DeclardStatus.ANALYSER;
await declared.save();
return declared
  }

  async updateDecStatus(id:number
    ,status:DeclardStatus
    
    ): Promise<Declarerem>{
  const declared= await this.getOffresById(id)
  declared.status=status;
  await declared.save();
  return declared
    }
  



  //Test

  async getTotalNumberOfDeclarations(): Promise<number> {
    const count = await this.declarerRepository.count();
    return count;
  }
  async getNumberOfNeverEvents(): Promise<number> {
    const count = await this.declarerRepository.count({
      where: {
        NeverEvent: 'Oui',
      },
    });
    
    return count;
  }
  

//category patient risque 
async getCountOfPatientsAtRiskByCategory(): Promise<{ category: number, count: number }[]> {
  const categories = [1, 2, 3, 4];
  const countsPromises = categories.map(async (category) => {
    const count = await this.declarerRepository.count({
      where: {
        CatégoriePatient: String(category),
        PatientRisque: 'Oui',
      },
    });
    return { category, count };
  });

  const counts = await Promise.all(countsPromises);
  return counts;
}

//category md risque 
async getCountOfmedicamentByCategory(): Promise<{ category: number, count: number }[]> {
  const categories = [1, 2, 3, 4 ,5 ,6,7];
  const countsPromises = categories.map(async (category) => {
    const count = await this.declarerRepository.count({
      where: {
        CategorieMedicamentarisque: String(category),
        Medicamentarisque: 'Oui',
      },
    });
    return { category, count };
  });

  const counts = await Promise.all(countsPromises);
  return counts;
}

// voi admin... by category for chart 
async getCountOfadminByCategory(): Promise<{ category: number, count: number }[]> {
  const categories = [1, 2, 3];
  const countsPromises = categories.map(async (category) => {
    const count = await this.declarerRepository.count({
      where: {
        CategorieVoiearisque: String(category),
        VoieAdministrationarisque: 'Oui',
      },
    });
    return { category, count };
  });

  const counts = await Promise.all(countsPromises);
  return counts;
}






  async getNumberOfEMToday(): Promise<number> {
    const currentDate = new Date();
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59
    );
  
    const count = await this.declarerRepository.count({
      where: {
        DateEvent: Between(startOfDay, endOfDay),
      },
    });
  
    return count;
  }

  async getNumberOfDeclarationsByService(service: string): Promise<number> {
    return await this.declarerRepository.count({
      where: {
        service:service,
      },
    });;
  }
  //send mail 

  async sendEmail(subject: string, declared: Declarerem ,recipientEmail: string): Promise<void> {
    try {
      // Create a transporter
      const transporter = nodemailer.createTransport({
        // Set up your email provider configuration
        // For example, if using Gmail:
        service: 'gmail',
        auth: {
          user: 'chicechice96@gmail.com',
          pass: 'pcbachhabqkvftae',
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
  
      // Generate the table rows for each attribute of the declared object
     // Generate the table rows for each attribute of the declared object
// Generate the table rows for each attribute of the declared object
const tableRows = Object.entries(declared).map(([key, value]) => {
  return `<tr><td style="border: 1px solid black; padding: 5px;"><strong>${key}</strong></td><td style="border: 1px solid black; padding: 5px;">${value}</td></tr>`;
});

  
      // Construct the table HTML with the generated rows and add borders
      const tableHTML = `
        <table style="border-collapse: collapse; border: 1px solid black;">
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Numero declaration: ${declared.id} </td></tr>
            ${tableRows.join('')}
          </tbody>
        </table>
      `;
  
      // Define the email options
      const mailOptions = {
        from: 'chicechice96@gmail.com', // Sender address
        to: recipientEmail, // Recipient address
        subject: subject, // Subject line
        text: `A declaration has been created:\n\nID: ${declared.id}\n\n${tableRows.join('\n')}`, // Plain text body
        html: `<p>A declaration has been created:</p>${tableHTML}`, // HTML body
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
  
      // Log success or handle other actions
      Logger.log('Email sent successfully');
    } catch (error) {
      // Handle errors
      Logger.error('Failed to send email', error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }
  
  



  
  async getNumberOfDeclarationsForAllServices(): Promise<{ service: string; count: number }[]> {
    const services = ['Gérontologie','Mère enfant', 'Chirurgie', 'Médico-Technique', 'Médecine', 'Plateau Technique']; // Add all your services here
    const results: { service: string; count: number }[] = [];

    for (const service of services) {
      const count = await this.getNumberOfDeclarationsByService(service);
      results.push({ service, count });
    }

    return results;
  }
   async getCriticiteDistribution(): Promise<{ status: string; percentage: number }[]> {
  const results = await this.getall();

  const totalCount = results.length;
  let acceptableCount = 0;
  let controlCount = 0;
  let inacceptableCount = 0;

  for (const result of results) {
    const status = result.status;

    if (status === DeclardStatus.VALIDER) {
      acceptableCount++;
    } else if (status === DeclardStatus.EN_ATTENTE) {
      controlCount++;
    } else if (status === DeclardStatus.ANALYSER) {
      inacceptableCount++;
    }
  }

  const totalPercentage = (acceptableCount + controlCount + inacceptableCount) / totalCount * 100;

  // Calculate the adjusted percentages if the total percentage exceeds 100%
  const acceptablePercentage = (acceptableCount / totalCount) * 100;
  const controlPercentage = (controlCount / totalCount) * 100;
  const inacceptablePercentage = (inacceptableCount / totalCount) * 100;

  const adjustedTotalPercentage = acceptablePercentage + controlPercentage + inacceptablePercentage;
  const adjustmentFactor = adjustedTotalPercentage > 100 ? 100 / adjustedTotalPercentage : 1;

  const percentageDistribution: { status: string; percentage: number }[] = [
    { status: DeclardStatus.VALIDER, percentage: acceptablePercentage * adjustmentFactor || 0 },
    { status: DeclardStatus.EN_ATTENTE, percentage: controlPercentage * adjustmentFactor || 0 },
    { status: DeclardStatus.ANALYSER, percentage: inacceptablePercentage * adjustmentFactor || 0 },
  ];

  return percentageDistribution;
}


async createRemarque(createRemarque: AddRemarque): Promise<Remarque> {
  const { Text } = createRemarque;

  const newRemarque = new Remarque();
  newRemarque.Text = Text;

  const createdRemarque = await this.remarqueRepository.save(newRemarque);

  // Construct the email message
  const emailMessage = `This remarque is added: ${Text}`;

  // Send the email
  const emailSubject = 'New Remarque Created';
  const recipientEmail = 'boualleguelinda123@gmail.com';
  await this.sendEmailremarque(emailSubject, emailMessage, recipientEmail);

  return createdRemarque;
}

async sendEmailremarque(subject: string, message: string, recipientEmail: string): Promise<void> {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      // Set up your email provider configuration
      // For example, if using Gmail:
      service: 'gmail',
      auth: {
        user: 'chicechice96@gmail.com',
        pass: 'pcbachhabqkvftae',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Construct the email body with structured formatting
    const emailBody = `
      <p>This remarque is added:</p>
      <pre>${message}</pre>
    `;

    // Define the email options with HTML body
    const mailOptions = {
      from: 'chicechice96@gmail.com', // Sender address
      to: recipientEmail, // Recipient address
      subject: subject, // Subject line
      html: emailBody, // Email body with HTML formatting
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Log success or handle other actions
    Logger.log('Email sent successfully');
  } catch (error) {
    // Handle errors
    Logger.error('Failed to send email', error);
    throw new InternalServerErrorException('Failed to send email');
  }
}






}