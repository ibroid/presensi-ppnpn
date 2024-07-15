import Main from "./Main";
<<<<<<< HEAD
import { GlobalProvider } from "./context/GlobalContext";

export default function App() {

  return (
    <GlobalProvider>
      <Main />
    </GlobalProvider>
=======
import { AuthProvider } from "./context/AuthContext";
import { PegawaiListProvider } from "./context/PegawaiListContext";

export default function App() {
  return (
    <PegawaiListProvider>
      <Main />
    </PegawaiListProvider>
>>>>>>> main
  )
}