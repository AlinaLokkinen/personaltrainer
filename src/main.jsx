import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import Customers from './Components/Customers.jsx'
// import Trainings from './Components/Trainings.jsx'
// import Home from './Components/Home.jsx'
// import Calendar from './Components/Calendar.jsx'
import { HashRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         element: <Home />,
//         index: true,
//       },
//       {
//         path: "/customers",
//         element: <Customers />,
//       },
//       {
//         path: "/trainings",
//         element: <Trainings />
//       },
//       {
//         path: "/calendar",
//         element: <Calendar />
//       }
//     ]
//   }
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
