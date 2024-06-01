import HomePage from '@/components/pages/Home/Home';
import { MovieProps } from '@/types/movie';
import { baseApiURL } from '@/utils/helpers';

interface ApiResponse {
  page: number;
  results: MovieProps[];
  total_pages: number;
  total_results: number;
}

const Home = async () => {
  const apiKey = process.env.TMDB_API_KEY;

  const fetchAll = {
    popular: await fetch(
      `${baseApiURL}/popular?api_key=${apiKey}&language=en-US&page=1`
    ),
    upcoming: await fetch(
      `${baseApiURL}/upcoming?api_key=${apiKey}&language=en-US&page=1`
    ),
    nowPlaying: await fetch(
      `${baseApiURL}/now_playing?api_key=${apiKey}&language=en-US&page=1`
    ),
  };

  const [popular, upcoming, nowPlaying] = await Promise.all([
    fetchAll.popular,
    fetchAll.upcoming,
    fetchAll.nowPlaying,
  ]);

  if (popular.ok && upcoming.ok && nowPlaying.ok) {
    const popularMovies: ApiResponse = await popular.json();
    const upcomingMovies: ApiResponse = await upcoming.json();
    const nowPlayingMovies: ApiResponse = await nowPlaying.json();

    return (
      <HomePage
        featuredMovieIndex={Math.floor(Math.random() * 20)}
        popular={popularMovies.results}
        upcoming={upcomingMovies.results}
        nowPlaying={nowPlayingMovies.results}
      />
    );
  } else {
    // todo: handle error
  }
};

export default Home;
