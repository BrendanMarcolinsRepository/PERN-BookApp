import { Link, Navigate, useOutlet } from "react-router-dom";
import {useAuth} from '../Auth/authprovider'

const ProtectedLayout = () => {

    const {user} = useAuth();
    const outlet = useOutlet();

    if(!user){
        return <Navigate to={"/"} />;
    }

    return (
        <div>
            <header>
                <nav>
                    <Link to={"/home"} home></Link>
                    <Link to={"/profile"} profile></Link>
                    <Link to={"/setting"} settings></Link>
                </nav>
            </header>

            {outlet}

        </div>
    )
}

export default ProtectedLayout