import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { Boat, FishFarmResponse } from '../../types/types';
import { LatLngBounds } from 'leaflet';
import { useEffect } from 'react';
import FishFarmGridCard from '../FishFarm/FishFarmGridCard';
import { boatMarkerIcon, markerIcon } from './CustomMarkers';
import { Typography } from '@mui/material';

interface CustomMapContainerProps {
  fishFarms: FishFarmResponse[];
  boats?: Boat[];
}

const FitBounds = ({ bounds }: { bounds: LatLngBounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds.isValid()) {
      map.fitBounds(bounds);
    }
  }, [map, bounds]);

  return null;
};

export default function CustomMapContainer({ fishFarms, boats }: CustomMapContainerProps) {
  const bounds = new LatLngBounds([
    ...fishFarms.map(fishFarm => [fishFarm.latitude, fishFarm.longitude] as [number, number]),
    ...(boats ? boats.map(boat => [boat.latitude, boat.longitude] as [number, number]) : [])
  ]);

  return (
    <MapContainer center={bounds.getCenter()} minZoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {fishFarms.map(fishFarm => (
        <Marker icon={markerIcon} key={fishFarm.id} position={[fishFarm.latitude, fishFarm.longitude]}>
          <Tooltip direction='top' offset={[-15, -15]} permanent>
            <Typography variant='subtitle2'>{fishFarm.name}</Typography>
          </Tooltip>
          <Popup>
            <FishFarmGridCard onClick={() => {}} fishFarm={fishFarm} />
          </Popup>
        </Marker>
      ))}
      {boats?.map(boat => (
        <Marker icon={boatMarkerIcon} key={boat.id} position={[boat.latitude, boat.longitude]}>
          <Tooltip direction='top' offset={[-15, -15]} permanent>
            <Typography variant='subtitle2'>{boat.id} - {boat.boatType}</Typography>
          </Tooltip>
        </Marker>
      ))}
      <FitBounds bounds={bounds} />
    </MapContainer>
  );
}