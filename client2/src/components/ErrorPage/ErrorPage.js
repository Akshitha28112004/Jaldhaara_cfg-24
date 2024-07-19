import React from 'react';
import { useRouteError } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {

    let navigate = useNavigate()

  const error = useRouteError();
  console.error(error);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f8d7da', color: '#721c24' }}>
      <h1>Oops!</h1>
      <p>This page does not exist.Please Login</p>
      <button className='btn' onClick={() => navigate('/login')} style={{backgroundColor:"#FC6D3F"}} >Login</button>
    </div>
  );
}

export default ErrorPage;
