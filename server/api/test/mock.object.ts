import { DevFieldBuilder } from '../src/builder/dev-field/dev-field.builder';
import { RoomBuilder, UserBuilder } from '../src/builder';
import { datatype, internet, lorem } from 'faker';
import { RoomType } from '../src/domain/room/room.entity';

export const mockDevField = new DevFieldBuilder().setId(0).setName('Back-end').build();

export const mockUser = new UserBuilder()
  .setId(datatype.number())
  .setNickname(lorem.sentence())
  .setEmail(internet.email())
  .setPassword('')
  .setDevField(mockDevField)
  .setIntroduction('')
  .setImageName('')
  .setImageURL(process.env.DEFAULT_IMG)
  .setHistorys([])
  .setIsSocial(false)
  .build();

export const mockRoom = new RoomBuilder()
  .setUUID(lorem.sentence())
  .setRoomType(RoomType.TadakTadak)
  .setDescription(lorem.sentence())
  .setAgoraAppID(lorem.sentence())
  .setAgoraToken(lorem.sentence())
  .setMaxHeadcount(datatype.number(9))
  .setNowHeadcount(1)
  .setOwner(mockUser)
  .build();
