import { IsEnum, IsInt, IsNotEmpty, Max, MaxLength, Min } from 'class-validator';
import { Room, RoomType } from '../room.entity';

export class CreateRoomRequestDto {
  @IsNotEmpty()
  readonly userId: number;

  @IsNotEmpty()
  @MaxLength(10)
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
