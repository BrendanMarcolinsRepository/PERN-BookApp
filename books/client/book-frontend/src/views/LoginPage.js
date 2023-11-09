import styles from '../views/login.module.css'
import { useState } from "react";
import { request, setAuthHeader } from "../axios_helper/axios"
import {useAuth} from '../Auth/authprovider'




const Login = () => {

    const isStrongUsername = /^[0-9A-Za-z]{1,16}$/;
    const isStrongPassword = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorLogin, setErrorLogin] = useState(false)

    const { login } = useAuth();


    const errorHandler = () => {
        if(errorLogin) {
            setErrorLogin(false);
        }

    }

    const emailHandler = (event) => {

        errorHandler()
        
        console.log(event.target.value);
        setEmail(event.target.value);
    }

    const passwordHandler = (event) => {

        errorHandler()

        setPassword(event.target.value);
    }

    const  loginHandler = async (event) => {

        event.preventDefault();

        const isValidUsername = isStrongUsername.test(email)
        const isValidPassword = isStrongPassword.test(password)

        console.log(`${isValidUsername}  result`)
        console.log(`${isValidPassword}  result`)

        if( isValidPassword){
            const result = await sendData();

            console.log(`${result} result`)

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

    //const response = await request("POST","/api/Login", {email, password})

    console.log("response awaits");

       const response = await fetch('https://localhost:7158/Login',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body:JSON.stringify({
                    username: email,
                    password: password
                })
        })

        console.log("response finished");


       if(response.ok){
            const user = await response.json();

           console.log(`here right now ${user}`);
           setAuthHeader(user.jwtToken)
           return user;
          
       }

       if(!response.ok){
           //setAuthHeader(null);
           console.log("response error");
           return false;
       }

       

      
       
   }

    const errorInformationHandler = (<h3>Please Enter the correct username and password!</h3>)


    return(
        <div>
            <main>

                <div className={styles.divpagetitle}>
                    <h1>Login</h1>
                    
                </div>

                <form onSubmit={loginHandler}>
                    <div className={styles.form_div}>

                       
                        <input 
                            type="text"
                            id = 'email'
                            name = 'email'
                            required onChange={emailHandler}
                            placeholder="Email..."
                          

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
                            name = 'submit'
                        />

                        {errorLogin && errorInformationHandler}

                    </div>
                </form>
            </main>
        </div>
    )

}

export default Login;