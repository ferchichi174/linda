import { Body, Controller, Inject, Post, Get, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from 'src/common/dtos/auth-credentials.dto';
import { User } from 'src/enteties/user.entity';
import { SingCredentialsDto } from 'src/common/dtos/signin-credentials.dto';


@Controller('users')
export class AuthController {
    constructor( 
        @Inject(AuthService)
        private authService: AuthService,
     ){}


@Get()
async getAllUsers(): Promise<User[]> {
    return await this.authService.getAll();
  }
// @Post('/signup')
// signUp(@Body(ValidationPipe) authCredantialsDto:AuthCredentialsDto){
//     return this.authService.signUp(authCredantialsDto);
// }

@Post('/signup')
    async signUp(@Body(ValidationPipe) authCredantialsDto:AuthCredentialsDto){
        return await this.authService.signUp(authCredantialsDto)
    }
@Post('/signin')
    async signIn(@Body(ValidationPipe) authCredantialsDto:SingCredentialsDto): Promise<{accesToken:string}>{
        console.log('azazeazeaze',authCredantialsDto)
         return await this.authService.signIn(authCredantialsDto)

    }


}
