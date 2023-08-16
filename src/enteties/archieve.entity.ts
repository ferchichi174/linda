import { BaseEntity, Entity, PrimaryGeneratedColumn,Column, ManyToOne, OneToMany} from 'typeorm';
import { Analyseem } from './analyseem.entity';
import { DeclardStatus } from 'src/common/enums/declare-status.enum';







@Entity()
export class Archieve extends BaseEntity {
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


@OneToMany((type) => Analyseem, (analyse) => analyse.declarem, { eager: true })
analyses: Analyseem[];
 
@Column()
status:DeclardStatus



}