import './app.scss';
import React from "react"
import Signup from "./Signup"
import { Container } from "@mui/material"
import { AuthProvider } from "./AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainDisplay from './Containers/MainDisplay';
import Login from './Login';
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import ErrorLogDisplay from './Containers/ErrorLogDisplay';

function App() {
  return (
    <Container className="main-app" style={{ minHeight: "100vh", minWidth:"100vw" }}>
        <Router>
          <AuthProvider>
            <Routes>
            {/* <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<MainDisplay/>}/>
          </Route> */}
              <Route path ='/errorlogs' element={<ErrorLogDisplay/>}/>
              <Route path ='/dashboard' element={<MainDisplay/>}/>
              {/* <Route exact path="/" element={<PrivateRoute/>}>
                <Route exact path = '/' element = {<MainDisplay/>}/>
              </Route> */}
              {/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
              <Route path="/signup" element={<Signup/>} />
              <Route path="/" element={<Login/>} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
            </Routes>
          </AuthProvider>
        </Router>
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
