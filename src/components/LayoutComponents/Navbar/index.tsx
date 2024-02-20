import NavbarItem from '@/components/LayoutComponents/Navbar/NavbarItems';
import NextImage from '@/components/ui/Image';


const Navbar = () => {

  return (
    <>
      <nav className='shadow-general-s w-full h-[96px] sticky top-0'>
        <section className='h-full container flex items-center align-middle flex-row'>
          <NextImage src='/images/logo_gerobakku.png' width={ 140 } height={ 48 } alt='gerobakku logo' />
          <section id='nav-items' className='flex gap-8 flex-1 items-end justify-end'>
            <NavbarItem href='#' label='About Us' />
            <NavbarItem href='#' label='Location' />
          </section>
        </section>
      </nav>
    </>
  );
};

export default Navbar;