const mapping: Record<string, string> = {
  blogs: 'blog',
  follows: 'follow',
  organizations: 'organization',
  posts: 'post',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
