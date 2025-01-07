import { Card, CardContent, Typography } from "@mui/material";
import { FishFarmResponse } from "../types/types";

export default function FishFarmGridCard({
  fishFarm,
}: {
  fishFarm: FishFarmResponse;
}) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 'fit-content',
        cursor: "pointer",
        borderRadius: 2,
        transition: "transform 0.15s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "6px 6px 20px rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <CardContent>
        {fishFarm.imageURL && (
            <img
                src={fishFarm.imageURL}
                alt={fishFarm.name}
                style={{ width: "100%", height: "auto", borderRadius: "8px 8px 8px 8px" }}
            />
        )}
        <Typography variant="h5" component="div" noWrap>
          {fishFarm.name}
        </Typography>
        <Typography variant="body2">
          Location: {fishFarm.latitude}, {fishFarm.longitude}
        </Typography>
        <Typography variant="body2">
          Cage Count: {fishFarm.cageCount}
        </Typography>
        <Typography variant="body2">
          Has Barge: {fishFarm.hasBarge ? "Yes" : "No"}
        </Typography>
        <Typography variant="body2">
          Created On: {new Date(fishFarm.createdOn).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
