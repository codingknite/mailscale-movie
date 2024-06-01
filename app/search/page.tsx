import SearchPage from '@/components/pages/Search/Search';
import { MoviesApiResponse } from '@/types/movie';

const Search = async () => {
  const apiKey = process.env.TMDB_API_KEY;

  const fetchRecommendations = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=878`
  );

  if (fetchRecommendations.ok) {
    const recommendations: MoviesApiResponse =
      await fetchRecommendations.json();

    return <SearchPage data={recommendations.results} />;
  }
};

export default Search;
