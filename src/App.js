// App.js

// Importar estilos y enrutamiento
import "./App.css";
import { Routes, Route } from "react-router-dom";

// Componentes
import Navegation from "./components/Navegation";
import CreateUser from "./components/CreateUser";
import ListUser from "./components/ListUser";

// Componente principal
function App() {
  return (
    <div className="">
      <Navegation />
      <h2 className="container p-4">
        <Routes>
          <Route path="/" element={<ListUser />} />
          <Route path="/CreateUser" element={<CreateUser />} />
          <Route path="/edit/:id" element={<CreateUser />} />
        </Routes>
      </h2>
    </div>
  );
}

export default App;
