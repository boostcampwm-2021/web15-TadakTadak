import { IsEnum, IsInt, IsNotEmpty, Max, MaxLength, Min } from 'class-validator';
import { RoomType } from '../room.entity';

export class CreateRoomRequestDto {
  @IsNotEmpty()
  readonly userId: number;

  @IsNotEmpty()
  @MaxLength(20)
  readonly title: string;

  @IsInt()
  @Min(2)
  @Max(9)
  @IsNotEmpty()
  readonly maxHeadcount: number;

  @IsNotEmpty()
  @IsEnum(RoomType)
  readonly roomType: RoomType;
}
