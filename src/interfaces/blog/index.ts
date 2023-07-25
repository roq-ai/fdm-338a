import { PostInterface } from 'interfaces/post';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface BlogInterface {
  id?: string;
  name: string;
  css_design?: string;
  user_id?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  post?: PostInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    post?: number;
  };
}

export interface BlogGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  css_design?: string;
  user_id?: string;
  organization_id?: string;
}
