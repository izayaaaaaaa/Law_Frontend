import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import SearchResults from './SearchResults';
import CategoryCheckbox from './CategoryCheckbox';

const categories = [
  { label: 'All Categories (Default)', value: 'All' },
  { label: 'Constitutions', value: 'Constitutions' },
  { label: 'Statutes', value: 'Statutes' },
  { label: 'Executive Issuances', value: 'Executive Issuances' },
  { label: 'Judicial Issuances', value: 'Judicial Issuances' },
  { label: 'Other Judicial Issuances', value: 'Other Judicial Issuances' },
  { label: 'Other Issuances', value: 'Other Issuances' },
  { label: 'Jurisprudence', value: 'Jurisprudence' },
  { label: 'International Legal Resources', value: 'International Legal Resources' },
  { label: 'AUSL Exclusive', value: 'AUSL Exclusive' },
];

const SearchResultsPage = ({ hostUrl }) => {
  const location = useLocation();
  // const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(['All']);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('searchQuery');

    console.log('SearchResultsPage Search query:', searchQuery);
    console.log('SearchResultsPage Selected categories:', selectedCategories);

    // Fetch search results based on the query, searchType, and selectedCategories
    Axios.get(`${hostUrl}/LawPhil2.0_Server/lawCRUD/searchKeywordLaw.php`, {
      params: {
        searchQuery: searchQuery,
        selectedCategories: selectedCategories, // Pass an array of selected categories
      },
    })
      .then((response) => {
        // Handle the successful response
        setSearchResults(response.data);
        console.log('SearchResultsPage Search results:', response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching search results:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
      });
  }, [hostUrl, location.search, selectedCategories]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const isChecked = e.target.checked;
  
    setSelectedCategories((prevCategories) => {
      if (category === 'All') {
        // If 'All Categories' is checked, set selectedCategories to ['All']
        return isChecked ? ['All'] : [];
      } else {
        let newCategories;
        
        if (isChecked) {
          // If a category is checked, add it to selectedCategories
          if (!prevCategories.includes(category)) {
            newCategories = [...prevCategories, category];
          } else {
            newCategories = prevCategories;
          }
        } else {
          // If a category is unchecked, remove it from selectedCategories
          newCategories = prevCategories.filter(
            (prevCategory) => prevCategory !== category
          );
        }
  
        // Uncheck 'All Categories' if any other category is checked
        if (newCategories.includes('All')) {
          newCategories = newCategories.filter((c) => c !== 'All');
        }
  
        return newCategories;
      }
    });
  };  

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <h6>Filter by:</h6>

            {/* Checkbox items for categories */}
            {categories.map((category) => (
              <CategoryCheckbox
                key={category.value}
                label={category.label}
                value={category.value}
                checked={selectedCategories.includes(category.value)}
                onChange={handleCategoryChange}
              /> 
            ))}
          </div>

          <div className="col-md-10">
            <SearchResults results={searchResults} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;