import { useQuery } from 'react-query'
import FishFarmsGrid from '../components/FishFarm/FishFarmsGrid'
import { FishFarmResponse } from '../types/types'
import { getFishFarms } from '../actions/fishFarmActions'
import CustomMapContainer from '../components/CustomMapContainer'

export default function HomePage() {
  const { data, isLoading, isError } = useQuery<FishFarmResponse[]>('fishFarms', getFishFarms)
  return (
    <>
      <FishFarmsGrid data={data} isLoading={isLoading} isError={isError} />
      {data && data.length === 0 && <p>No fish farms found</p>}
      {!isLoading && data && data.length > 0 && <CustomMapContainer fishFarms={data} />}
    </>
  )
}
