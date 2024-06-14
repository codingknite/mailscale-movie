import HomePage from '@/components/pages/Home/Home';
import { HandleError } from '@/lib/exception';
import { MovieProps } from '@/types/movie';

interface ApiResponse {
  message: string;
  data: {
    popular: MovieProps[];
    upcoming: MovieProps[];
    nowPlaying: MovieProps[];
  };
}

const Home = async () => {
  const fetchMovies = await fetch(process.env.URL + '/api/get-movies-home');
  const response: ApiResponse = await fetchMovies.json();

  if (response.message === 'success') {
    return (
      <HomePage
        popular={response.data.popular}
        upcoming={response.data.upcoming}
        nowPlaying={response.data.nowPlaying}
        featuredMovieIndex={Math.floor(Math.random() * 20)}
      />
    );
  } else {
    throw new HandleError();
  }
};

export default Home;
