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
    link: { href: '/adminpanel/user' },
  },
  {
    title: 'Manage Article',
    icon: { name: 'edit-2-outline' },
    children: [
      {
        title: 'News',
        link: { href: '/adminpanel/news' },
      },
      {
        title: "User's Article",
        link: { href: '/adminpanel/articles' },
      },
    ],
  },
  {
    title: 'Manage Tag',
    icon: { name: 'pricetags-outline' },
    children: [
      {
        title: 'Create Tag',
        link: { href: '/adminpanel/tag/create' },
      },
      {
        title: 'List Tag',
        link: { href: '/adminpanel/tag' },
      },
    ],
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
        link: { href: '/adminpanel/category' },
      },
    ],
  },
  {
    title: 'Manage Admin',
    icon: { name: 'person-outline' },
    link: { href: '/adminpanel/admin' },
  },
  {
    title: 'System Setting',
    icon: { name: 'settings-outline' },
    link: { href: '/adminpanel/system' },
  },
];

export default items;
