import { Game, Layer, Like, Magicpen, MedalStar, Profile2User, Ranking, Shop, Ticket } from 'iconsax-react';
import { ReactNode } from 'react';

type MenuItems = {
  title: string;
  href: string;
  icon: ( active?: boolean ) => ReactNode;
  permissions: string;
};

const SidebarMenus: MenuItems[] = [
  {
    title: 'Room Play', href: '/room', icon: ( active ) => <Game variant={ active ? 'Bold' : 'Outline' } />, permissions: 'room'
  },
  {
    title: 'Tournament', href: '/tournament', icon: ( active ) => <Magicpen variant={ active ? 'Bold' : 'Outline' } />, permissions: 'tournament'
  },
  {
    title: 'Game Catalog', href: '/game', icon: ( active ) => <Layer variant={ active ? 'Bold' : 'Outline' } />, permissions: 'game'
  },
  {
    title: 'Tier', href: '/tier', icon: ( active ) => <Ranking variant={ active ? 'Bold' : 'Outline' } />, permissions: 'tier'
  },
  {
    title: 'Rewards', href: '/rewards', icon: ( active ) => <Ticket variant={ active ? 'Bold' : 'Outline' } />, permissions: 'reward'
  },
  {
    title: 'Badges', href: '/badges', icon: ( active ) => <MedalStar variant={ active ? 'Bold' : 'Outline' } />, permissions: 'badges'
  },
  {
    title: 'Cafe Management', href: '/cafe', icon: ( active ) => <Shop variant={ active ? 'Bold' : 'Outline' } />, permissions: 'cafe'
  },
  {
    title: 'Banner', href: '/banner', icon: ( active ) => <Like variant={ active ? 'Bold' : 'Outline' } />, permissions: 'banner'
  },
  {
    title: 'User Control', href: '#', icon: ( active ) => <Profile2User variant={ active ? 'Bold' : 'Outline' } />, permissions: 'menu-group'
  },
  {
    title: 'Member', href: '/member', icon: () => <span />, permissions: 'member'
  },
  {
    title: 'Admin', href: '/admin', icon: () => <span />, permissions: 'admin'
  },
];

export default SidebarMenus;