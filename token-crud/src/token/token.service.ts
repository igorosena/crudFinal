import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '../token/token.entity';
import { CreateTokenDto } from '../token/create-token.dto';
import { UpdateTokenDto } from '../token/update-token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokensRepository: Repository<Token>,
  ) {}

  create(createTokenDto: CreateTokenDto): Promise<Token> {
    const token = this.tokensRepository.create(createTokenDto);
    return this.tokensRepository.save(token);
  }

  findAll(): Promise<Token[]> {
    return this.tokensRepository.find();
  }

  findOne(id: number): Promise<Token> {
    return this.tokensRepository.findOneBy({ id });
  }

  async update(id: number, updateTokenDto: UpdateTokenDto): Promise<Token> {
    await this.tokensRepository.update(id, updateTokenDto);
    return this.tokensRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.tokensRepository.delete(id);
  }
}
