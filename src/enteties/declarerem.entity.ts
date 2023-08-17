import { BaseEntity, Entity, PrimaryGeneratedColumn,Column, ManyToOne, OneToMany} from 'typeorm';
import { categoriepatient } from 'src/common/enums/categoriepatient.enum';
import { categorievoierisque} from 'src/common/enums/categorievoierisque.enum';
import { degrerealisation} from 'src/common/enums/degrerealisation.enum';
import { etapedesurvenu} from 'src/common/enums/etapedesurvenu.enum';
import { manieredeclaration} from 'src/common/enums/manieredeclaration.enum';
import { ne } from 'src/common/enums/ne.enum';
import { neverevent} from 'src/common/enums/neverevent.enum';
import { patientrisque} from 'src/common/enums/patientrisque.enum';
import { service} from 'src/common/enums/service.enum';
import { voieadministrationrisque} from 'src/common/enums/voieadministrationrisque.enum';
import { medicamentarisque} from 'src/common/enums/medicamentarisque.enum';
import { categoriemedicamentrisque} from 'src/common/enums/categoriemedicamentrisque.enum';
import { Analyseem } from './analyseem.entity';
import { DeclardStatus } from 'src/common/enums/declare-status.enum';







@Entity()
export class Declarerem extends BaseEntity {
 @PrimaryGeneratedColumn()   
id:number;
@Column({ nullable: true })
// non :  
// oui : not being : nom prenom fonction 
ManiereDeclaration:string;
@Column({ nullable: true })
Nom:string;

@Column({ nullable: true })
Prenom:string;

@Column({ nullable: true })
Fonction:string;
@Column({ nullable: true })
Date_Dec:Date;
@Column({ nullable: true })
DateEvent:Date;
@Column({ nullable: true })
service:string;
@Column({ nullable: true })
NeverEvent:string; 
@Column({ nullable: true })
Lequel:string;
@Column({ nullable: true })
EtatPatient:string;
@Column({ nullable: true })
PatientRisque:string;
@Column({ nullable: true })
CatégoriePatient:string;
@Column({ nullable: true })
NomMedicament:string;
@Column({ nullable: true })
Medicamentarisque:string;
@Column({ nullable: true })
CategorieMedicamentarisque:string;
@Column({ nullable: true })
NomVoie:string;
@Column({ nullable: true })
VoieAdministrationarisque:string;
@Column({ nullable: true })
CategorieVoiearisque:string;
@Column({ nullable: true })
Degrerealisation:string;
@Column({ nullable: true })
etapedesurvenu:string;
@Column({ nullable: true })
DescEvent:string;
@Column({ nullable: true })
Impact:string;
@Column({ nullable: true })
email:string;
@Column({ nullable: true })
pole:string;


@OneToMany((type) => Analyseem, (analyse) => analyse.declarem, { eager: true })
analyses: Analyseem[];
 
@Column()
status:DeclardStatus

;




}