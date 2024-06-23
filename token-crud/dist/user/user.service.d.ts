import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from '../user/create-user.dto';
import { UpdateUserDto } from '../user/update-user.dto';
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
}
