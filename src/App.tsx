import Main from "./Main";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  )
}