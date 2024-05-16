export interface MenuItem {
  title: string;
  link?: string;
  action?: CallableFunction;
  requireAuth: boolean;
}
