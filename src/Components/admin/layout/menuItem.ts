import { MenuItemType } from '@paljs/ui/types';
// import AcUnitIcon from '@mui/icons-material/AcUnit';

const items: MenuItemType[] = [
  {
    title: 'Home Page',
    icon: { name: 'home' },
    link: { href: '/adminpanel/dashboard' },
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Manage User',
    icon: { name: 'people-outline' },
    link: { href: '/adminpanel/customer' },
  },
  {
    title: 'Manage Post',
    icon: { name: 'edit-2-outline' },
    link: { href: '/adminpanel/posts' },
  },
  {
    title: 'Manage Tag',
    icon: { name: 'pricetags-outline' },
    link: { href: '/adminpanel/tag' },
  },
  {
    title: 'Manage Category',
    icon: { name: 'folder-outline' },
    children: [
      {
        title: 'Create Category',
        link: { href: '/adminpanel/category/create' },
      },
      {
        title: 'List Category',
        link: { href: '/adminpanel/category/security' },
      },
    ],
  },
  {
    title: 'Manage Member',
    icon: { name: 'person-outline' },
    link: { href: '/adminpanel/member' },
  },
  {
    title: 'System Setting',
    icon: { name: 'settings-outline' },
    link: { href: '/adminpanel/setting' },
  },
];

export default items;
