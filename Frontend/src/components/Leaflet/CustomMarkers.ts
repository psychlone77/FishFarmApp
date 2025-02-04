import L from 'leaflet';
import fishfarm from '/fish-farm.webp';
import boat from '/boat.png';

export const markerIcon = new L.Icon({
    iconUrl: fishfarm,
    iconSize: [41, 41],
    iconAnchor: [19, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
});

export const boatMarkerIcon = new L.Icon({
    iconUrl: boat,
    iconSize: [41, 41],
    iconAnchor: [18, 41],
    popupAnchor: [0, -34],
    tooltipAnchor: [19, -28],
});