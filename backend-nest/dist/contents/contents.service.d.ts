import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
export declare class ContentsService {
    create(createContentDto: CreateContentDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateContentDto: UpdateContentDto): string;
    remove(id: number): string;
}
