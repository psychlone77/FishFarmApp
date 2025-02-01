import { Box, Modal, Typography, Avatar, List, ListItem, ListItemText } from "@mui/material";
import { EmployeeResponse } from "../types/types";

export default function MyDetailsModal({
  open,
  handleClose,
  user,
}: {
  open: boolean;
  handleClose: () => void;
  user: EmployeeResponse;
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '50%',
          transform: 'translate(50%, -50%)',
          width: '400px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 4,
          p: 4,
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar alt={user.name} src={user.imageURL} sx={{ width: 56, height: 56, mr: 2 }} />
          <Typography variant="h6" gutterBottom>
            {user.name}
          </Typography>
        </Box>
        <List>
          <ListItem>
            <ListItemText
              primary="Email"
              secondary={user.email}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Position"
              secondary={user.employeePosition}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Age"
              secondary={user.age}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Certified Until"
              secondary={new Date(user.certifiedUntil).toLocaleDateString()}
            />
          </ListItem>
        </List>
      </Box>
    </Modal>
  );
}
