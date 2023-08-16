import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Offre } from "./offre.entity";
import { Role } from "src/common/enums/role.enum";

@Entity()
@Unique(['email'])
export class User extends BaseEntity{
 @PrimaryGeneratedColumn()   
id: number;
@Column()
email: string;

@Column()
password: string;
@Column()
salt:string;
@OneToMany((type) => Offre, (offre) => offre.user, { eager: true })
offres: Offre[];
roles: Role[];
async validatePassword(password: string): Promise <boolean>{
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
}

}