import { Game, Layer, Like, Magicpen, MedalStar, Profile2User, Ranking, Shop, Ticket } from 'iconsax-react';
import { ReactNode } from 'react';

type MenuItems = {
  title: string;
  href: string;
  icon: ( active?: boolean ) => ReactNode;
};

const SidebarMenus: MenuItems[] = [
  {
    title: 'Room Play', href: '/room', icon: ( active ) => <Game variant={ active ? 'Bold' : 'Outline' } />
  },
  {
    title: 'Tournament', href: '/tournament', icon: ( active ) => <Magicpen variant={ active ? 'Bold' : 'Outline' } />
  },
  {
    title: 'Game Catalog', href: '/game', icon: ( active ) => <Layer variant={ active ? 'Bold' : 'Outline' } />
  },
  {
    title: 'Tier', href: '/tier', icon: ( active ) => <Ranking variant={ active ? 'Bold' : 'Outline' } />
  },
  {
    title: 'Rewards', href: '/rewards', icon: ( active ) => <Ticket variant={ active ? 'Bold' : 'Outline' } />
  },
  {
    title: 'Badges', href: '/badges', icon: ( active ) => <MedalStar variant={ active ? 'Bold' : 'Outline' } />
  },
  {
    title: 'Cafe Management', href: '/cafe', icon: ( active ) => <Shop variant={ active ? 'Bold' : 'Outline' } />
  },
  {
    title: 'Banner', href: '/banner', icon: ( active ) => <Like variant={ active ? 'Bold' : 'Outline' } />
  },
  {
    title: 'User Control', href: '#', icon: ( active ) => <Profile2User variant={ active ? 'Bold' : 'Outline' } />
  },
  {
    title: 'Member', href: '/member', icon: () => <span />
  },
  {
    title: 'Admin', href: '/admin', icon: () => <span />
  },
];

export default SidebarMenus;