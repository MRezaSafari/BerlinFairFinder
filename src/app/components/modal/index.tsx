import { Market } from "@fairfinder/app/models";
import { LatLng } from "leaflet";
import React, { FC, useEffect, useState } from "react";
import { useMap } from "react-leaflet";

interface Props {
  visible: boolean;
  onClose: () => void;
  market: Market | null;
}

const Modal: FC<Props> = ({ visible, market, onClose }) => {
  const [showModal, setShowModal] = useState(visible);
  const [position, setPosition] = useState<any>(null);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 16);
    });
  }, [map]);

  useEffect(() => {
    setShowModal(visible);
  }, [visible]);

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  if (!showModal || !market) return null;

  return (
    <>
      <div className="justify-center items-center flex fixed inset-0 z-[99999] outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl min-w-[300px] z-[99999] overflow-y-scroll max-h-[80dvh]">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center sticky top-0 left-0 bg-white z-10 justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold">{market.name}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={handleClose}
              >
                <span className=" text-red-400 block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto text-base leading-9 overflow-y-auto">
              <div className="mb-5">{market.bemerkungen}</div>
              <hr />
              <div className="mt-5">
                <strong>Street: </strong>
                {market.strasse}
              </div>
              <div>
                <strong>District: </strong>
                {market.plz_ort}
              </div>
              <div>
                <strong>Organizer: </strong>
                {market.veranstalter}
              </div>
              <div>
                <strong>Opening Hours: </strong>
                {market.oeffnungszeiten}
              </div>
              <div>
                <strong>Email: </strong>
                {market.email.replace("mailto:", "")}
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              {market.w3 && market.w3.length > 0 && (
                <a
                  className="bg-emerald-400 !text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  href={
                    market.w3.startsWith("http") ||
                    market.w3.startsWith("https")
                      ? market.w3
                      : `https://${market.w3}`
                  }
                  target="_blank"
                >
                  Website
                </a>
              )}
              <a
                className="bg-blue-500 !text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                target="_blank"
                href={`https://www.google.com/maps/dir/?api=1&origin=${
                  position?.lat ?? 0
                },${position?.lng ?? 0}&destination=${market.lat},${
                  market.lng
                }`}
              >
                Get Direction
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="opacity-75 fixed inset-0 bg-black z-[99998]"
        onClick={handleClose}
      ></div>
    </>
  );
};

export default Modal;
