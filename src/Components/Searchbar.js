
// export default function Searchbar() {
//   return (
// <div className="w-11/12 md:w-8/12 xl:w-1/2 h-auto p-5 rounded-3xl bg-white flex flex-col shadow-md">
//   <section className="w-full h-10 flex items-center">
//     <input
//       type="text"
//       className="w-full h-full font-medium md:pl-2 focus:outline-none searchInput"
//       placeholder="Search locations.."
//     />
//     <button className="w-28 h-full bg-blue-800 flex justify-center items-center rounded-2xl text-white font-medium"> Search</button>
//   </section>
// </div>
//   )
// }

// SearchBar.js
import React, { useState, useEffect } from 'react';
import GoogleAPILoader from './GoogleAPILoader';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const SearchBar = () => {
  const googleMaps = React.useContext(GoogleAPILoader);
  const [address, setAddress] = useState('');
  const [results, setResults] = useState([]);

  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress, googleMaps);
      const latLng = await getLatLng(results[0]);
      setAddress(selectedAddress);
      setResults(results);
    } catch (error) {
      console.error('Error selecting address:', error);
    }
  };

  return (
    <div>
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}  googleCallbackName="google-map-loaded">
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: 'Search for a place...' })} />
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} {...getSuggestionItemProps(suggestion)}>
                  {suggestion.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default SearchBar;
