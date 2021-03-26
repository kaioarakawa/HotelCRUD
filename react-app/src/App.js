import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Hotel from "./components/Hotel";
import { Container } from "@material-ui/core";


function App() {
  return (
    <Provider store={store}>
        <Container maxWidth="xl">
          <Hotel />
        </Container>
    </Provider>
  );
}

export default App;