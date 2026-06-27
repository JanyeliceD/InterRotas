import {
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertaDto } from './create-alerta.dto';

export class UpdateAlertaDto extends PartialType(CreateAlertaDto) {

  @IsOptional()
  @IsString()
  status?: 'NOVO' | 'CIENTE' | 'ATENDIDO';

}