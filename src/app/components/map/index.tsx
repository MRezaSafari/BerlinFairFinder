"use client";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import Markets from "../../../../public/market-list.json";
import { useEffect, useState } from "react";
import UserIcon from "./user.icon";
import MarketIcon from "./market.icon";
import { Market } from "@fairfinder/app/models";
import Modal from "../modal";

function LocationMarker() {
  const [position, setPosition] = useState<any>(null);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 14);
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={UserIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default function MyMap() {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [showModal, setShowModal] = useState(false);

  const renderPins = () => {
    return Markets.map((market, idx) => {
      if (market.lat === null || market.lng === null) return null;
      return (
        <Marker
          position={[+market.lat, +market.lng]}
          key={market.name + market.lat + market.lng + idx}
          icon={MarketIcon}
          eventHandlers={{
            click: () => {
              setSelectedMarket(market as Market);
              setShowModal(true);
            },
          }}
        />
      );
    });
  };
  return (
    <MapContainer
      center={[52.520008, 13.404954]}
      zoom={11}
      scrollWheelZoom={false}
      doubleClickZoom={true}
      markerZoomAnimation={true}
      zoomAnimation={true}
      zoomControl={true}
      className="h-[100vh] w-[100vw]"
      
    >
      <Modal
        market={selectedMarket}
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />
      <TileLayer
        attribution='&copy; <a href="https://linkedin.com/in/rezaverse" target="_blank">Created by Lukas Safari</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {renderPins()}
      <LocationMarker />
    </MapContainer>
  );
}
