import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./PathSection.css";
export default function PathSection() {
  return (
    <div className="path">
      <h1 style={{ marginLeft: "20rem" }}>Где мы находимся?</h1>
      <p id="text">
        Лесной домик находится в 20-25мин от ТЦ "Планета" в сторону Усть-Качки.
        До нас можно добраться на 339 автобусе (до остановки Косотуриха, далее
        пешком 10-15мин до коттеджного поселка "Тихие пруды"), который ходит от
        центрального рынка. Так же до домика можно доехать на такси. Примерная
        стоимость от ТЦ "Планета" 500-600р.
      </p>
      <div className="leaflet">
        <MapContainer center={[57.870796, 55.841075]} zoom={16}>
          <TileLayer
            attribution=""
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[57.870796, 55.841075]}>
            <Popup>Lesnoy.dom - 46-й квартал, 4 </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
