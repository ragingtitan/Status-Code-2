import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || []; // Safe check if results are not undefined

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center py-16">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Search Results</h1>
      
      {/* Check if there are no results */}
      {results.length === 0 ? (
        <p className="text-lg text-gray-300">No results found.</p>
      ) : (
        <div className="w-full max-w-3xl">
          <ul className="space-y-6">
            {results.map((result, index) => (
              result && result !== "" && (
                <li key={index} className="bg-gray-700 p-4 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
                  <p className="text-lg text-white">{result}</p>
                </li>
              )
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
