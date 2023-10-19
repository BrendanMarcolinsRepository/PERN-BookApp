import { Navigate, Outlet, Link } from "react-router-dom";
import {useAuth} from "../Auth/authprovider"

const HomeLayout = () => {

    const { user } = useAuth();

    if(user){
        return <Navigate to="/dashboard/" />;
    }

    return (

        <div>
            <header>
                <nav>
                    <Link to = {"/register"}>Register</Link>
                </nav>
            </header>

            <Outlet></Outlet>
        </div>

    )

}

export default HomeLayout;