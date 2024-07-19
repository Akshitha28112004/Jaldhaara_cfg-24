// import React from 'react'
// import { useContext } from 'react'
// import { CounterContext } from '../../context/CounterContext'
// import { useNavigate } from 'react-router-dom'

// function MainPage() {

//   const {user,setUser} = useContext(CounterContext)

//   const navigate = useNavigate()
  

//   function logout(){
//     setUser(null)
//     localStorage.removeItem('token')
//     localStorage.removeItem('user')
//     navigate("/")
//   }


//   return (
//     <div>
//       {
//         user ? <h1>Welcome {user.username}</h1> : <h1>Please Login</h1>
//       }
//       <button onClick={logout} >Logout</button>
//     </div>
//   )
// }

// export default MainPage
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { CounterContext } from '../../context/CounterContext';
import { useNavigate } from 'react-router-dom';
import './MainPage.css'
import EmailButton from '../Email';

function MainPage() {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [companies, setCompanies] = useState([]);

  const { user } = useContext(CounterContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await axios.get('http://localhost:3000/gencompany/companies');
        console.log(response.data);
        setCompanies(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCompanies();
  }, []);

  const handleSort = (domain) => {
    setSelectedDomain(domain);
  };

  const filteredCompanies = selectedDomain
    ? companies.filter(company => company.domain.includes(selectedDomain))
    : companies;

  return (
    <div>
      {
        user ? (
          <div>
            <nav className=' pt-5'>
            <img  className="w-[200px] mx-auto" src="http://jaldhaara.org/wp-content/uploads/2022/04/jaldhaara-logo.png"  alt="Logo" />
            </nav>
          <div className="main min-h-screen flex flex-col items-center justify-center p-4">

            {/* Logo at the top left */}
            
      
            <h1 className="text-center mb-4 text-2xl font-bold mt-2" style={{ color: '#fb5019' }}>DONOR LEADS</h1>
            <div className="w-full max-w-4xl">
              <div className="mb-4 text-center">
                <button
                  className={`btn m-2 ${selectedDomain === 'Water' ? 'btn-light' : 'btn-outline-dark'}`}
                  onClick={() => handleSort('Water')}
                >
                  Water
                </button>
                <button
                  className={`btn m-2 ${selectedDomain === 'Sanitation' ? 'btn-warning' : 'btn-outline-warning'}`}
                  onClick={() => handleSort('Sanitation')}
                >
                  Sanitation
                </button>
                <button
                  className={`btn m-2 ${selectedDomain === 'Hygiene' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => handleSort('Hygiene')}
                >
                  Hygiene
                </button>
                <button
                  className={`btn m-2 ${selectedDomain === '' ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => handleSort('')}
                >
                  All
                </button>
              </div>
              <div className="overflow-x-auto mb-8 rounded-4">
                <table className="min-w-full border border-gray-300 rounded-lg shadow-lg m-auto">
                  <thead className=''>
                    <tr className="bg-dark text-white border-b rounded-t-lg">
                      <th className="py-2 px-4 text-left font-semibold">Company Name</th>
                      <th className="py-2 px-4 text-left font-semibold">CSR Spent in Dollars</th>
                      <th className="py-2 px-4 text-left font-semibold">Geography</th>
                      <th className="py-2 px-4 text-left font-semibold">Email</th>
                    </tr>
                  </thead>
                  <tbody  >
                    {filteredCompanies.map((company, index) => (
                      <tr key={index} className="custom-row">
                        <td className="py-2 px-4 border-b">{company.companyname}</td>
                        <td className="py-2 px-4 border-b">${company.csrspent}</td>
                        <td className="py-2 px-4 border-b">{company.geography}</td>
                        <td className="py-2 px-4 border-b text-center">
                        <EmailButton></EmailButton>
                            {/* <i className="fas fa-envelope"></i> */}
                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
            </div>
          </div> 
          </div>
        ) : (
          <div className='m-auto flex items-center justify-center min-h-screen'>
            <div>
              <h5>Unauthorized access, Please login</h5>
              <button className='d-block m-auto btn' onClick={() => navigate('/login')} style={{ backgroundColor: "#FC6D3F" }}>Login</button>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default MainPage;
