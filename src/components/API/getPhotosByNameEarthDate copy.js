import axios from "axios";

//https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2020-10-10&api_key=6v9Re3WvO2HjosfpIyhpXKoSfBq4of49azsgzTH3
export default function getPhotosByNameEarthDate(earthDate, rover) {
  let queryTotal = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${earthDate}&api_key=6v9Re3WvO2HjosfpIyhpXKoSfBq4of49azsgzTH3`;
  console.log(queryTotal);
  return axios.get(queryTotal);
}
