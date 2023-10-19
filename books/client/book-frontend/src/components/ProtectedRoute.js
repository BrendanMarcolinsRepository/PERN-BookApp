import useAuth from '../Auth/authprovider'

const ProtectRoute = ({children}) => {
    const {user} = useAuth();

    if(!user){
        return <Navigate to = "/"/>
    }

    return children;
}

export default ProtectRoute;