import L from "leaflet";

const MarketIcon = L.icon({
    iconUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}market-icon.png`,
    iconSize: [40, 52],
    iconAnchor: [30, 32],
    popupAnchor: [0, 0],
});
export default MarketIcon