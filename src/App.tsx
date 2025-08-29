import AppRoutes from "./routes/AppRoutes";

function App(props:any) {
  return (
    <>
    <div>
        <AppRoutes {...props} />
    </div>
    </>    
  );
}

export default App
