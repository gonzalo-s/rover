import axios from "axios";

export default function getLastPhoto(date, rover) {
  //let queryParam = date;
  let queryTotal = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&api_key=6v9Re3WvO2HjosfpIyhpXKoSfBq4of49azsgzTH3`;

  return axios.get(queryTotal);
}
