import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./context/AuthContext";

function App(props: any) {
  return (
    <>
      <div>
        <AuthProvider>
          <AppRoutes {...props} />
        </AuthProvider>
      </div>
    </>
  );
}

export default App
