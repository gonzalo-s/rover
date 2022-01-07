import axios from "axios";

//https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2020-10-10&api_key=6v9Re3WvO2HjosfpIyhpXKoSfBq4of49azsgzTH3
export default function getPhotosByEarthSolName(dateType, value, rover) {
  let date = "";
  if (dateType === "earth") {
    date = `?earth_date=${value}`;
  } else if (dateType === "sol") {
    date = `?sol=${value}`;
  }

  let queryTotal = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos${date}&api_key=6v9Re3WvO2HjosfpIyhpXKoSfBq4of49azsgzTH3`;
  return axios.get(queryTotal);
}
