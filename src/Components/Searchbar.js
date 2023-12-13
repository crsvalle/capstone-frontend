import { useEffect, useRef, useState } from "react";
import "../style/Searchbar.css";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import { Loader } from "@googlemaps/js-api-loader";
import { useNavigate } from "react-router-dom";

const apiKey = process.env.REACT_APP_GEOLOCATION_API;
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

function Searchbar({ customClass }) {
  //passing custome class for css
  const searchInput = useRef(null);
  const [address, setAddress] = useState({});
  const navigate = useNavigate();
  const [isInputFieldNotEmpty, setIsInputFieldNotEmpty] = useState(false); // State for close "X" icon.

  //console.log('googleMapsLoader:', googleMapsLoader);
  const loader = new Loader({
    apiKey: apiKey,
    version: "weekly",
    libraries: ["places"],
  });

  useEffect(() => {
    loader.load().then(() => initAutocomplete());
  }, []);

  const extractAddress = (place) => {
    const address = {
      city: "",
      state: "",
      zip: "",
      country: "",
      plain() {
        const city = this.city ? this.city + ", " : "";
        const zip = this.zip ? this.zip + ", " : "";
        const state = this.state ? this.state + ", " : "";
        return city + zip + state + this.country;
      },
    };

    if (!Array.isArray(place?.address_components)) {
      return address;
    }

    place.address_components.forEach((component) => {
      const types = component.types;
      const value = component.long_name;

      if (types.includes("locality")) {
        address.city = value;
      }

      if (types.includes("administrative_area_level_2")) {
        address.state = value;
      }

      if (types.includes("postal_code")) {
        address.zip = value;
      }

      if (types.includes("country")) {
        address.country = value;
      }
    });

    return address;
  };

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    const newAddress = extractAddress(place);
    setAddress(newAddress);
    navigate(`/listings/${newAddress.zip}`); // navigating to listing w params as zip
    setIsInputFieldNotEmpty(true);
  };

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current || !window.google || !window.google.maps) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };

  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    searchInput.current.value = "Getting your location...";
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        const _address = extractAddress(place);
        setAddress(_address);
        searchInput.current.value = _address.plain();
      });
  };

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        reverseGeocode(position.coords);
      });
    }
  };

  const handleClearInput = () => {
    searchInput.current.value = "";
    setIsInputFieldNotEmpty(false);
  };

  return (
    <div className={`search__box ${customClass}`}>
      <div>
        <div className="search">
          <span>
            <SearchIcon />
          </span>
          <input
            ref={searchInput}
            type="text"
            placeholder="Search location...."
            onChange={() =>
              setIsInputFieldNotEmpty(!!searchInput.current.value) // Update based on input value
            } 
          />
          {isInputFieldNotEmpty ? (
            <button className="clear-button" onClick={handleClearInput}>
              <CloseIcon />
            </button>
          ) : (
            <button onClick={findMyLocation}>
              <LocationOnIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
