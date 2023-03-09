import React, { Fragment } from "react";
import { Marker } from "react-map-gl";
import { useStateMap } from "./hooks/mapHook";

export const Markers = () => {
  const markers = useStateMap();
  console.log(markers);
  return (
    <div>
      {/* {markers.map((marker, index) => (
        <Marker
          key={index}
          offsetTop={-48}
          offsetLeft={-24}
          latitude={marker[1]}
          longitude={marker[0]}
        >
          <img src="https://img.icons8.com/color/48/000000/marker.png" />
        </Marker>
      ))} */}
    </div>
  );
};
