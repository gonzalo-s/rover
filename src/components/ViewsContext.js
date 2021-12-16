import React, { useContext, useState } from "react";

const ViewsContext = React.createContext();
const ViewUpdateContext = React.createContext();
const RoverContext = React.createContext();
const RoverUpdateContext = React.createContext();
const GalleryItems = React.createContext();
const GalleryUpdateItems = React.createContext();

export function useActiveView() {
  return useContext(ViewsContext);
}

export function useViewUpdate() {
  return useContext(ViewUpdateContext);
}

export function useActiveRover() {
  return useContext(RoverContext);
}

export function useRoverUpdate() {
  return useContext(RoverUpdateContext);
}

export function useGalleryItems() {
  return useContext(GalleryItems);
}
export function useGalleryUpdate() {
  return useContext(GalleryUpdateItems);
}

export function ViewsProvider({ children }) {
  // selectRover | gallery | photo
  const [activeView, setActiveView] = useState("selectRover");
  // curiosity | opporunity | spirit
  const [activeRover, setActiveRover] = useState({});

  const [galleryItems, setGalerryItems] = useState([]);

  console.log("gallery items in context: ", galleryItems);

  let curiosity = {
    name: "curiosity",
    cameras: [
      { name: "FHAZ", id: 1 },
      { name: "RHAZ", id: 2 },
      { name: "MAST", id: 3 },
      { name: "CHEMCAM", id: 4 },
      { name: "MAHLI", id: 5 },
      { name: "MARDI", id: 6 },
      { name: "NAVCAM", id: 7 },
    ],
  };
  let opportunity = {
    name: "opportunity",
    cameras: [
      { name: "FHAZ", id: 1 },
      { name: "RHAZ", id: 2 },
      { name: "NAVCAM", id: 7 },
      { name: "PANCAM", id: 8 },
      { name: "MINITES", id: 9 },
    ],
  };
  let spirit = {
    name: "spirit",
    cameras: [
      { name: "FHAZ", id: 1 },
      { name: "RHAZ", id: 2 },
      { name: "NAVCAM", id: 7 },
      { name: "PANCAM", id: 8 },
      { name: "MINITES", id: 9 },
    ],
  };

  function selectActiveRover(rover) {
    if (rover === "curiosity") return setActiveRover(curiosity);
    if (rover === "opportunity") return setActiveRover(opportunity);
    if (rover === "spirit") return setActiveRover(spirit);
  }

  return (
    <ViewsContext.Provider value={activeView}>
      <ViewUpdateContext.Provider value={setActiveView}>
        <RoverContext.Provider value={activeRover}>
          <RoverUpdateContext.Provider value={selectActiveRover}>
            <GalleryItems.Provider value={galleryItems}>
              <GalleryUpdateItems.Provider value={setGalerryItems}>
                {children}
              </GalleryUpdateItems.Provider>
            </GalleryItems.Provider>
          </RoverUpdateContext.Provider>
        </RoverContext.Provider>
      </ViewUpdateContext.Provider>
    </ViewsContext.Provider>
  );
}
