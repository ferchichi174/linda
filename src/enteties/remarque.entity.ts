
import { BaseEntity, Entity, PrimaryGeneratedColumn,Column, ManyToOne} from 'typeorm';



@Entity()
export class Remarque extends BaseEntity {
 @PrimaryGeneratedColumn()   
id:number;


@Column()
Text:string;



}