import './App.css';
import Calculator from "./pages/Calculator";
import {AuthProvider} from "./context/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <Navbar/>
      <Calculator />
    </AuthProvider>
  );
}

export default App;
