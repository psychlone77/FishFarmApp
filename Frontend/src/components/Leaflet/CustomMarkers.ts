import L from 'leaflet';

export const markerIcon = new L.Icon({
    iconUrl: '/fish-farm.webp',
    iconSize:    [41, 41],
    iconAnchor:  [19, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
});

export const boatMarkerIcon = new L.Icon({
    iconUrl: '/boat.png',
    iconSize:    [41, 41],
    iconAnchor:  [18, 41],
    popupAnchor: [0, -34],
    tooltipAnchor: [19, -28],
});