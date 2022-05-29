import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/es/integration/react";
import routes from "./routes"

const theme = createTheme({
  palette: {
    primary: {
      main: "#b0c0d0",
    },
    secondary: purple,
  },
  typography: {
    frontFamily: "Quicksand",
    frontWeightLight: 400,
    frontWeightRegular: 500,
    frontWeightMedium: 600,
    frontWeightBold: 700,
  },
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router>
            {routes}
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
