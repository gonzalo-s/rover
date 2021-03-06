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
  const [urlParsed, setUrlParsed] = useState(false);
  // const [url, setUrl] = useState(null);
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
    resetUrl();
  };

  useEffect(() => {
    const firstLoadUrl = new URLSearchParams(window.location.search);

    if (firstLoadUrl.toString() !== "") {
      setRawPhotos(null);
      let newQueryObj = getValuesFromQueryString(firstLoadUrl);
      setFilters(newQueryObj);
      setUrlParsed(true);
    } else {
      resetUrl();
      setUrlParsed(false);
    }
  }, []);

  function getValuesFromQueryString(queryString) {
    let newQueryObj = {
      date: {
        type: null,
        value: null,
      },
      page: 1,
    };

    for (var pair of queryString.entries()) {
      let key = pair[0];
      let value = pair[1];

      if (key === "dateType") {
        newQueryObj.date.type = value;
      } else if (key === "dateValue") {
        newQueryObj.date.value = value;
      } else if (key === "page") {
        newQueryObj.page = parseInt(value);
      } else if (key === "cameras") {
        newQueryObj.cameras = value.split(",");
      } else {
        newQueryObj[key] = value;
      }
    }

    return newQueryObj;
  }

  function setQueryString() {
    let newFilters = {};
    if (filters.rover === null) return window.history.pushState({}, "", ` `);
    if (filters.rover) {
      newFilters.rover = filters.rover;
      newFilters.page = filters.page;
    }
    if (filters.date) {
      newFilters.dateType = filters.date.type;
      newFilters.dateValue = filters.date.value;
    }
    if (filters.cameras) {
      newFilters.cameras = filters.cameras;
    }

    const newUrl = new URLSearchParams(newFilters);

    return window.history.pushState({}, "", `?${newUrl}`);
  }

  if (activeView !== "roverSelect") {
    setQueryString();
  }

  function resetUrl() {
    return window.history.pushState({}, "", `rover`);
  }

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
      newSolDate = parseInt(dateValue);

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
  const getMaxPageAndPaginate = useCallback(
    (photos) => {
      let newFilterParameters = JSON.parse(JSON.stringify(filterParameters));
      let filteredPhotos = filterPhotosByCameras(photos, filters.cameras);
      let imgPerPage = 25;
      let maxPage = Math.ceil(filteredPhotos.length / imgPerPage);
      newFilterParameters.maxPage = maxPage;
      setFilterParameters(newFilterParameters);
      setPages(pagination(filteredPhotos, maxPage, imgPerPage));
    },
    [filterParameters, filters.cameras]
  );

  useEffect(() => {
    if (filters.rover && !manifest) {
      getManifestsByName(filters.rover)
        .then((data) => {
          let manifest = data.data.photo_manifest;
          setDatepicker(manifest);
          setActiveView("gallery");
          setSol(manifest);
          setManifest(manifest);
          let dateType = urlParsed ? filters.date.type : "earth";
          let dateValue = urlParsed ? filters.date.value : manifest.max_date;
          let availableCameras = getAvailableCamerasFromManifest(
            dateType,
            dateValue,
            manifest
          );
          const setAvailableCamMaxDateSolFromManifest = (manifest) => {
            let newFilterParameters = JSON.parse(
              JSON.stringify(filterParameters)
            );

            newFilterParameters.availableCameras = availableCameras;
            newFilterParameters.maxDate = manifest.max_date;
            newFilterParameters.maxSol = manifest.max_sol;
            setFilterParameters(newFilterParameters);
          };
          const selectDateCamera = (dateType, dateValue) => {
            let newFilters = JSON.parse(JSON.stringify(filters));

            newFilters.cameras = urlParsed ? filters.cameras : availableCameras;

            newFilters.date = { type: dateType, value: dateValue };
            if (!urlParsed) {
              newFilters.page = 1;
            }
            setFilters(newFilters);
          };

          setAvailableCamMaxDateSolFromManifest(manifest);
          selectDateCamera(dateType, dateValue);
          setUrlParsed(false);
        })
        .catch((error) => {
          console.log("error fetching manifest: ", error);
        });
    }
  }, [
    filterParameters,
    filters,
    getMaxPageAndPaginate,
    manifest,
    rawPhotos,
    urlParsed,
  ]);

  useEffect(() => {
    if (rawPhotos && !pages) {
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
        setAvailableCameras,
        rawPhotos,
        setRawPhotos,
        daypickerParameters,
        solParameters,
        resetAll,
        setPages,
        urlParsed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
