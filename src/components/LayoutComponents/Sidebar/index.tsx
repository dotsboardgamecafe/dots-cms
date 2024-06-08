
import Menus from '@/components/LayoutComponents/Sidebar/Menus';
import Brand from '@/components/ui/Brand';


const Sidebar = () => {
  return (
    <aside className='p-6  bg-gray-50 rounded-3xl gap-3 min-h-full'>
      <Brand />
      <Menus />
    </aside>
  );
};

export default Sidebar;