import React from 'react';

interface FilterControlsProps {
  genres: string[];
  authors: string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  selectedAuthor: string;
  onAuthorChange: (author: string) => void;
  onResetFilters: () => void;
}

const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
    </svg>
);


export const FilterControls: React.FC<FilterControlsProps> = ({
  genres,
  authors,
  selectedGenre,
  onGenreChange,
  selectedAuthor,
  onAuthorChange,
  onResetFilters,
}) => {
  const hasActiveFilters = selectedGenre || selectedAuthor;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
        <div className="flex items-center mb-4">
            <FilterIcon />
            <h3 className="text-lg font-semibold text-gray-700">Filter Books</h3>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
        <div>
          <label htmlFor="genre-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Genre
          </label>
          <select
            id="genre-filter"
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="author-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <select
            id="author-filter"
            value={selectedAuthor}
            onChange={(e) => onAuthorChange(e.target.value)}
            className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
          >
            <option value="">All Authors</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:justify-self-end">
          <button
            onClick={onResetFilters}
            disabled={!hasActiveFilters}
            className="w-full px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};
