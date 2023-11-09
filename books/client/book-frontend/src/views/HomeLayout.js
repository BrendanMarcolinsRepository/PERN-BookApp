import { Navigate, Outlet, Link } from "react-router-dom";
import {useAuth} from "../Auth/authprovider"
import styles from '../views/HomeLayout.module.css'
import { useState } from "react";
const HomeLayout = () => {

    const { user } = useAuth();

    const [register, setUpRegister] = useState(false) 

    if(user){
        return <Navigate to="/dashboard/" />;
    }

    const registerHandler = () => {
        setUpRegister(prevState => !prevState)

        console.log(`${register} registered`)
    }

    return (

        <>
            <header>
                <h2>Book-Keeper</h2>
                <nav>
                    <ul>
                        {
                            !register && <li>
                                Don't Have An Account? - <Link className={styles.links} onClick={registerHandler} to = {"/register"}>Register Here!</Link>
                            </li>
                        }

                        {
                            register && <li>
                                Have An Account? - <Link className={styles.links} onClick={registerHandler} to = {"/"}>Login Here!</Link>
                            </li>
                        }
                    </ul>
                </nav>
            </header>

            <Outlet></Outlet>
        </>

    )

}

export default HomeLayout;