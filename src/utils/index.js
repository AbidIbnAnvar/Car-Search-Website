import axios from "axios";

export async function fetchCars(params) {
  try {
    const response = await axios.request({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/cars',
      params: params,
      headers: {
        'X-Api-Key': process.env.REACT_APP_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const createCarImage = (car, angle = "") => {
  const url = new URL("https://cdn.imagin.studio/getimage");

  const { make, year, model } = car;

  url.searchParams.append("customer", process.env.REACT_APP_CUSTOMER_NAME);
  url.searchParams.append("zoomType", "fullscreen");
  // url.searchParams.append("paintdescription", "midnight silver (metallic)");
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("make", make);
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", angle);
  
  return `${url}`;
};