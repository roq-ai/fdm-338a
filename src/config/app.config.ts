interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Community Moderator'],
  customerRoles: [],
  tenantRoles: ['Blog Owner', 'Content Creator', 'Community Moderator'],
  tenantName: 'Organization',
  applicationName: 'Fdm',
  addOns: [],
};
