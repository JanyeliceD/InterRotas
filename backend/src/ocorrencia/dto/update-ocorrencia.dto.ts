import { IsString, IsOptional } from "class-validator";

export class UpdateOcorrenciaDto {
    @IsOptional()
    @IsString()
    observacaoAdmin?: string;

    @IsOptional()
    status?: 'ABERTA' | 'EM_ANDAMENTO' | 'RESOLVIDA';
}