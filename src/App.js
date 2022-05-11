import { Box, Button, Typography } from "@mui/material";
import Card from "./Components/Card";
import "./app.scss";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";

import useDrivePicker from "react-google-drive-picker";

function App() {
  const [isLoadingGoogleDriveApi, setIsLoadingGoogleDriveApi] = useState(false);
  const [listDocumentsVisible, setListDocumentsVisibility] = useState(false);
  const [UserSignIn, setUserSignIn] = useState(false);
  const [documents, setdocuments] = useState([]);

  const [openPicker, data, authResponse] = useDrivePicker();

  const CLIENT_ID =
    "923693732798-o1okob9pc8sir7aupfi921hv2jj8usl4.apps.googleusercontent.com";

  const API_KEY = "AIzaSyCbIkWwXWk4HHmh1h_FgkIfygG2up1OO-I";

  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  ];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = "https://www.googleapis.com/auth/drive";
  // const customViewsArray = [new google.picker.DocsView()];

  const handleOpenPicker = () => {
    openPicker({
      clientId: CLIENT_ID,
      developerKey: API_KEY,
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
    });
  };

  useEffect(() => {
    // do anything with the selected/uploaded files
    if (data) {
      data.docs.map((i) => console.log(i.name));
    }
  }, [data]);

  const handleClientLoad = () => {
    console.log("clicked");
    gapi.load("client:auth2", initClient);
  };

  const initClient = () => {
    setIsLoadingGoogleDriveApi(true);
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(
        function () {
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        function (error) {
          console.error(error);
        }
      );
  };

  const GetDriveFiles = (searchTerm = null) => {
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name, mimeType, modifiedTime)",
        q: searchTerm,
      })
      .then(function (response) {
        setListDocumentsVisibility(true);
        const res = JSON.parse(response.body);
        console.log(res);
        setdocuments(res.files);
      });
  };

  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut();
    setUserSignIn(false);
  };

  let Button1 = UserSignIn ? (
    <Button variant="contained" onClick={() => handleSignOut()}>
      Sign Out From Google Drive
    </Button>
  ) : (
    <Button variant="contained" onClick={() => handleClientLoad()}>
      Connect To Google Drive
    </Button>
  );

  const updateSigninStatus = (isSignedIn) => {
    console.log(isSignedIn);
    if (isSignedIn) {
      setUserSignIn(true);
      GetDriveFiles();
    } else {
      gapi.auth2.getAuthInstance().signIn();
    }
  };

  return (
    <div className="overlay">
      <div className="Model">
        <Card>
          <div className="UpperPart">
            {Button1}
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
