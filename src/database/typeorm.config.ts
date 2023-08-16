import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config'
import { Analyseem } from "src/enteties/analyseem.entity";
import { Archieve } from "src/enteties/archieve.entity";
import { Declarerem } from "src/enteties/declarerem.entity";
import { Offre } from "src/enteties/offre.entity";
import { Remarque } from "src/enteties/remarque.entity";
import { User } from "src/enteties/user.entity";

const dbConfig = config.get('db')

export const typeOrmConfig: TypeOrmModuleOptions={
    type: 'postgres',
    host: 'linda.postgres.database.azure.com',
    port: 5432,
    username: 'linda@linda',
    password:'BLOWblow123?',
    database: 'stage',
    entities:[Offre, User,Declarerem,Analyseem, Archieve , Remarque],
    synchronize: true,

    
}
