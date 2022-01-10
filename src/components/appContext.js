import React, { useContext, useState, useEffect, useCallback } from "react";
import getManifestsByName from "./API/getManifestsByName";
import { parseISO } from "date-fns";
const AppContext = React.createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  // roverSelect | gallery | photo
  const [activeView, setActiveView] = useState("roverSelect");
  const [activePhoto, setActivePhoto] = useState();
  const [rawPhotos, setRawPhotos] = useState(null);
  const [pages, setPages] = useState(null);
  const [manifest, setManifest] = useState();
  const [daypickerParameters, setDaypickerParameters] = useState({});
  const [solParameters, setSolParameters] = useState({});
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
  });

  const resetAll = () => {
    console.log("reset manifest");
    setManifest();
    setRawPhotos(null);
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
    });
  };

  // console.log("-filterParameters: ", filterParameters);
  // console.log("-filters :", filters);
  console.log("-manifest :", manifest);
  // console.log("-pages :", pages);
  // console.log("-rawPhotos :", rawPhotos);
  // console.log("- daypickerParameters :", daypickerParameters);

  function filterPhotosByCameras(rawPhotos, cameras) {
    let newPhotos = rawPhotos.filter((photos) => {
      return cameras.includes(photos.camera.name);
    });
    return newPhotos;
  }

  function setDatepicker(manifest) {
    let parameters = {};
    parameters.maxDate = parseISO(manifest.max_date);
    parameters.minDate = parseISO(manifest.landing_date);
    let dates = manifest.photos.map((date) => date.earth_date);
    parameters.dates = dates.map((date) => parseISO(date));
    parameters.equivalentDates = manifest.photos.map((date) => {
      return { sol: date.sol.toString(), equivalentEarthDate: date.earth_date };
    });
    setDaypickerParameters(parameters);
  }

  function setSol(manifest) {
    let sol = manifest.photos.map((photo) => photo.sol);
    let parameters = {};
    parameters.maxSol = sol[sol.length - 1];
    parameters.minSol = sol[0];
    parameters.sol = sol;
    setSolParameters(parameters);
  }

  // const setDefaultFromManifest = useCallback(
  //   (manifest) => {

  //   },
  //   [filterParameters, filters]
  // );

  function setAvailableCameras(availableCameras) {
    let newFilterParameters = JSON.parse(JSON.stringify(filterParameters));
    newFilterParameters.availableCameras = availableCameras;
    setFilterParameters(newFilterParameters);
  }

  function getAvailableCamerasFromManifest(dateType, dateValue, manifest) {
    let photos = manifest.photos;
    let maxDateIdx = photos.length - 1;
    let availableCameras = photos[maxDateIdx].cameras;
    let newEarthDate;
    let newSolDate;

    if ((dateType === "sol") & (dateValue !== manifest.max_sol)) {
      newSolDate = dateValue;
      photos.map((date) => {
        if (date.sol === newSolDate) {
          availableCameras = date.cameras;
        }
        return availableCameras;
      });
    }

    if ((dateType === "earth") & (dateValue !== manifest.max_date)) {
      newEarthDate = dateValue;
      photos.map((date) => {
        if (date.earth_date === newEarthDate) {
          availableCameras = date.cameras;
        }
        return availableCameras;
      });
    }
    return availableCameras;
  }

  function selectRover(rover) {
    let newFilters = JSON.parse(JSON.stringify(filters));
    newFilters.rover = rover;
    newFilters.date = null;
    newFilters.cameras = null;
    newFilters.page = 1;
    setFilters(newFilters);
  }

  function selectDate(dateType, dateValue) {
    let newFilters = JSON.parse(JSON.stringify(filters));
    newFilters.date = {
      type: dateType,
      value: dateValue,
      equivalentEarthDate: "",
    };
    newFilters.page = 1;
    setRawPhotos(null);
    let availableCameras = getAvailableCamerasFromManifest(
      dateType,
      dateValue,
      manifest
    );
    setAvailableCameras(availableCameras);
    newFilters.cameras = availableCameras;
    setFilters(newFilters);
  }

  function selectCameras(availableCameras) {
    let newFilters = JSON.parse(JSON.stringify(filters));
    newFilters.cameras = availableCameras;
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

  useEffect(() => {
    console.log("useEffect manifest");

    if (filters.rover && !manifest) {
      getManifestsByName(filters.rover)
        .then((data) => {
          let manifest = data.data.photo_manifest;
          setDatepicker(manifest);
          setSol(manifest);
          setManifest(manifest);
          const setAvailableCamMaxDateSolFromManifest = (manifest) => {
            let newFilterParameters = JSON.parse(
              JSON.stringify(filterParameters)
            );
            let availableCameras = getAvailableCamerasFromManifest(
              "earth",
              manifest.max_date,
              manifest
            );
            newFilterParameters.availableCameras = availableCameras;
            newFilterParameters.maxDate = manifest.max_date;
            newFilterParameters.maxSol = manifest.max_sol;
            setFilterParameters(newFilterParameters);
          };
          const selectDateCameraFromManifest = (
            dateType,
            dateValue,
            manifest
          ) => {
            let newFilters = JSON.parse(JSON.stringify(filters));
            let cameras = getAvailableCamerasFromManifest(
              dateType,
              manifest.max_date,
              manifest
            );
            newFilters.date = { type: dateType, value: dateValue };
            newFilters.cameras = cameras;
            newFilters.page = 1;
            setFilters(newFilters);
          };

          setAvailableCamMaxDateSolFromManifest(manifest);
          selectDateCameraFromManifest("earth", manifest.max_date, manifest);
          //setDefaultFromManifest(manifest);
        })
        .catch((error) => {
          console.log("error fetching manifest: ", error);
        });
    }
  }, [filterParameters, filters, manifest]);
  const getMaxPageAndPaginate = useCallback(
    (photos) => {
      console.log("PAGINATING");
      let newFilterParameters = JSON.parse(JSON.stringify(filterParameters));
      let imgPerPage = 25;
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
      setFilterParameters(newFilterParameters);
      setPages(pagination(photos, maxPage, imgPerPage));
    },
    [filterParameters]
  );

  useEffect(() => {
    console.log("useEffect paginate");
    console.log("rawPhotos: ", rawPhotos);
    console.log("pages: ", pages);

    if (rawPhotos && !pages) {
      console.log("useEffect paginate TRUE");
      getMaxPageAndPaginate(filterPhotosByCameras(rawPhotos, filters.cameras));
    }
  }, [filters.cameras, getMaxPageAndPaginate, rawPhotos, pages]);

  return (
    <AppContext.Provider
      value={{
        selectRover,
        selectDate,
        selectCameras,
        selectPage,
        filters,
        filterParameters,
        manifest,
        getMaxPageAndPaginate,
        pages,
        activeView,
        setActiveView,
        selectActivePhoto,
        activePhoto,
        //getAvailableCamerasFromManifest,
        setAvailableCameras,
        rawPhotos,
        setRawPhotos,
        daypickerParameters,
        solParameters,
        resetAll,
        setPages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
