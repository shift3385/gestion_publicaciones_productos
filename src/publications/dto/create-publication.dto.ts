import { IsDateString, IsUUID, IsEnum, IsOptional } from 'class-validator';
import { PublicationStatus } from '../entities/publication.entity';

export class CreatePublicationDto {
  @IsDateString() // Valida formato ISO-8601 (YYYY-MM-DDTHH:mm:ss.sssZ)
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsUUID()
  productId: string;

  @IsEnum(PublicationStatus)
  @IsOptional()
  status?: PublicationStatus;
}
