import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './log.entity';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private logsRepository: Repository<Log>,
  ) {}

  create(createLogDto: CreateLogDto): Promise<Log> {
    const log = this.logsRepository.create(createLogDto);
    return this.logsRepository.save(log);
  }

  findAll(): Promise<Log[]> {
    return this.logsRepository.find();
  }

  findOne(id: number): Promise<Log> {
    return this.logsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.logsRepository.delete(id);
  }
}
