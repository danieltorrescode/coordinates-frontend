import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import Navbar from "./Navbar";
import Users from "./Users";

import "./App.css";

const App = () => {
  // Create a theme instance.
  const theme = createTheme({
    palette: {
      primary: {
        main: "#333333",
      },
      secondary: {
        main: "#decda2",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="container">
          <Navbar />
          <Users />
        </div>
      </ThemeProvider>
    </>
  );
};
export default App;
