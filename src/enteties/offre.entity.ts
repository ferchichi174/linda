import { BaseEntity, Entity, PrimaryGeneratedColumn,Column, ManyToOne} from 'typeorm';
import { User } from './user.entity';
import { OffreStatus } from 'src/common/enums/offre-status.enum';

@Entity()
export class Offre extends BaseEntity {
 @PrimaryGeneratedColumn()   
id:number;
@Column()
title:string;

@Column()
description:string;
@Column()
status:OffreStatus;
@ManyToOne(type=>User,user=>user.offres,{eager:false})
user:User;
@Column()
userId:number
}