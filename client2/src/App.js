import React, { Children } from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './components/Login/Login';
import MainPage from './components/MainPage.js/MainPage';
import RootLayout from './RootLayout/RootLayout';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {

  const router = createBrowserRouter([
    {
      path:"",
      element:<RootLayout/>,
      errorElement: <ErrorPage />,
      children:[
        {
          path:"",
          element:<Login/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/mainpage",
          element:<MainPage/>
        }
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App