import { fetchGenreMovies, fetchMovieDetails, fetchTrending } from "@/actions/movieData";
import { fetchMyList } from "@/actions/user";
import MovieCard from "@/components/MovieCard";
import Navbar from "@/components/Navbar";
import { Genre, Movie } from "@/lib/types";
import CategoryList from "@components/CategoryList";

const MyList = async () => {
  const genres = await fetchGenreMovies()

  return (
    <>
      <Navbar />
      <div className="list">
        {genres.map((genre: Genre ) => (
          <CategoryList key={12} title={genre.name} movies={genre.movies} />
        ))}
        
      </div>
    </>
  );
};

export default MyList;