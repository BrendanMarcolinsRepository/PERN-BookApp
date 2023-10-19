import styles from '../views/login.module.css'
import { useState } from "react";
import { request, setAuthHeader } from "../axios_helper/axios"
import {useAuth} from '../Auth/authprovider'



const Login = () => {

    const isStrongUsername = /^[0-9A-Za-z]{6,16}$/;

    const isStrongPassword = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/;

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorLogin, setErrorLogin] = useState(false)

    const { login } = useAuth();


    const errorHandler = () => {
        if(errorLogin) {
            setErrorLogin(false);
        }

    }

    const usernameHandler = (event) => {

        errorHandler()
        
        console.log(event.target.value);
        setUsername(event.target.value);
    }

    const passwordHandler = (event) => {

        errorHandler()

        setPassword(event.target.value);
    }

    const loginHandler = (event) => {

        event.preventDefault();

        const isValidUsername = isStrongUsername.test(username)
        const isValidPassword = isStrongPassword.test(password)

        console.log(`${isValidUsername}  result`)
        console.log(`${isValidPassword}  result`)

        if(isValidUsername && isValidPassword){
            console.log("ready");
            const result = sendData();

            if(result){
                login(result)
            }else{
                setErrorLogin(true);
            }



        }else{
            setErrorLogin(true);
            console.log("not ready  " + errorLogin );
        }

        
    }


    const sendData = async () => {

        const response = await request("POST","/login", {username, password})

       if(response){
           console.log(response.data)
           setAuthHeader(response.data.token)
           return response.data;
          
       }

       if(!response){
           setAuthHeader(null);
           return false;
       }

       

      
       
   }

    const errorInformationHandler = (<h3>Please Enter the correct username and password!</h3>)


    return(
        <div>
            <main>

                <div className={styles.divappname}>
                    <h1>Bookkeeper</h1>
                    
                </div>


                <div className={styles.divtitle}>
                    <h1 >Login</h1>
                    <h2>No account? Register Here</h2>
                </div>

                <form onSubmit={loginHandler}>
                    <div className={styles.form_div}>

                       
                        <input 
                            type="text"
                            id = 'username'
                            name = 'username'
                            required onChange={usernameHandler}
                            placeholder="Username..."
                          

                        />

                        

                        <input 
                            type="password"
                            id = 'password'
                            name = 'password'
                            required onChange={passwordHandler}
                            placeholder="Password..."

                        />

                        <input
                            type = 'submit'
                            value = "Submit"
                        />

                        {errorLogin && errorInformationHandler}

                    </div>
                </form>
            </main>
        </div>
    )

}

export default Login;