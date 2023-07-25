import { useState } from "react";
import Slider from "react-slider";
import "./filter.css";

export const Filter = () => {
  const min = 0,
    max = 10000;
  const [value, setValue] = useState([min, max]);

  const handleChange = (val) => setValue(val);

  return (
    <div className="filter-container">
      <div className="slider-container">
        <h2>Цена</h2>
        <Slider
          className="slider"
          defaultValue={[min, max]}
          minDistance={1000}
          min={min}
          max={max}
          step={50}
          value={value}
          pearling={true}
          onChange={handleChange}
        />
        <div className="view">
          <div className="field">
            <label htmlFor="minPrice">От</label>
            <input
              type="number"
              className="minPrice"
              value={value[0]}
              onChange={(e) => handleChange([+e.target.value])}
            />
          </div>
          <div className="field">
            <label htmlFor="maxPrice">До</label>
            <input
              type="number"
              className="maxPrice"
              value={value[1]}
              onChange={(e) => handleChange([+e.target.value])}
            />
          </div>
        </div>
      </div>
      <div className="slider-container">
        <h2>Цена производства</h2>
        <Slider
          className="slider"
          defaultValue={[min, max]}
          minDistance={1000}
          min={min}
          max={max}
          step={50}
          value={value}
          pearling={true}
          onChange={handleChange}
        />
        <div className="view">
          <div className="field">
            <label htmlFor="minPrice">От</label>
            <input
              type="number"
              className="minPrice"
              value={value[0]}
              onChange={(e) => handleChange([+e.target.value])}
            />
          </div>
          <div className="field">
            <label htmlFor="maxPrice">До</label>
            <input
              type="number"
              className="maxPrice"
              value={value[1]}
              onChange={(e) => handleChange([+e.target.value])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
