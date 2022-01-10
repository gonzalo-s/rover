import axios from "axios";
import rateLimit from "axios-rate-limit";

export default function getManifestsByName(name) {
  let queryTotal = `https://api.nasa.gov/mars-photos/api/v1/manifests/${name}?api_key=6v9Re3WvO2HjosfpIyhpXKoSfBq4of49azsgzTH3`;
  const http = rateLimit(axios.create(), {
    maxRequests: 2,
    perMilliseconds: 1000,
    maxRPS: 2,
  });
  http.getMaxRPS();
  return http.get(queryTotal);
}
