import { Link, Navigate, useOutlet } from "react-router-dom";
import {useAuth} from '../Auth/authprovider'

const ProtectedLayout = () => {

    const {user} = useAuth();
    const outlet = useOutlet();

    if(!user){
        return <Navigate to={"/login"} />;
    }

    return (
        <div>
            <header>
                <nav>
                    <Link to={"/home"} Home></Link>
                    <Link to={"/profile"} Profile></Link>
                    <Link to={"/setting"} Settings></Link>
                </nav>
            </header>

            {outlet}

        </div>
    )
}

export default ProtectedLayout