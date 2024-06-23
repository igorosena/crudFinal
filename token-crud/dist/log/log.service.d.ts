import { Repository } from 'typeorm';
import { Log } from './log.entity';
import { CreateLogDto } from './dto/create-log.dto';
export declare class LogService {
    private logsRepository;
    constructor(logsRepository: Repository<Log>);
    create(createLogDto: CreateLogDto): Promise<Log>;
    findAll(): Promise<Log[]>;
    findOne(id: number): Promise<Log>;
    remove(id: number): Promise<void>;
}
