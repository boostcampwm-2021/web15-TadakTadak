export interface IRoomRequest {
  roomId: string;
  nickname: string;
  kickNickname?: string;
  field?: string;
  img?: string;
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
  roomId: string;
  nickname: string;
  message: string;
}
