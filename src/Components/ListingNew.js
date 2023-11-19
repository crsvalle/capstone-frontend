import axios from 'axios';
import { storage } from './firebase';
import { ref, uploadBytes } from 'firebase/storage';
import React, { useState, useRef } from 'react';
import { useNavigate, Link } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;


export default function ListingNew() {
  let navigate = useNavigate();
  const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
  const userId = localStorage.getItem('id') || '';
  console.log(userId)

  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [upImages, setUpImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [listing, setListing] = useState({
    street: "",
    apt: "",
    city: "",
    state: "AL",
    zip: "",
    size: "",
    price: 0,
    type: "Closet",
    host: userId,
    isRented: false,
    avg_rating: 0,
    description: ""
  });

  const addNewListing = (newListing) => {
    axios
      .post(`${API}/listings`, newListing)
      .then(
        (res) => {
          console.log(res)
          for (let img of upImages) {
            const imageRef = ref(storage, `images/${res.data.listing_id}/${img.name}`);
            uploadBytes(imageRef, img);
          }
          alert("Listing Added!");
          navigate(`/listings/${res.data.listing_id}`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewListing(listing);
  }

  const handleTextChange = (event) => {
    setListing({ ...listing, [event.target.id]: event.target.value });
  };

  const handleNumberChange = (event) => {
    setListing({ ...listing, [event.target.id]: Number(event.target.value) });
  };

  const handleDateChange = (event) => {
    let newDate = event.target.value.replace(/(....).(..).(..)/, "$2/$3/$1");
    // let date = new Date(event.target.value);
    // let newDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    setListing({ ...listing, [event.target.id]: newDate });
  };

  const selectFiles = () => {
    fileInputRef.current.click();
  }

  const processImages = (files) => {
    console.log(files)
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') {
        setErrorMsg("File must be an image!");
        continue;
      }
      if (files[i].size > 5242880) {
        setErrorMsg("One or more images exceed the size limit of 5MB!");
        continue;
      }
      if (images.some(img => img.name === files[i].name)) {
        setErrorMsg("Image file already added!");
        continue;
      }
      if (images.length >= 5) {
        setErrorMsg("You can only add 5 images!");
        continue;
      }

      setImages(prevImages => [
        ...prevImages, {
          name: files[i].name,
          url: URL.createObjectURL(files[i])
        }
      ]);
      setUpImages(prevs => [ ...prevs, files[i] ]);
      setErrorMsg("");
    }
  }

  const onFileSelect = (event) => {
    const files = event.target.files;
    if (!files.length) return;
    processImages(files);
  }

  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    processImages(files);
  }

  const onDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  }

  const onDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  }

  const deleteImage = (index) => {
    setImages((prevs) => prevs.filter((img, i) => i !== index));
  }

  return (
    <div>
      <form className="new-listing-form" onSubmit={handleSubmit}>
        <div className="address-detail">
          <div className="address form-section">
            <h3 className='section-text'>--Address--</h3>
            <label>Street Address:</label>
            <input
              className="input"
              id="street"
              type="text"
              value={listing.street}
              onChange={handleTextChange}
              required
            />
            <label>Floor/Unit/Apt (Optional):</label>
            <input
              className="input"
              id="apt"
              type="text"
              value={listing.apt}
              onChange={handleTextChange}
            />
            <label>City:</label>
            <input
              className="input"
              id="city"
              type="text"
              value={listing.city}
              onChange={handleTextChange}
              required
            />
            <label>Select State:</label>
            <select className="input" name="states" id="state" value={listing.state} onChange={handleTextChange}>
              {states.map(st => <option key={st} value={st}> {st} </option>)}
            </select>
            <label>Zip Code:</label>
            <input
              className="input"
              id="zip"
              type="text"
              value={listing.zip}
              onChange={handleTextChange}
              required
            />
          </div>
          
          <div className="space-detail form-section">
            <h3 className='section-text'>--Space Details--</h3>
            <label>Type:</label>
            <select className="input" name="type" id="type" value={listing.type} onChange={handleTextChange}>
              <option value="Closet">Closet</option>
              <option value="Spare Room">Spare Room</option>
              <option value="Basement">Basement</option>
              <option value="Backyard Shade">Backyard Shade</option>
              <option value="Garage">Garage</option>
              <option value="Parking Spot">Parking Spot</option>
              <option value="Other">Other</option>
            </select>
            <label>Size:</label>
            <input
              className="input"
              id="size"
              type="text"
              value={listing.size}
              onChange={handleTextChange}
              required
            />
            <label>Available Until:</label>
            <input
              className="input"
              id="date"
              type="date"
              required
            />
            <label>Monthly Rent in USD($):</label>
            <input
              className="input"
              id="price"
              type="number"
              min="0"
              value={listing.price}
              onChange={handleNumberChange}
              required
            />
            <label>Short Description:</label>
            <textarea
              className="input"
              id="description"
              type="text"
              maxLength="1000"
              placeholder="Maximum 1000 characters"
              value={listing.description}
              onChange={handleTextChange}
              required
            />
          </div>
        </div>
        <div className="last-section">
          <div className="card">
            <div className="top">
              <p className='section-text'>Add Images</p>
              <label>(Add up to 5 images & max size 5MB per image)</label>
            </div>
            <div className="drag-area" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
              {isDragging ? (
                <span>Drop images here</span>
              ) : (
                <section className='drop-text'>
                  <span>Drag & Drop in this box</span>
                  <span>or</span>
                  <span className="select-image" role='button' onClick={selectFiles}>Browse from files</span>
                </section>
              )}
              <input
                type="file"
                name="images"
                className="files"
                onChange={onFileSelect}
                ref={fileInputRef}
                multiple
              />
            </div>
            <div className="container">
              {errorMsg && <p>{errorMsg}</p>}
              <div className='images'>
              {images.map((img, index) =>
                <div className="image" key={index}>
                  <span className="delete" onClick={() => deleteImage(index)}>&times;</span>
                  <img src={img.url} alt={img.name}/>
                </div>
              )}
              </div>
            </div>
          </div>
          <input type="submit" value="SUBMIT"/>
          <Link to={`/listings`}>
            <button id='backButton'>BACK</button>
          </Link>
        </div>
      </form>
    </div>
  )
}
