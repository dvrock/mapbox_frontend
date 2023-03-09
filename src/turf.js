import React, { useState, useEffect } from "react";
import * as turf from "turf";

import { MapContainer, Popup, GeoJSON, useMap } from "react-leaflet";
import "./styles.css";

const position = [65.3, 18.5];

export default function Turf({ data }) {
  const [showList, setListState] = useState(false);
  const [numberTestValue, setNumberTestValue] = useState(0);
  const [currentPositionTuple, setCurrentPositionTuple] = useState(position);
  const [currentFeatureId, setCurrentFeatureId] = useState(null);

  function DummyComponent({ currentPosition }) {
    const map = useMap();

    if (currentPositionTuple !== position) {
      map.flyTo(currentPosition, 8);
    }

    return null;
  }

  return (
    <div className="App">
      <div id="title">
        <img
          alt="logo"
          src="https://assets.website-files.com/5f48a04fb8a6cc95aceb4b6c/5f48a9b092be492b2687d900_allemed-logo-black.svg"
        />
        <span style={{ color: "#a8a8a8", padding: 10 }}>
          Kart over kommuner
        </span>
      </div>
      <div id="buttons">
        {
          <button
            onClick={() => {
              if (numberTestValue >= 5) {
                setNumberTestValue(numberTestValue - 15);
              }
            }}
          >
            Legg til (simulering)
          </button>
        }
        <button onClick={() => setListState(!showList)}>
          {showList ? "Skjul" : "Vis"} liste
        </button>
      </div>
      <MapContainer
        id="map"
        center={currentPositionTuple}
        zoom={5}
        scrollWheelZoom={false}
      >
        <DummyComponent currentPosition={currentPositionTuple} />
        <GeoJSON
          data={data[1]}
          pathOptions={{
            fillColor: "white",
            fill: true,
            opacity: 0,
            fillOpacity: 1,
          }}
        ></GeoJSON>
        {data[0].features.slice(numberTestValue).map((e) => (
          <GeoJSON
            data={e}
            onEachFeature={(featureData, featureLayer) =>
              featureLayer.on("click", () => {
                const coordinates =
                  turf.center(featureData).geometry.coordinates;
                setCurrentPositionTuple([coordinates[1], coordinates[0]]);
                setCurrentFeatureId(featureData.properties.lokalid);
              })
            }
            pathOptions={{
              color: "#FF7F24",
              fillColor:
                currentFeatureId !== null &&
                currentFeatureId === e.properties.lokalid
                  ? "black"
                  : null,
            }}
          >
            {
              <Popup>
                <span style={{ fontSize: 20 }}>
                  {e.properties.navn[0].navn}
                </span>
              </Popup>
            }
          </GeoJSON>
        ))}
      </MapContainer>
      {showList ? (
        <React.Fragment>
          <div id="listComponent">
            <ul>
              {data[0].features.map((e) => (
                <li>{e.properties.navn[0].navn}</li>
              ))}
            </ul>
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
}
