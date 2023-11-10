import { Link, Navigate, useOutlet } from "react-router-dom";
import {useAuth} from '../Auth/authprovider'
import styles from '../views/ProtectedLayout.module.css'
import {react, useState} from 'react';
import DropDownMenuNavBooks from "../components/DropDownNavMenuBooks";

const ProtectedLayout = () => {

    const [isDropDownActive, setIsDropDownActive] = useState(false);
    const {user} = useAuth();
    const outlet = useOutlet();

    if(!user){
        return <Navigate to={"/"} />;
    }

    const dropDownNavMenuHandler = () => {
        setIsDropDownActive(prevState => !prevState)
    }

    return (
        <div className={styles.navContainer}>
            <header className={styles.navHeaderContainer}> 
                <nav className={styles.navHeader}>
                    <Link className={styles.navLinks} to={"/home"} home>Home</Link>
                    <Link className={styles.navLinks} to={"/profile"} profile>Profile</Link>
                    <div

                        className={styles.navLinks}
                        onClick={dropDownNavMenuHandler}
                    >
                        Browse ▼
                        {
                            isDropDownActive && <DropDownMenuNavBooks 
                                                    styles = {styles.navLinksDropMenu}
                                                    styles1 = {styles.dropdownbooksmenu}
                                                />
                        }
                    </div>
                    
                </nav>
            </header>

            {outlet}

        </div>
    )
}

export default ProtectedLayout