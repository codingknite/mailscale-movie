import DesktopNav from './Desktop';
import MobileNav from './Mobile';

const Nav = () => {
  return (
    <nav>
      <MobileNav />
      <DesktopNav />
    </nav>
  );
};

export default Nav;
