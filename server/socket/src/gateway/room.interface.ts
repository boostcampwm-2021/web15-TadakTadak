import { LocalDateTime } from '@js-joda/core';

export interface IRoomRequest {
  uuid: string;
  nickname: string;
  kickNickname?: string;
  field?: string;
  img?: string;
  maxHead: number;
}

export enum MessageType {
  Message = 'Message',
  Code = 'Code',
}

export enum CodeLanguage {
  JavaScript = 'JavaScript',
  TypeScript = 'TypeScript',
  Java = 'Java',
  Kotlin = 'Kotlin',
  Swift = 'Swift',
  None = 'None',
}

export interface IMessage {
  type?: MessageType;
  language?: string;
  time?: LocalDateTime;
  uuid: string;
  nickname: string;
  message: string;
}
