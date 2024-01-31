import { PRIVATE_ROUTES } from '@/constants';

export function isPrivateRoute (route: string): boolean {
  return Object.values(PRIVATE_ROUTES).includes(route);
}