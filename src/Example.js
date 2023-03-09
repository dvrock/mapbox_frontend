import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback, useMemo } from "react";
import * as turf from "@turf/turf";
import { render } from "react-dom";
import { Icon } from "@iconify/react";
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import { Markers } from "./Markers";
import geojsonStyles from "./geojsonStyles";
import "bootstrap/dist/css/bootstrap.min.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import axios from "axios";

import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  FlyToInterpolator,
  NavigationControl,
  Marker,
  Popup,
} from "react-map-gl";

import Geocoder from "react-map-gl-geocoder";
import { useStateMap } from "./hooks/mapHook";
//button position for going to user current location
const geolocateControlStyle = {
  left: 10,
  top: 50,
};

//btn Posiiton of full screen toggle
const fullscreenControlStyle = {
  right: 10,
  top: 10,
};

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
  "pk.eyJ1IjoidXNhbWEzNDIxIiwiYSI6ImNrem1sZzc1bTJwZzkyd25ya2dvYmExYWUifQ.DOhsn6ygtaCrOK1xRAGHsg";

export default function Example() {
  const [showPopup, setShowPopup] = useState(true);
  const [marker, setMarker] = useState([]);
  const [address, setAddress] = useState();
  const [coord, setCoord] = useState([0, 0]);
  const [zoom, setZoom] = useState(8);
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
  });
  async function getAddress(x) {
    const address = await axios.get(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        x.lngLat +
        ".json?access_token=pk.eyJ1IjoidXNhbWEzNDIxIiwiYSI6ImNrem1sZzc1bTJwZzkyd25ya2dvYmExYWUifQ.DOhsn6ygtaCrOK1xRAGHsg"
    );
    setShowPopup(!showPopup);
    setCoord(address.data.query);
    setAddress(address.data.features[0].place_name);
  }

  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  const centerPoint = [-73.975547, 40.691785];

  var radius = 0.1;

  var options = {
    steps: 50,
    units: "miles",
    properties: {
      text: "test",
    },
  };

  const firstCircle = turf.circle(centerPoint, radius, options);

  const secondCircle = turf.circle(centerPoint, radius * 2, options);

  const thirdCircle = turf.circle(centerPoint, radius * 4, options);
  return (
    <div style={{ height: "100vh" }}>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        zoom={zoom}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onMouseDown={(x) => {
          getAddress(x);
        }}
      >
        <div style={{ position: "absolute", right: 40, top: 40 }}>
          <NavigationControl
            style={{
              zIndex: 10,
            }}
          />
        </div>

        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
          marker={true}
        />

        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto={false}
        />
        <FullscreenControl style={fullscreenControlStyle} />
        <button
          style={{ position: "absolute", right: 0, top: 250 }}
          onClick={() => {
            setZoom(zoom + 1);
          }}
        >
          +
        </button>
        <button
          style={{ position: "absolute", right: 0, top: 280 }}
          onClick={() => {
            setZoom(zoom - 1);
          }}
        >
          -
        </button>
        {marker.map((marker, index) => {
          return (
            <div>
              <Marker
                key={index}
                offsetTop={-48}
                offsetLeft={-24}
                latitude={marker.marker[1]}
                longitude={marker.marker[0]}
              >
                <img src="https://img.icons8.com/color/48/000000/marker.png" />
              </Marker>
            </div>
          );
        })}

        {showPopup && (
          <Popup
            longitude={coord[0]}
            latitude={coord[1]}
            anchor="top"
            style={{ justifyContent: "center" }}
          >
            <div>{address}</div>
            <button
              type="button"
              style={{
                color: "blue",
                backgroundColor: "white",
                outline: "none",
                border: "none !important",
                borderRadius: "20px",
              }}
              onClick={() => {
                setShowPopup(!showPopup);

                setMarker([...marker, { marker: coord }]);
              }}
            >
              Add Marker
            </button>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
