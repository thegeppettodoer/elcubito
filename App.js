import React from "react";
import Providers from "./src/componentes/navigation/Index";
import CargarRegursos from "./src/utils/CargarRecursos";

const App = () => {
  const seCargo = CargarRegursos();

  if (!seCargo) {
    return null;
  } else {
    return <Providers />;
  }
};

export default App;
