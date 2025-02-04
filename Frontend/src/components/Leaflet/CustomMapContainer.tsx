import { MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet'
import { Boat, FishFarmResponse } from '../../types/types'
import { LatLngBounds, LatLngExpression } from 'leaflet'
import { useEffect, useState } from 'react'
import { boatMarkerIcon, markerIcon } from './CustomMarkers'
import { Typography } from '@mui/material'

interface CustomMapContainerProps {
  fishFarms: FishFarmResponse[]
  boats?: Boat[]
  hoverId?: string
}

const FitBounds = ({ bounds, center }: { bounds: LatLngBounds; center?: LatLngExpression }) => {
  const map = useMap()

  useEffect(() => {
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [map, bounds])

  useEffect(() => {
    if (center) {
      map.setView(center)
    }
  }, [map, center])

  return null;
}

export default function CustomMapContainer({ fishFarms, boats, hoverId }: CustomMapContainerProps) {
  const bounds = new LatLngBounds([
    ...fishFarms.map(fishFarm => [fishFarm.latitude, fishFarm.longitude] as [number, number]),
    ...(boats ? boats.map(boat => [boat.latitude, boat.longitude] as [number, number]) : []),
  ])
  const [center, setCenter] = useState<LatLngExpression>(bounds.getCenter())

  useEffect(() => {
    if (hoverId) {
      const fishFarm = fishFarms.find(fishFarm => fishFarm.id === hoverId)
      if (fishFarm) {
        setCenter([fishFarm.latitude, fishFarm.longitude])
      }
    }
  }, [hoverId, fishFarms])

  return (
    <MapContainer minZoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {fishFarms.map(fishFarm => (
        <Marker
          icon={markerIcon}
          key={fishFarm.id}
          position={[fishFarm.latitude, fishFarm.longitude]}
        >
          <Tooltip direction='top' offset={[-15, -15]} permanent>
            <Typography variant='subtitle2'>{fishFarm.name}</Typography>
          </Tooltip>
        </Marker>
      ))}
      {boats?.map(boat => (
        <Marker icon={boatMarkerIcon} key={boat.id} position={[boat.latitude, boat.longitude]}>
          <Tooltip direction='top' offset={[-15, -15]} permanent>
            <Typography variant='subtitle2'>
              {boat.id} - {boat.boatType}
            </Typography>
          </Tooltip>
        </Marker>
      ))}
      <FitBounds bounds={bounds} center={center} />
    </MapContainer>
  )
}
