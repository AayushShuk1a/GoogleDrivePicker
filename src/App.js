import { Button } from "@mui/material";
import Card from "./Components/Card";
import "./app.scss";

function App() {
  return (
    <div className="App">
      <Card>
        <div className="UpperPart">
          <Button variant="contained">Connect to Google Drive</Button>
          <Button variant="contained">Select File From Google Drive</Button>
        </div>
      </Card>
    </div>
  );
}

export default App;
