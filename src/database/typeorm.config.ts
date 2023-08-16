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
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password:process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    entities:[Offre, User,Declarerem,Analyseem, Archieve , Remarque],
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,

    
}