import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
export declare class LogController {
    private readonly logService;
    constructor(logService: LogService);
    create(createLogDto: CreateLogDto): Promise<import("./log.entity").Log>;
    findAll(): Promise<import("./log.entity").Log[]>;
    findOne(id: string): Promise<import("./log.entity").Log>;
    remove(id: string): Promise<void>;
}
