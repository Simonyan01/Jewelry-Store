/* eslint-disable no-unused-vars */
import { useState } from "react";
import Slider from "react-slider";
import filter from "../Icons/фильтр.png";
import icon from "../Icons/Vector (1).png";
import arrow from "../Icons/Vector (2).png";
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
  const [hide, setHide] = useState(false)


  const handleFilter = () => setHide(hide => !hide)
  
  console.log(hide);
  const handleChange = (val) => setValue(val);
  const secondHandleChange = (val) => setSecondVal(val);

  return (
    <section className="filter-section">
      <div className="filter-container">
        <h4>Цена</h4>
        <Slider
          className='slider'
          defaultValue={[values.min, values.max]}
          minDistance={1000}
          color="secondary"
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
        <button className='saveButton'>Сохранить</button>
      </div>
      <button onClick={handleFilter} className="filter-button">
        <img className="filter-icon" src={icon} alt="filter-icon" />
        <img className="filter-text" src={filter} alt="filter-text" />
        <img className="filter-arrow" src={arrow} alt="arrow" />
      </button>
    </section>
  )
}

