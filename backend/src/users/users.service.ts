import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User> // Using this repository is injected to service
    ) {

    }
    async createUser(data: CreateUserDto): Promise<User> {
        const newUser = this.userRepo.create(data); //It will create the instance of user object
        return await this.userRepo.save(newUser); //It will save the data to database
    }

     async findUserByEmail(email: string): Promise<User | null> {
       return this.userRepo.findOne({ where: { email } });
    }   
}
