
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './app.routers';
import { SearchProvider } from './Services/contextservice/searchprocontext';



function App() {
  return (
  <SearchProvider>
    <div className="App">
      <BrowserRouter>
      <AppRoutes></AppRoutes>     
      </BrowserRouter>
    </div>
    </SearchProvider>
  );
}

export default App;
