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

  const [pages, setPages] = useState(null);

  const [manifest, setManifest] = useState();

  const [filteredGallery, setFilteredGallery] = useState(false);

  const [filterParameters, setFilterParameters] = useState({
    maxDate: null,
    maxSol: null,
    availableCameras: null,
    maxPage: null,
  });

  const [filters, setFilters] = useState({
    rover: null, // curiosity | opporunity | spirit

    date: null,

    cameras: null,

    page: 1,

    activePhoto: null,
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

        cameras: null,

        page: 1,

        activePhoto: null,
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
    setFilterParameters(newFilterParameters);
  }

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

  function getAvailableCamerasAndPages(photos) {
    //get available cameras
    //get max pages
    //set pages arrays
    let imgPerPage = 25;
    let newFilterParameters = JSON.parse(JSON.stringify(filterParameters));
    let availableCameras = getCamerasFromArr(photos);
    newFilterParameters.availableCameras = availableCameras;
    let maxPage = Math.ceil(photos.length / imgPerPage);
    newFilterParameters.maxPage = maxPage;
    if (!filters.cameras) {
      console.log("ASDKFNASKDNBL");
      selectCameras(availableCameras);
    }
    setPages(pagination(photos, maxPage, imgPerPage));
    setFilterParameters(newFilterParameters);
  }

  function getCamerasFromArr(arr) {
    let cameras = [];

    arr.map((photo) => {
      if (isCameraAlreadyInArray(cameras, photo.camera.name) === undefined) {
        cameras.push(photo.camera.name);
      }
      return cameras;
    });
    return cameras;
  }

  function isCameraAlreadyInArray(arr, camera) {
    let found = arr.find((element) => {
      return element === camera;
    });
    return found;
  }

  function selectRover(rover) {
    let newFilters = JSON.parse(JSON.stringify(filters));
    newFilters.rover = rover;
    newFilters.date = null;
    newFilters.cameras = null;
    newFilters.page = 1;
    newFilters.activePhoto = null;
    setFilters(newFilters);
  }

  function selectDate(dateType, dateValue) {
    let newFilters = JSON.parse(JSON.stringify(filters));
    newFilters.date = { type: dateType, value: dateValue };
    newFilters.cameras = null;
    newFilters.page = 1;
    newFilters.activePhoto = null;
    setFilters(newFilters);
  }

  function selectCameras(cameras) {
    let newFilters = JSON.parse(JSON.stringify(filters));
    newFilters.cameras = cameras;
    newFilters.page = 1;
    newFilters.activePhoto = null;
    setFilters(newFilters);
  }

  function selectPage(page) {
    let newFilters = JSON.parse(JSON.stringify(filters));
    newFilters.page = page;
    newFilters.activePhoto = null;
    setFilters(newFilters);
  }

  function selectActivePhoto(activePhoto) {
    let newFilters = JSON.parse(JSON.stringify(filters));
    newFilters.activePhoto = activePhoto;
    setFilters(newFilters);
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
        getAvailableCamerasAndPages,
        pages,
        activeView,
        setActiveView,
        selectActivePhoto,
        filteredGallery,
        setFilteredGallery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
