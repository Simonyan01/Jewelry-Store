import { useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from "react-slider";
import Slide from '@mui/material/Slide';
import { icons } from "../icons";
import "./filter.css";

export const Filter = () => {
  const [value, setValue] = useState([3000, 7000]);
  const [productionValue, setProductionValue] = useState([3000, 7000]);
  const [hide, setHide] = useState(false)

  const handleFilter = () => setHide(hide => !hide)
  const handleChange = (val) => setValue(val);
  const prodHandleChange = (val) => setProductionValue(val);

  return (
    <section className="filter-section">
      <Slide direction="right" in={hide} mountOnEnter unmountOnExit>
        <div className="filter-container">
          <h4>Цена</h4>
          <Slider
            className='slider'
            defaultValue={[3000, 7000]}
            minDistance={1000}
            min={0}
            max={10000}
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
            defaultValue={[3000, 7000]}
            minDistance={1000}
            min={0}
            max={10000}
            step={50}
            value={productionValue}
            pearling={true}
            onChange={prodHandleChange}
          />
          <div className='view'>
            <div className='field'>
              <label htmlFor="minPrice">От</label>
              <input
                type="number"
                className="minPrice"
                value={productionValue[0]}
                onChange={(e) => prodHandleChange(+e.target.value)}
              />
            </div>
            <div className='field'>
              <label htmlFor="maxPrice">До</label>
              <input
                type="number"
                className="maxPrice"
                value={productionValue[1]}
                onChange={(e) => prodHandleChange(+e.target.value)}
              />
            </div>
          </div>
          <button className='saveButton'>Сохранить</button>
        </div>
      </Slide>
      <FormControlLabel
        control={
          <button onClick={handleFilter} className="filter-button">
            <img className="filter-icon" src={icons.icon} alt="filter-icon" />
            <img className="filter-text" src={icons.text} alt="filter-text" />
            <img className="filter-arrow" src={hide ? icons.arrowRight : icons.arrowLeft} alt="arrow" />
          </button>
        }
      />
    </section>
  )
}

