import {react, useEffect, useState} from 'react';
import {useAuth} from '../Auth/authprovider'
import { request, setAuthHeader } from "../axios_helper/axios"
import styles from '../views/HomePage.module.css'
import buttonStyles from '../components/BookListButton.module.css'
import BookListButton from '../components/BookListButton';

const HomePage = () => {

    const { user } = useAuth();

    const [userData, setUserData] = useState(null)

    useEffect(() => {

        const userDetails = async () => {

            //const response = await request("GET",'/https://localhost:7158/api/User/',user.id)

            const uri = `https://localhost:7158/api/User/${user.id}`


            const response = await fetch(uri,{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                
            })

            if(response.ok){
                const userInfo = await response.json();
                setUserData(userInfo)
                
            }

            if(!response.ok){
                //setAuthHeader(null);
                console.log("response error");
                
            }


        }
        console.log("start")
         userDetails();

         console.log("donne")
    }, [])

    const list = userData != null  &&  
            userData.books.map((content, index) =>  (
              <>
                <li key = {index} className={styles.bookContainer}>
                    
                    <div>
                        <img src='https://m.media-amazon.com/images/I/91XrTM0aCML._AC_UF894,1000_QL80_.jpg' alt = {content.name} width="220" height="270"/>
                    </div>
                    
                    <div>
                        <h3>{content.name}</h3>
                        <h4>By {content.author.name}</h4>
                        <h5>Published by {content.publisher.name}</h5>
                        
                    </div>
                    <div  className={styles.bookButton}>
                        <BookListButton 
                            styles = {buttonStyles.editButton}
                            name = {"edit"}
                        
                        />
                        <BookListButton 
                            styles = {buttonStyles.removeButton}
                            name = {"remove"}
                        />
                    </div>
                    
                   
                </li>
                
               
              </>
            ))

    const tableBodyNullContent  =  (

        <tr>
            <td>Such empty</td>
        </tr>
    )

    return(
        <main>
            <div>
                <div>
                    <h1>Your Book Shelf</h1>
                </div>
                <ul>
                    {list}
                </ul>
            </div>
            
        </main>
    )
};

export default HomePage;