import {
  BarChartIcon,
  CategoryIcon,
  DashboardIcon,
  FileTextFillIcon,
  GearIcon,
  PinMapIcon,
} from '@/icons';

// Routes
import { ROUTES } from './routes';

export const MENU = [
  {
    icon: DashboardIcon,
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
  },
  {
    icon: FileTextFillIcon,
    label: 'Product',
    path: ROUTES.PRODUCT,
  },
  {
    icon: CategoryIcon,
    label: 'Customers',
    path: ROUTES.CUSTOMERS,
  },
  {
    icon: PinMapIcon,
    label: 'Agen',
    path: ROUTES.AGEN,
  },
  {
    icon: BarChartIcon,
    label: 'Analytic',
    path: ROUTES.ANALYTIC,
  },
  {
    icon: GearIcon,
    label: 'Setting',
    path: ROUTES.SETTING,
  },
];
