import { IsMongoId } from 'class-validator';
import mongoose from 'mongoose';

export class ParamCheckDTO {
  @IsMongoId()
  id: mongoose.Schema.Types.ObjectId;
}
