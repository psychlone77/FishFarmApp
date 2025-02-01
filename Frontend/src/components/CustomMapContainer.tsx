import { MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { FishFarmResponse } from '../types/types';
import { LatLngBounds } from 'leaflet';
import { useEffect } from 'react';

interface CustomMapContainerProps {
  fishFarms: FishFarmResponse[];
}

const FitBounds = ({ bounds }: { bounds: LatLngBounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds.isValid()) {
      map.fitBounds(bounds);
      map.setMaxZoom(8);
    }
  }, [map, bounds]);

  return null;
};

export default function CustomMapContainer({ fishFarms }: CustomMapContainerProps) {
  const bounds = new LatLngBounds(
    fishFarms.map(fishFarm => [fishFarm.latitude, fishFarm.longitude] as [number, number])
  );

  return (
    <MapContainer center={bounds.getCenter()} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {fishFarms.map(fishFarm => (
        <Marker key={fishFarm.id} position={[fishFarm.latitude, fishFarm.longitude]}>
          <Tooltip direction='top' offset={[-15, -15]} permanent>
            {fishFarm.name}
          </Tooltip>
        </Marker>
      ))}
      <FitBounds bounds={bounds} />
    </MapContainer>
  );
}