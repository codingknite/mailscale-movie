import SearchPage from '@/components/pages/Search/Search';
import { HandleError } from '@/lib/exception';
import { ApiResponse } from '@/types/movie';

const Search = async () => {
  const fetchRecommendations = await fetch(
    process.env.URL + '/api/get-recommendations'
  );

  const response: ApiResponse = await fetchRecommendations.json();

  if (response.message === 'success') {
    const { data } = response;

    return <SearchPage data={data.movies.results} />;
  } else {
    throw new HandleError();
  }
};

export default Search;
