import { Controller, Control, UseFormSetValue } from 'react-hook-form'
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import { FishFarmRequest } from '../types/types'
import { Box, Typography } from '@mui/material'

export default function LocationPicker({
  initialLocation,
  control,
  setValue,
}: {
  initialLocation: [number, number] | null
  control: Control<FishFarmRequest>
  setValue: UseFormSetValue<FishFarmRequest>
}) {
  const [position, setPosition] = useState<[number, number] | null>(initialLocation)

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        setPosition([lat, lng])
        setValue('latitude', lat)
        setValue('longitude', lng)
        map.flyTo(e.latlng, map.getZoom())
        map.setView(e.latlng, map.getZoom())
      },
    })

    return position === null ? null : <Marker position={position} />
  }

  return (
    <MapContainer
      center={initialLocation || [59.9, 10.74]}
      zoom={11}
      style={{ height: '200px', width: '100%' }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 1000,
          backgroundColor: 'transparent',
          backdropFilter: 'blur(10px)',
          borderRadius: '5px',
          padding: '5px',
        }}
      >
        {position && (
          <Box>
            <Typography variant='body2'>Latitude: {position[0]}</Typography>
            <Typography variant='body2'>Longitude: {position[1]}</Typography>
          </Box>
        )}
      </Box>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
      <Controller
        name='latitude'
        control={control}
        render={({ field }) => <input type='hidden' {...field} />}
      />
      <Controller
        name='longitude'
        control={control}
        render={({ field }) => <input type='hidden' {...field} />}
      />
    </MapContainer>
  )
}
