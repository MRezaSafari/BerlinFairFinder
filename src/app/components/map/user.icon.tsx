import L from "leaflet";

const UserLocationIcon = L.icon({
  iconUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}user-location.png`,
  iconSize: [40, 54],
  iconAnchor: [40, 42],
  popupAnchor: [-22, -45],
});
export default UserLocationIcon;
