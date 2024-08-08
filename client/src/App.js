import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomeScreen } from './screens/HomeScreen'
import { ContactScreen } from './screens/ContactScreen'
import { DocsScreen } from './screens/DocsScreen'
import { ValidateEmailScreen } from './screens/ValidateEmailScreen'
import { EnterPasswordScreen } from './screens/EnterPasswordScreen'
import { useSelector } from 'react-redux'
import { Logout } from './components/Logout'
import { OTPScreen } from './screens/OTPScreen'
import './App.css';

function App() {

  const loginUser = useSelector(state => state.loginUser);
  const { userInfo } = loginUser

  return (
    <Router>
      <Header/>
      <Container style={{ width:"100%" }} className='mx-auto pt-3 mt-0 mb-2'>
        <Routes>
          <Route path="/validate/register" element={<ValidateEmailScreen/>} exact />
          <Route path="/validate/login" element={<ValidateEmailScreen/>} exact />
          <Route path="/enterPassword/register/:email/:id/:name" element={<EnterPasswordScreen/>} exact />
          <Route path="/enterPassword/login/:email/:id" element={<EnterPasswordScreen/>} exact />
          <Route path="/recovery/reset/:email/:id" element={<EnterPasswordScreen/>} exact />
          <Route path="/contact" element={<ContactScreen/>} exact />
          <Route path="/enterotp" element={<OTPScreen/>} exact />
          <Route path="/docs" element={<DocsScreen/>} exact />
          <Route path="/" element={<HomeScreen/>} exact />
        </Routes>
        {userInfo && <Logout/>}
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;