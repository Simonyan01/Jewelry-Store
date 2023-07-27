import { useState } from "react";
import Slider from "react-slider";
import "./filter.css";

export const Filter = () => {
  const values = {
    min: 0,
    max: 10000,
    min2: 0,
    max2: 10000,

  }
  const [value, setValue] = useState([values.min, values.max]);
  const [secondVal, setSecondVal] = useState([values.min2, values.max2]);
  const handleChange = (val) => setValue(val);
  const secondHandleChange = (val) => setSecondVal(val);

  return (
    <div className="filter-container">
      <h4>Цена</h4>
      <Slider
        className='slider'
        defaultValue={[values.min, values.max]}
        minDistance={1000}
        min={values.min}
        max={values.max}
        step={50}
        value={value}
        pearling={true}
        onChange={handleChange}
      />
      <div className='view'>
        <div className='field'>
          <label htmlFor="minPrice">От</label>
          <input
            type="number"
            className="minPrice"
            value={value[0]}
            onChange={(e) => handleChange([+e.target.value])}
          />
        </div>
        <div className='field'>
          <label htmlFor="maxPrice">До</label>
          <input
            type="number"
            className="maxPrice"
            value={value[1]}
            onChange={(e) => handleChange([+e.target.value])}
          />
        </div>
      </div>
      <h4>Цена производства</h4>
      <Slider
        className='slider'
        defaultValue={[values.min2, values.max2]}
        minDistance={1000}
        min={values.min2}
        max={values.max2}
        step={50}
        value={secondVal}
        pearling={true}
        onChange={secondHandleChange}
      />
      <div className='view'>
        <div className='field'>
          <label htmlFor="minPrice">От</label>
          <input
            type="number"
            className="minPrice"
            value={secondVal[0]}
            onChange={(e) => secondHandleChange(+e.target.value)}
          />
        </div>
        <div className='field'>
          <label htmlFor="maxPrice">До</label>
          <input
            type="number"
            className="maxPrice"
            value={secondVal[1]}
            onChange={(e) => secondHandleChange(+e.target.value)}
          />
        </div>
      </div>
      <button className='saveButton' >Сохранить</button>
    </div>
  )
}

