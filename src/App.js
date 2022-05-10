import { Box, Button, TextField, Typography } from "@mui/material";
import Card from "./Components/Card";
import "./app.scss";

function App() {
  return (
    <div className="overlay">
      <div className="Model">
        <Card>
          <div className="UpperPart">
            <Button variant="contained">Connect to Google Drive</Button>
            <Button variant="contained">Select File From Google Drive</Button>
          </div>
          <div className="LowerPart">
            <Typography>Selected File...</Typography>
            <Box className="ItemsBox">
              <Typography>Hello</Typography>
              <Typography>Hello</Typography>
              <Typography>Hello</Typography>
              <Typography>Hello</Typography>
              <Typography>Hello</Typography>
              <Typography>Hello</Typography>
            </Box>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
