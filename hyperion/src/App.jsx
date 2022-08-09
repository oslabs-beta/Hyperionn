// import './app.scss';
// import React from 'react'
// import MainDisplay from './Containers/MainDisplay.jsx'
// import Login from './Login';
      
// function App() {
//   return (
//     <div className="MainDisplay">
//       <Login/>
//     </div>
//   );
// }

// export default App;

import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Dashboard from "./Dashboard"
import MainDisplay from './Containers/MainDisplay';
import Login from './Login'
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
// import UpdateProfile from "./UpdateProfile"

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
            {/* <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<MainDisplay/>}/>
          </Route> */}
          <Route path ='/' element={<MainDisplay/>}/>
              {/* <Route exact path="/" element={<PrivateRoute/>}>
                <Route exact path = '/' element = {<MainDisplay/>}/>
              </Route> */}
              {/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
              <Route path="/signup" element={<Signup/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
            </Routes>
          </AuthProvider>
        </Router>
       </div>
     </Container>
  )
}

export default App;


// {/* <NavBar />
//       {/* <NavBar></NavBar> */}
//         <Routes>
//           <Route path='/Feed' element={<ProtectedRoute>< Feed statusStack={statusStack} setStatusStack={setStatusStack}/></ProtectedRoute>} />
//           <Route path='/addhike' element={<ProtectedRoute>< AddHikeScreen /></ProtectedRoute>} />
//           <Route path='/signup' element={< SignupScreen />} />  
//           <Route path='/login' element={< LoginScreen />} />   
//           {/* <Route path='/edithike' element={<EditHikeScreen/>} />              */}
//                                   {/* ProtectedRoute(<DashboardScreen/>) */}
//           <Route path='/' element={<ProtectedRoute>< DashboardScreen /></ProtectedRoute>} />            
//         </Routes>    
//       </Router>
//     </div>
//   );
// }

// export function ProtectedRoute(props){
//   if (localStorage.getItem('user')){ 
//     return props.children
//   } else {
//    return <Navigate to='/login'/>
//   }
// } */}
