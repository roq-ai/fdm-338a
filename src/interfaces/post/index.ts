import { UserInterface } from 'interfaces/user';
import { BlogInterface } from 'interfaces/blog';
import { GetQueryInterface } from 'interfaces';

export interface PostInterface {
  id?: string;
  text_content: string;
  image?: string;
  video?: string;
  audio?: string;
  user_id?: string;
  blog_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  blog?: BlogInterface;
  _count?: {};
}

export interface PostGetQueryInterface extends GetQueryInterface {
  id?: string;
  text_content?: string;
  image?: string;
  video?: string;
  audio?: string;
  user_id?: string;
  blog_id?: string;
}
