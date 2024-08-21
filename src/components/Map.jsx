import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCitiesContext } from "../context/CitiesContext";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { useURLPosition } from "../hooks/useURLPosition";
import Button from "./Button";

export default function Map() {
  const [lat, lng] = useURLPosition();
  const { cities } = useCitiesContext();

  const [mapPosition, setMapPositon] = useState([0, 0]);
  const {
    isLoading: isLoadingPosition,
    position: GeoLocationPosition,
    getPosition,
  } = useGeoLocation();
  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };
  function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }
  useEffect(
    function () {
      if (lat && lng) {
        setMapPositon([lat, lng]);
      }
    },
    [lat, lng]
  );
  useEffect(
    function () {
      if (GeoLocationPosition) {
        setMapPositon(GeoLocationPosition);
      }
    },
    [GeoLocationPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {!GeoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "use your Position"}
        </Button>
      )}
      <MapContainer
        // center={[lat, lng]}
        // center={[40, 40]}
        center={mapPosition}
        zoom={7}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot//{z}/{x}/{y}.png"
        />
        {cities.map((city, i) => (
          <Marker key={i} position={[city.position.lat, city.position.lng]}>
            <Popup>
              {flagemojiToPNG(getFlagEmoji(city.emoji))} <br />{" "}
              <h3>{city.cityName}.</h3>
            </Popup>
          </Marker>
        ))}
        {/* <ChangeCenter position={[lat || 40, lng || 0]} /> */}
        <ChangeCenter position={mapPosition} />
        <DetectClicked />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClicked() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
