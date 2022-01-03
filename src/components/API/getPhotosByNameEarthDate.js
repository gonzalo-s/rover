import axios from "axios";

//https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2020-10-10&api_key=6v9Re3WvO2HjosfpIyhpXKoSfBq4of49azsgzTH3
export default function getPhotosByNameEarthDate(
  earthDate,
  rover,
  camera = "ALL"
) {
  let earth = "";
  let selectedCamera = "";

  if (earthDate) {
    earth = `?earth_date=${earthDate}`;
  }

  if (camera !== "ALL") {
    selectedCamera = `&camera=${camera}`;
  }

  let queryTotal = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos${earth}${selectedCamera}&api_key=6v9Re3WvO2HjosfpIyhpXKoSfBq4of49azsgzTH3`;
  console.log(queryTotal);
  return axios.get(queryTotal);
}
