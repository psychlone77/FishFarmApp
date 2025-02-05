export function isDatePassed(stringDate: string | Date): boolean {
  return new Date(stringDate) < new Date()
}

export function calculateCenter(coordinates: { lat: number; long: number }[]): {
  lat: number
  long: number
} {
  if (coordinates.length === 0) {
    return { lat: 0, long: 0 }
  }

  let totalLat = 0
  let totalLong = 0

  coordinates.forEach(coord => {
    totalLat += coord.lat
    totalLong += coord.long
  })

  return {
    lat: totalLat / coordinates.length,
    long: totalLong / coordinates.length,
  }
}
