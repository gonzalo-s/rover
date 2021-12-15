import axios from "axios";

export default function getLastPhoto(solar, rover) {
  //let queryParam = solar;
  let queryTotal = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${solar}&api_key=6v9Re3WvO2HjosfpIyhpXKoSfBq4of49azsgzTH3`;

  return axios.get(queryTotal);
}
