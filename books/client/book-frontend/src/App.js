
import { Route, createBrowserRouter,createRoutesFromElements, defer } from "react-router-dom";
import './App.css';
import AuthLayout  from "./views/AuthLayout";
import HomeLayout from "./views/HomeLayout";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import HomePage from "./views/HomePage";
import ProtectedLayout from "./views/ProtectedLayout";
import ProfilePage from "./views/ProfilePage";
import SettingsPage from "./views/SettingsPage";


const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {

      console.log("here 22223")
      const user = window.localStorage.getItem("user");
      resolve(user);
    }, 3000)
  );



const router = createBrowserRouter(


  createRoutesFromElements(
    <>
      <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
        

          <Route element={<HomeLayout />}>
                  <Route path = "/" element={<LoginPage />} />
                  <Route path = "/register" element={<RegisterPage />} />
          </Route>

          <Route path="/dashboard" element={<ProtectedLayout />}>
              <Route path ="home" element={<HomePage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
          </Route>
      </Route>
      
    </>
  )
)

export default router;
