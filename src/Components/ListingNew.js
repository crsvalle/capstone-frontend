import React, {useState, useRef} from 'react';

export default function ListingNew() {
  const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] =  useState(false);
  const fileInputRef = useRef(null);

  const selectFiles = () => {
    fileInputRef.current.click();
  }

  const onFileSelect = (event) => {
    const files = event.target.files;
    if (!files.length) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some(e => e.name === files[i].name)) {
        setImages(prevImages => [
          ...prevImages, {
            name: files[i].name,
            url: URL.createObjectURL(files[i])
          }
        ]);
      }
    }
    console.log(images)
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

  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some(e => e.name === files[i].name)) {
        setImages(prevImages => [
          ...prevImages, {
            name: files[i].name,
            url: URL.createObjectURL(files[i])
          }
        ]);
      }
    }
    console.log(images)
  }

  const deleteImage = (index) => {
    setImages((prevImgs) => prevImgs.filter((img, i) => i !== index));
  }

  return (
    <div>
      <form className="new-listing-form">
        <div className="address-detail">
          <div className="address form-section">
            <h3>--Address--</h3>
            <label>Street Address:</label>
            <input
              className="input"
              id="street"
              type="text"
              required
            />
            <label>Floor/Unit/Apt (Optional):</label>
            <input
              className="input"
              id="apt"
              type="text"
            />
            <label>City:</label>
            <input
              className="input"
              id="city"
              type="text"
              required
            />
            <label>Select State:</label>
            <select className="input" name="states" id="states">
              {states.map(st => <option key={st} value={st}> {st} </option>)}
            </select>
            <label>Zip Code:</label>
            <input
              className="input"
              id="zip"
              type="text"
              required
            />
          </div>
          
          <div className="space-detail form-section">
            <h3>--Space Details--</h3>
            <label>Type:</label>
            <input
              className="input"
              id="type"
              type="text"
              required
            />
            <label>Size:</label>
            <input
              className="input"
              id="size"
              type="text"
              required
            />
            <label>Available Until:</label>
            <input
              className="input"
              id="date"
              type="date"
              required
            />
            <label>Monthly Rent:</label>
            <input
              className="input"
              id="price"
              type="number"
              min="0"
              required
            />
            <label>Short Description:</label>
            <textarea
              className="input"
              id="description"
              type="text"
              maxLength="1000"
              placeholder="Maximum 1000 characters"
              required
            />
          </div>
        </div>
        <div className="last-section">
          <div className="card">
            <div className="top">
              <p>Add Images</p>
            </div>
            <div className="drag-area" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
              {isDragging ? (
                <span className="select">Drop images here</span>
              ) : (
                <>
                  Drag & Drop images here or {" "}
                  <span className="select" role='button' onClick={selectFiles}>Browse from Files</span>
                </>
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
              {images.map((img, index) => {
                <div className="images" key={index}>
                  <span className="delete" onClick={() => deleteImage(index)}>&times;</span>
                  <img src={img.url} alt={img.name}/>
                </div>
              })}
            </div>
          </div>
          <input type="submit" value="SUBMIT"/>
        </div>
      </form>
    </div>
  )
}
