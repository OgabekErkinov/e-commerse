import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Routing from "./routing/Routing";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routing />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
