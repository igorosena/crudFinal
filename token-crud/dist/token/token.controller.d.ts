import { TokenService } from './token.service';
import { CreateTokenDto } from './create-token.dto';
import { UpdateTokenDto } from './update-token.dto';
export declare class TokenController {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    create(createTokenDto: CreateTokenDto): Promise<import("./token.entity").Token>;
    findAll(): Promise<import("./token.entity").Token[]>;
    findOne(id: string): Promise<import("./token.entity").Token>;
    update(id: string, updateTokenDto: UpdateTokenDto): Promise<import("./token.entity").Token>;
    remove(id: string): Promise<void>;
}
