import { Box, Button, TextField, Typography } from "@mui/material";
import Card from "./Components/Card";
import "./app.scss";
import useDrivePicker from "react-google-drive-picker";

function App() {
  const [openPicker, data, authResponse] = useDrivePicker();

  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "329428708348-r2mhgm9v4fib1i5n0qdtos261ej3vqbv.apps.googleusercontent.com",
      developerKey: "AIzaSyDiyMNwWJaMDYPSvmH4OvdGFlRRLFvF-vc",
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
    });
  };

  return (
    <div className="overlay">
      <div className="Model">
        <Card>
          <div className="UpperPart">
            <Button variant="contained">Connect to Google Drive</Button>
            <Button variant="contained" onClick={handleOpenPicker}>
              Select File From Google Drive
            </Button>
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
