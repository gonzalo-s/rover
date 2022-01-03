import React, { useContext, useState, useEffect } from "react";
import getManifestsByName from "./API/getManifestsByName";

const AppContext = React.createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  // roverSelect | gallery | photo
  const [activeView, setActiveView] = useState("roverSelect");

  //const [activeRover, setActiveRover] = useState({});

  //const [galleryItems, setGalleryItems] = useState([]);

  const [activePhoto, setActivePhoto] = useState();

  const [pages, setPages] = useState(null);

  const [manifest, setManifest] = useState();

  const [filterParameters, setFilterParameters] = useState({
    maxDate: null,
    maxSol: null,
    availableCameras: null,
    maxPage: null,
  });

  const [filters, setFilters] = useState({
    rover: null, // curiosity | opporunity | spirit

    date: null,

    camera: "ALL",

    page: 1,
  });

  useEffect(() => {
    if (filters.rover) {
      getManifestsByName(filters.rover)
        .then((data) => {
          setManifest(data.data.photo_manifest);
          setDefaultFromManifest(data.data.photo_manifest);
        })
        .catch((error) => {
          console.log("error fetching manifest: ", error);
        });
    }
  }, [filters.rover]);

  useEffect(() => {
    if (activeView === "roverSelect") {
      resetAll();
      setPages(null);
      setFilterParameters({
        maxDate: null,
        maxSol: null,
        availableCameras: null,
        maxPage: null,
      });
      setFilters({
        rover: null, // curiosity | opporunity | spirit

        date: null,

        camera: "ALL",

        page: 1,
      });
    }
  }, [activeView]);

  function resetAll() {
    setManifest();
  }
  console.log("filterParameters: ", filterParameters);
  console.log("filters :", filters);
  console.log("manifest :", manifest);

  function setDefaultFromManifest(manifest) {
    getFilterParameters(manifest);
    selectDate("earth", manifest.max_date);
  }

  function getFilterParameters(manifest) {
    let newFilterParameters = JSON.parse(JSON.stringify(filterParameters));
    newFilterParameters.maxDate = manifest.max_date;
    newFilterParameters.maxSol = manifest.max_sol;
    newFilterParameters.availableCameras = getAvailableCamerasFromManifest(
      "earth",
      manifest.max_date,
      manifest
    );
    setFilterParameters(newFilterParameters);
  }
  function getAvailableCamerasFromManifest(type, value, manifest) {
    let photos = manifest.photos;
    let maxDateIdx = photos.length - 1;
    console.log(photos[maxDateIdx]);
    let availableCameras = photos[maxDateIdx].cameras;
    let newEarthDate;
    let newSolDate;

    if ((type === "sol") & (value !== manifest.max_sol)) {
      newSolDate = value;
      photos.map((date) => {
        if (date.sol === newSolDate) {
          return (availableCameras = date.cameras);
        }
        return availableCameras;
      });
    }

    if ((type === "earth") & (value !== manifest.max_date)) {
      newEarthDate = value;
      photos.map((date) => {
        if (date.earth_date === newEarthDate) {
          return (availableCameras = date.cameras);
        }
        return availableCameras;
      });
    }
    console.log("type: ", type, "  value: ", value);
    return availableCameras;
  }

  function getMaxPageAndPaginate(photos) {
    //get max pages
    //set pages arrays
    let imgPerPage = 25;
    let newFilterParameters = JSON.parse(JSON.stringify(filterParameters));
    let maxPage = Math.ceil(photos.length / imgPerPage);
    newFilterParameters.maxPage = maxPage;

    function pagination(photos, maxPage, photosPPage = 25) {
      let idxStart = 0;
      let counter = 1;
      let newPhotos = [];
      function loop() {
        if (counter <= maxPage) {
          const newPage = photos.slice(idxStart, idxStart + photosPPage);
          newPhotos.push(newPage);
          counter++;
          idxStart += photosPPage;
          loop();
        } else {
          return;
        }
      }
      loop();

      return newPhotos;
    }
    setPages(pagination(photos, maxPage, imgPerPage));
    setFilterParameters(newFilterParameters);
  }

  function selectRover(rover) {
    let newFilters = JSON.parse(JSON.stringify(filters));
    newFilters.rover = rover;
    newFilters.date = null;
    newFilters.camera = "ALL";
    newFilters.page = 1;
    setFilters(newFilters);
  }

  function selectDate(dateType, dateValue) {
    let newFilters = JSON.parse(JSON.stringify(filters));
    newFilters.date = { type: dateType, value: dateValue };
    newFilters.camera = "ALL";
    newFilters.page = 1;
    setFilters(newFilters);
  }

  function selectCameras(camera) {
    let newFilters = JSON.parse(JSON.stringify(filters));
    console.log("appContext selectCameras: ", camera);
    newFilters.camera = camera;
    newFilters.page = 1;
    setFilters(newFilters);
  }

  function selectPage(page) {
    let newFilters = JSON.parse(JSON.stringify(filters));
    newFilters.page = page;
    setFilters(newFilters);
  }

  function selectActivePhoto(activePhoto) {
    setActivePhoto(activePhoto);
  }

  return (
    <AppContext.Provider
      value={{
        selectRover,
        selectDate,
        selectCameras,
        selectPage,
        filters,
        getFilterParameters,
        filterParameters,
        manifest,
        setDefaultFromManifest,
        getMaxPageAndPaginate,
        pages,
        activeView,
        setActiveView,
        selectActivePhoto,
        activePhoto,
        getAvailableCamerasFromManifest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
