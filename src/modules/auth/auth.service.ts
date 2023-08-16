import { ConflictException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { User } from 'src/enteties/user.entity';
import { AuthCredentialsDto } from 'src/common/dtos/auth-credentials.dto';
import { SingCredentialsDto } from 'src/common/dtos/signin-credentials.dto';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService') 

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService:JwtService,
      ){}

  
    
    async signUp(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        const {email, password}= authCredentialsDto;
        
        
        const user = new User();
        user.email=email;
        user.salt=await bcrypt.genSalt();;

        user.password=await this.hashPassword(password,user.salt);
        
try {
    await user.save()

}catch(error){
if (error.code=== '23505'){ //duplicate username
throw new ConflictException('email already exist')

} else{
    throw new InternalServerErrorException();
}
}

    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.find();
      }
    

//Sign in 
async signIn(authCredentialsDto: SingCredentialsDto): Promise<{ accesToken: string  }> {
  console.log('11')
  const email = await this.ValidateUserPassword(authCredentialsDto);
  console.log('email',email)

  if (!email) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const user = await this.userRepository.findOne({
    where: {
      email: authCredentialsDto.email,
    },
  }); // Retrieve user object from database
  console.log('44')

  const payload: JwtPayload = {
    email: user.email,
  };
  console.log('55')

  const accesToken = await this.jwtService.sign(payload);
  console.log('====',accesToken)
  return { accesToken };
}

  


   //validate password then we used in the method signIn 
    async ValidateUserPassword(authCredantialsDto:SingCredentialsDto):Promise<string>{
const {email, password}= authCredantialsDto;
const user=await this.userRepository.findOne({
    where: {  email }
});

if (user && await user.validatePassword(password)){
    return user.email;
    
}
else {
    
    return null
    

}




    }
   
    //hash password
    private async hashPassword(password:string,salt:string):Promise<string>{
        return bcrypt.hash(password,salt);
    }
  
}
