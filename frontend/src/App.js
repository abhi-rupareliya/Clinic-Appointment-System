import "./App.css";
import Login from "./Components/Login";
import UserHome from "./Components/Pages/UserHome";
import Home from "./Components/Pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Appointment from "./Components/Appointment";
import SignUp from "./Components/SignUp";
import AddPatient from "./Components/AddPatient";
import Forget from "./Components/Forget";
import OTP from "./Components/OTP";
import { useEffect } from "react";
import { useUser } from "../src/Contexts/UserContext";
import axios from "axios";
import Treatment from "./Components/Treatment";
import Patients from "./Components/Patients";
import Appointments from "./Components/Appointments";
import PreviousRecord from "./Components/PreviousRecord";

function App() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = process.env.REACT_APP_API;

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get("/user/verify");
        setUser({
          _id: response.data._id,
          email: response.data.email,
          role: response.data.role,
        });
      } catch (error) {
        navigate("/login");
      }
    };
    verifyUser();
    console.warn(user);
  }, []);

  return (
    <>
      <Routes>
        {user ? (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/user/home' element={<UserHome />} />
            <Route path='/home' element={<Home />} />
            <Route path='/appointment' element={<Appointment />} />
            <Route path='/patients' element={<Patients />} />
            <Route path='/record' element={<PreviousRecord />} />
            <Route path='/add-patient' element={<AddPatient />} />
            <Route path='/appointments' element={<Appointments />} />
            <Route path='/treatment/:id' element={<Treatment />} />
          </>
        ) : (
          <></>
        )}
        <Route path='/login' element={<Login />} />
        <Route path='/add-user' element={<SignUp />} />
        <Route path='/forget' element={<Forget />} />
        <Route path='/forget/OTP' element={<OTP />} />
      </Routes>
    </>
  );
}

export default App;
