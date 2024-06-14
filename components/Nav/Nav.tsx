'use client';

import MobileNav from './Mobile';
import DesktopNav from './Desktop';
import { useSession } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <nav>
        <MobileNav />
        <DesktopNav session={true} />
      </nav>
    );
  } else {
    return (
      <nav>
        <MobileNav />
        <DesktopNav session={false} />
      </nav>
    );
  }
};

export default Nav;
