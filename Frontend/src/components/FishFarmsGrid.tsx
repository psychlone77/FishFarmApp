import { useQuery } from "react-query";
import { getFishFarms } from "../actions/fishFarmActions";
import { FishFarmResponse } from "../types/types";
import FishFarmGridCard from "./FishFarmGridCard";
import { Box, Container } from "@mui/material";
import { useRef, useState } from "react";

export default function FishFarmsGrid() {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);
    const { data, isLoading, isError } = useQuery<FishFarmResponse[]>('fishFarms', getFishFarms);
    return (
        <Box sx={{ padding: 2 }}>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading fish farms.</p>}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
                {data && data.map(fishFarm => (
                    <FishFarmGridCard key={fishFarm.id} fishFarm={fishFarm} />
                ))}
            </Box>
            <button onClick={() => {setCount(count + 1); console.log("useState: ",count);}}>Click me {count}</button>
            <button onClick={() => {countRef.current += 1; console.log("useRef: ",countRef.current);}}>Click me {countRef.current}</button>
        </Box>
    )
}