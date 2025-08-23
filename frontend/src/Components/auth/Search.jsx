import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Search = () => {
  const [query, setQuery] = useState("");
  const [filteredComponents, setFilteredComponents] = useState([]);
  const navigate = useNavigate();

  // Get all the text content from the page
  const getTextFromPage = () => {
    const elements = document.querySelectorAll("div, p, span, h1, h2, h3, li");
    const content = Array.from(elements).map((el) => el.textContent.trim());
    return content;
  };

  const querySearch = (query) => {
    if(!query){
      toast.error("Please enter some search query!");
      return;
    }
    
    const content = getTextFromPage();
    // Filter content based on search query
    const results = content.filter((text) =>
    {
      if (text && typeof text === "string") {
        return text.toLowerCase().includes(query.toLowerCase());
      }
      return {}; // Skip non-string values (null, undefined, etc.)
    }
    );
    setFilteredComponents(results);
    console.log(results);
    // Navigate to search results page and pass results as state
    navigate('/search-results', { state: { results } });
  };

  return (
    <div className="search w-full flex justify-center items-center">
      <div className="border-2 w-1/2 rounded-lg flex justify-around border-gray-300">
        <input
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-3/4 rounded-lg bg-transparent h-14 p-2 outline-none"
          type="text"
          placeholder="Search..."
        />
        <button
          onClick={() => querySearch(query)}
          className="p-1 hover:rotate-[25deg] hover:scale-[1.15] duration-300"
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default Search;
