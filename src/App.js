import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './layout/layout';
import Gallery from './components/Gallery/Gallery';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>
    },
    {
      path: "/gallery",
      element: <Gallery/>
    }
  ])

  return (
    <div className="App">
     <RouterProvider router={router}/>
    </div>
  );
}

export default App;
