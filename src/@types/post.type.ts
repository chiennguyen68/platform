import { PostStatusEnum } from './enum.type';

export interface IPost {
  id?: string;
  title: string;
  content: string;
  topicId: string[];
  description:string;
  createdAt: number;
  updatedAt: number;
  status: PostStatusEnum;
}
