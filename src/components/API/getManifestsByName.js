import axios from "axios";

export default function getManifestsByName(name) {
  let queryTotal = `https://api.nasa.gov/mars-photos/api/v1/manifests/${name}?api_key=6v9Re3WvO2HjosfpIyhpXKoSfBq4of49azsgzTH3`;
  return axios.get(queryTotal);
}
