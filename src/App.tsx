import Main from "./Main";
import { AuthProvider } from "./context/AuthContext";
import { PegawaiListProvider } from "./context/PegawaiListContext";

export default function App() {
  return (
    <PegawaiListProvider>
      <Main />
    </PegawaiListProvider>
  )
}