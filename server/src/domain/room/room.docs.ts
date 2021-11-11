import { ApiParamOptions, ApiQueryOptions } from '@nestjs/swagger';
import { RoomType, roomTypeToArray } from './room.entity';

export class RoomAPIDocs {
  static getRoomListByTypeOperation(): { summary: string; description: string } {
    return { summary: '방 검색 API', description: '키워드, 페이지 별로 방을 검색합니다.' };
  }

  static getRoomListByTypeQueryType(): ApiQueryOptions {
    return {
      name: 'type',
      example: RoomType.TadakTadak,
      required: true,
      description: `검색할 방의 타입입니다.\n
      ${roomTypeToArray()}가 존재합니다.`,
    };
  }

  static getRoomListByTypeQuerySearch(): ApiQueryOptions {
    return {
      name: 'search',
      example: '재밌는',
      required: true,
      description: '검색할 방의 제목입니다.',
    };
  }

  static getRoomListByTypeQueryTake(): ApiQueryOptions {
    return {
      name: 'take',
      example: 5,
      required: true,
      description: '결과를 몇개의 단위로 가져올지 입니다.',
    };
  }

  static getRoomListByTypeQueryPage(): ApiQueryOptions {
    return {
      name: 'page',
      example: 1,
      required: true,
      description: '몇 번째 페이지의 결과를 가져올지 입니다.',
    };
  }

  static getRoomByUUIDParamUUID(): ApiParamOptions {
    return {
      name: 'uuid',
      example: 'c5ddd9c2-02c6-4cdf-a1d1-077e00103f91',
      required: true,
      description: '방의 UUID 입니다.',
    };
  }
}
