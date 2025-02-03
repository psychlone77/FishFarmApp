import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { FishFarmResponse } from '../../types/types';
import { LatLngBounds } from 'leaflet';
import { useEffect } from 'react';
import FishFarmGridCard from '../FishFarm/FishFarmGridCard';
import { markerIcon } from './MarkerIcon';

interface CustomMapContainerProps {
  fishFarms: FishFarmResponse[];
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

export default function CustomMapContainer({ fishFarms }: CustomMapContainerProps) {
  const bounds = new LatLngBounds(
    fishFarms.map(fishFarm => [fishFarm.latitude, fishFarm.longitude] as [number, number])
  );

  return (
    <MapContainer center={bounds.getCenter()} minZoom={5} maxZoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {fishFarms.map(fishFarm => (
        <Marker icon={markerIcon} key={fishFarm.id} position={[fishFarm.latitude, fishFarm.longitude]}>
          <Tooltip direction='top' offset={[-15, -15]} permanent>
            {fishFarm.name}
          </Tooltip>
          <Popup>
            <FishFarmGridCard onClick={() => {}} fishFarm={fishFarm} />
          </Popup>
        </Marker>
      ))}
      <FitBounds bounds={bounds} />
    </MapContainer>
  );
}