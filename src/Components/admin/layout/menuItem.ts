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
        title: 'Operator',
        link: { href: '/adminpanel/category/operator' },
      },
      {
        title: 'Security',
        link: { href: '/adminpanel/category/security' },
      },
      {
        title: 'Development',
        link: { href: '/adminpanel/category/development' },
      },
      {
        title: 'CloudVirtual',
        link: { href: '/adminpanel/category/cloudVirtual' },
      },
      {
        title: 'Management',
        link: { href: '/adminpanel/category/management' },
      },
      {
        title: 'Design',
        link: { href: '/adminpanel/category/design' },
      },
      {
        title: 'Tool',
        link: { href: '/adminpanel/category/tool' },
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
    link: { href: '/adminpanel/system' },
  },
];

export default items;
