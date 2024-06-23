import { Repository } from 'typeorm';
import { Token } from '../token/token.entity';
import { CreateTokenDto } from '../token/create-token.dto';
import { UpdateTokenDto } from '../token/update-token.dto';
export declare class TokenService {
    private tokensRepository;
    constructor(tokensRepository: Repository<Token>);
    create(createTokenDto: CreateTokenDto): Promise<Token>;
    findAll(): Promise<Token[]>;
    findOne(id: number): Promise<Token>;
    update(id: number, updateTokenDto: UpdateTokenDto): Promise<Token>;
    remove(id: number): Promise<void>;
}
