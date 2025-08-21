import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
export declare class ContentsController {
    private readonly contentsService;
    constructor(contentsService: ContentsService);
    create(createContentDto: CreateContentDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateContentDto: UpdateContentDto): string;
    remove(id: string): string;
}
