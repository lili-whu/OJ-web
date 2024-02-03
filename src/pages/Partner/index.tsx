import SideMenu from '@/components/SideMenu';
import { Outlet } from '@umijs/max';

const Partner: React.FC = () => {
  return (
    <div>
      <SideMenu>
        <Outlet />
      </SideMenu>
    </div>
  );
};

export default Partner;
