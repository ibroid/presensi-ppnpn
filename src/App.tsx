import Main from "./Main";
import { GlobalProvider } from "./context/GlobalContext";

export default function App() {

  return (
    <GlobalProvider>
      <Main />
    </GlobalProvider>
  )
}