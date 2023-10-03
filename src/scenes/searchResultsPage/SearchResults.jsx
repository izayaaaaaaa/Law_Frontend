import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/general.css';
import '../../styles/search.css';
import '../../styles/searchResults.css';

const SearchResults = ({ results}) => {
  return (
    <div>
      {results.length > 0 ? (
        <>
          {/* Display the number of results */}
          <h6 className="mx-3">{results.length} results found.</h6>

          {/* Loop through the search results */}
          {results.map((item, index) => (
            <div className="law-item" key={index}>
              <div className="px-5 py-4">

                <Link to={`/law-content/${item.id}`} className="link-style">
                  <h5>{item.title.toUpperCase()}</h5> 
                </Link>

                <div>
                  <p className="category small-text "><b>Category (s):</b> {item.category}</p>
                  <p className="law-desc">{item.content}</p>
                  <Link to={`/law-content/${item.id}`} className="link-style">
                    Read More
                  </Link>
                </div>

              </div>
              <hr />
            </div>
          ))}
        </>
      ) : (
        <h6>No Results</h6>
      )}
    </div>
  );
};

export default SearchResults;