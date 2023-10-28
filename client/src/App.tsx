import { HomePage, SignupPage } from "./pages";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
    </div>
  );
};

export default App;