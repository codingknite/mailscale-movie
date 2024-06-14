import FavoritesPage from '@/components/pages/Favorites/Favorites';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const Favorites = async () => {
  const session = await auth();

  if (session) {
    return <FavoritesPage />;
  } else {
    redirect('/');
  }
};

export default Favorites;
