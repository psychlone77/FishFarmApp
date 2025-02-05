import { Controller, Control, UseFormSetValue } from 'react-hook-form'
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { markerIcon } from './CustomMarkers'

export default function CustomLocationPicker({
  initialLocation,
  control,
  setValue,
  icon = markerIcon,
}: {
  initialLocation: [number, number] | null
  control: Control<any>
  setValue: UseFormSetValue<any>
  icon?: L.Icon
}) {
  const [position, setPosition] = useState<[number, number] | null>(initialLocation)

  useEffect(() => {
    setValue('latitude', initialLocation ? initialLocation[0] : null)
    setValue('longitude', initialLocation ? initialLocation[1] : null)
  }, [initialLocation, setValue])

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
      mouseover() {
        map.getContainer().style.cursor = 'crosshair'
      },
      drag() {
        map.getContainer().style.cursor = 'grab'
      },
      dragend() {
        map.getContainer().style.cursor = 'crosshair'
      }
    })

    return position === null ? null : <Marker icon={icon} position={position} />
  }

  return (
    <MapContainer
      center={initialLocation || [59.9, 10.74]}
      zoom={11}
      style={{ height: '200px', width: '100%'}}
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
        render={({ field, fieldState: { error } }) => (
          <>
            <input type='hidden' {...field} />
            {error && <Typography color='error'>{error.message}</Typography>}
          </>
        )}
      />
      <Controller
        name='longitude'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <input type='hidden' {...field} />
            {error && <Typography color='error'>{error.message}</Typography>}
          </>
        )}
      />
    </MapContainer>
  )
}
