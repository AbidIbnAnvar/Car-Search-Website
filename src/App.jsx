import { useState } from 'react';
import { fetchCars, createCarImage } from "./utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [cars, setCars] = useState([]);
  const [displayInfo, setDisplayInfo] = useState(false);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [year, setYear] = useState(2023);
  const [transmission, setTransmission] = useState("");
  const [drive, setDrive] = useState("");
  const [angle, setAngle] = useState(25);

  async function getCarsInfo() { 
    try {
      const params = { limit: 5 };
      if (make) params.make = make;
      if (model) params.model = model;
      if (year) params.year = year;
      if (fuelType) params.fuel_type = fuelType;
      if (drive) params.drive = drive;
      if (transmission) params.transmission = transmission;
      setAngle(25);
      const cars = await fetchCars(params);
      setCars(cars);
      setDisplayInfo(true);
      if(cars.length!==0){document.getElementById('result').scrollIntoView({behavior:'smooth'});}
    } catch (error) {
      console.log('Error Occurred:', error);
    }
  }

  const handleAngleChange = (delta) => {
    setAngle((prevAngle) => prevAngle + delta);
  }

  const getImageSrc = (car) => {
    return createCarImage(car, angle);
  }

  return (
    <div className="App bg-[#1D1D25] min-h-screen h-max text-white poppins-regular text-lg md:text-2xl py-1 md:py-8">
      <h1 className='text-5xl poppins-extrabold text-[#FFDE59] my-8'>Car Search</h1>
      <div className='flex md:flex-row flex-col md:mx-auto mx-5 my-2 w-auto  max-w-[50rem]'>
        <label htmlFor="make" className='place-content-center md:text-end text-center px-8 basis-7/12'>Manufacturer</label>
        <input type='text' className='px-4 py-2 text-white bg-[#282834] col-span-2 rounded-md md:w-full' onChange={(event) => {
        setMake(event.target.value);}} placeholder='Enter car manufacturer' />
      </div>
      <div className='flex md:flex-row flex-col md:mx-auto mx-5 my-2 w-auto  max-w-[50rem]'>
        <label htmlFor="model" className='place-content-center md:text-end text-center px-8 basis-7/12'>Model</label>
        <input type='text' className='px-4 py-2 text-white bg-[#282834] rounded-md col-span-2 md:w-full' onChange={(event) => {
        setModel(event.target.value);}} placeholder='Enter car model' />
      </div>
      <div className='flex md:flex-row flex-col md:mx-auto mx-5 my-2 w-auto  max-w-[50rem]'>
        <label htmlFor="fuel_type" className='place-content-center md:text-end text-center px-8 basis-7/12'>Year</label>
        <select name="year" id="year" className='px-4 py-2  bg-[#282834] rounded-md col-span-2 md:w-full' onChange={(e)=>setYear(e.target.value)}>
          <option value="none" selected disabled hidden>Select Year</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
        </select>
      </div>
      <div className='flex md:flex-row flex-col md:mx-auto mx-5 my-2 w-auto  max-w-[50rem]'>
        <label htmlFor="fuel_type" className='place-content-center md:text-end text-center px-8 basis-7/12'>Fuel Type</label>
        <select name="fuel_type" id="fuel_type" className=' px-4 py-2  bg-[#282834] rounded-md col-span-2 md:w-full' onChange={(e)=>setFuelType(e.target.value)}>
          <option value="none" selected disabled hidden>Select Fuel Type</option>
          <option value="gas">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="electricity">Electricity</option>
        </select>
      </div>
      <div className='flex md:flex-row flex-col md:mx-auto mx-5 my-2 w-auto  max-w-[50rem]'>
        <label htmlFor="transmission" className='place-content-center md:text-end text-center px-8 basis-7/12'>Transmission Type</label>
        <select name="transmission" id="transmission" className=' px-4 py-2  bg-[#282834] rounded-md col-span-2 md:w-full' onChange={(e)=>setTransmission(e.target.value)}>
          <option value="none" selected disabled hidden>Select Transmission Type</option>
          <option value="m">Manual</option>
          <option value="a">Automatic</option>
        </select>
      </div>
      <div className='flex md:flex-row flex-col md:mx-auto mx-5 my-2 w-auto  max-w-[50rem]'>
        <label htmlFor="drive" className='place-content-center md:text-end text-center px-8 basis-7/12'>Drive Type</label>
        <select name="drive" id="drive" className=' px-4 py-2  bg-[#282834] rounded-md col-span-2 md:w-full' onChange={(e)=>setDrive(e.target.value)}>
          <option value="none" selected disabled hidden>Select Drive Type</option>
          <option value="fwd">Front-Wheel Drive (FWD)</option>
          <option value="rwd">Rear-Wheel Drive (RWD)</option>
          <option value="awd">All-Wheel Drive (AWD)</option>
          <option value="4wd">Four-Wheel Drive (4WD)</option>
        </select>
      </div>
      <button onClick={getCarsInfo} className='bg-[#FFDE59] rounded-lg py-4 px-8 my-8 font-semibold text-black'>Fetch Car Info</button>
      {displayInfo && cars.length===0 && <h1 className='font-semibold text-3xl'>No record found</h1>}
      <div id='result' className='py-4'>
        {displayInfo && cars.length!==0 && (
          <div className='text-lg md:text-xl'>
            {cars.map((info, index) => (
              <div key={index} className='flex flex-col md:flex-row bg-[#282834] my-8 mx-4 md:mx-16 rounded-3xl gap-8'>
                <div className=' mx-4 rounded-lg py-4 px-8 basis-6/12 flex flex-row'>
                  <button onClick={() => handleAngleChange(-4)}>
                    <FontAwesomeIcon icon={faCaretLeft} size='2x' className='basis-1/6' style={{ color: "#ffffff" }} />
                  </button>
                  <div className='carImageComponent place-content-center'>
                    <img className='carImg' src={getImageSrc(info,angle)} alt="Car" />
                  </div>
                  <button onClick={() => handleAngleChange(4)}>
                    <FontAwesomeIcon icon={faCaretRight} size='2x' className='basis-1/6' style={{ color: "#ffffff" }} />
                  </button>
                </div>
                <div className='flex flex-col place-content-center md:text-start pb-8 md:py-8 justify-center'>
                  <p className='capitalize font-bold text-4xl'>{info.make} <span className='capitalize'>{info.model}</span></p>
                  <p>Year: {info.year}</p>
                  <p>Transmission: {info.transmission === 'm' ? 'Manual' : 'Automatic'}</p>
                  <p>Class: <span className='capitalize'>{info.class}</span></p>
                  <p>City MPG: {info.city_mpg}MPG</p>
                  <p>Drive: <span className='uppercase'>{info.drive}</span></p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
