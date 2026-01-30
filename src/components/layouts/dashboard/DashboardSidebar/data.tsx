export type TNavbarLinkTrigger = "url" | "action";
export type TNavbarLinkAction = "logout";

export interface INavbarLink {
  id: string;
  title: string;
  icon: string;
  trigger: TNavbarLinkTrigger;
  url?: string;
  action?: TNavbarLinkAction;
  disabled?: boolean;
}

export const NAVBAR_TOP_LINKS: INavbarLink[] = [
  {
    id: "1",
    title: "Dashboard",
    url: "/dashboard",
    icon: "/icons/house.svg",
    trigger: "url",
  },

  {
    id: "2",
    title: "Users",
    url: "/dashboard/users",
    icon: "/icons/users.svg",
    trigger: "url",
  },

  {
    id: "3",
    title: "Products",
    url: "/dashboard/products",
    icon: "/icons/tag.svg",
    trigger: "url",
  },

  // {
  //   id: "4",
  //   title: "Pending Products",
  //   url: "/dashboard/pending-products",
  //   icon: "/icons/globe-white.svg",
  //   trigger: "url",
  // },

  {
    id: "5",
    title: "Orders",
    url: "/dashboard/orders",
    icon: "/icons/receipt.svg",
    trigger: "url",
  },

  // {
  //    id: '6',
  //    title: 'Emails',
  //    url: '/dashboard/emails',
  //    icon: '/icons/mail-white.svg',
  //    trigger: 'url',
  // },

  // {
  //    id: '7',
  //    title: 'Categories',
  //    url: '/dashboard/categories',
  //    icon: '/icons/checklist-white.svg',
  //    trigger: 'url',
  // },

  // {
  //    id: '8',
  //    title: 'Tags',
  //    url: '/dashboard/tags',
  //    icon: '/icons/tag.svg',
  //    trigger: 'url',
  // },
];

export const NAVBAR_BOTTOM_LINKS: INavbarLink[] = [
  {
    id: "1",
    title: "Settings",
    url: "/dashboard/settings",
    icon: "/icons/gear.svg",
    trigger: "url",
  },

  {
    id: "2",
    title: "Logout",
    icon: "/icons/sign-out.svg",
    trigger: "action",
    action: "logout",
  },
];
