import React, { useContext, useState } from "react";

const ViewsContext = React.createContext();
const ViewUpdateContext = React.createContext();
const RoverContext = React.createContext();
const RoverUpdateContext = React.createContext();

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

export function ViewsProvider({ children }) {
  // selectRover | gallery | photo
  const [activeView, setActiveView] = useState("selectRover");
  // curiosity | opporunity | spirit
  const [activeRover, setActiveRover] = useState({});

  let curiosity = {
    name: "curiosity",
    cameras: ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"],
  };
  let opportunity = {
    name: "opportunity",
    cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
  };
  let spirit = {
    name: "spirit",
    cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
  };

  function selectActiveRover(rover) {
    if (rover === "curiosity") return setActiveRover(curiosity);
    if (rover === "opportunity") return setActiveRover(opportunity);
    if (rover === "spirit") return setActiveRover(spirit);
  }

  console.log("context active view: ", activeView);
  console.log("context active rover: ", activeRover);

  return (
    <ViewsContext.Provider value={activeView}>
      <ViewUpdateContext.Provider value={setActiveView}>
        <RoverContext.Provider value={activeRover}>
          <RoverUpdateContext.Provider value={selectActiveRover}>
            {children}
          </RoverUpdateContext.Provider>
        </RoverContext.Provider>
      </ViewUpdateContext.Provider>
    </ViewsContext.Provider>
  );
}
