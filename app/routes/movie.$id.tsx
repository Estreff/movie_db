import type { LoaderArgs } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';

export async function loader({ params }: LoaderArgs) {
  const url = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
    {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzVjZTAzODJjNjQ4YzNkMThhMGRmNGNkODRmMjNjNyIsInN1YiI6IjY0ZTc5NzAwZTg5NGE2MDBhZTczYjM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UiJWD33L4eRo_HUaWPjKcO2Nat83sIVH9YLnCfLR96I',
      },
    }
  );

  return url;
}

export default function MovieId() {
  const movie = useLoaderData();
  console.log(movie);

  return (
    <div className="min-h-screen p-10">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
        className="h-[40vh] w-full object-cover rounded-lg"
      />
      <h1 className="text-4xl font-bold text-center pt-5 text-teal-900">
        {movie.title}
      </h1>
      <div className="flex gap-x-10 mt-10">
        <div className="w-1/2 font-medium border-teal-500 rounded-lg p-3 border-2">
          <h2 className="text-center font-bold text-xl text-teal-800 border-b-2 border-teal-600 pb-1 mb-3">
            Movie Information
          </h2>
          <h2 className="pb-1">
            <span className="text-teal-600 text-lg pr-2">Home Page:</span>{' '}
            <Link
              to={movie.homepage}
              target="_blank"
              className="italic text-gray-600"
            >
              {movie.homepage}
            </Link>
          </h2>
          <h2 className="italic text-gray-600 pb-1">
            <span className="text-teal-600 text-lg pr-2">IMDB page:</span>{' '}
            <Link
              to={`https://imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              className="italic text-gray-600"
            >
              {`https://imdb.com/title/${movie.imdb_id}`}
            </Link>
          </h2>
          <h2 className="pb-1">
            <span className="text-teal-600 text-lg pr-2">
              Original Language:
            </span>{' '}
            {movie.original_language}
          </h2>
          <p className="italic text-gray-600 pb-1">
            <span className="text-teal-600 text-lg pr-2">Overview:</span>{' '}
            {movie.overview}
          </p>
          <p className="italic text-gray-600 pb-1">
            <span className="text-teal-600 text-lg pr-2">Release Date:</span>{' '}
            {movie.release_date}
          </p>
          <p className="italic text-gray-600 pb-1">
            <span className="text-teal-600 text-lg pr-2">Runtime:</span>{' '}
            {`${movie.runtime} minutes`}
          </p>
          <p className="italic text-gray-600 pb-1">
            <span className="text-teal-600 text-lg pr-2">Budget:</span>{' '}
            {`$${movie.budget.toLocaleString()}`}
          </p>
          <p className="italic text-gray-600 pb-1">
            <span className="text-teal-600 text-lg pr-2">Revenue:</span>{' '}
            {`$${movie.revenue.toLocaleString()}`}
          </p>
          
        </div>
        <div className="w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
