import { Link, Navigate, useOutlet } from "react-router-dom";
const DropDownMenuNavBooks = ({styles,styles1}) => {

    return(
        <div className={styles1}>
             <Link className={styles} to={"/books"} profile>Books</Link>
             <Link className={styles} to={"/authors"} profile>Authors</Link>
             <Link className={styles} to={"/genres"} profile>Genres</Link>
             <Link className={styles} to={"/publishers"} profile>Publishers</Link>
                        
        </div>
    )

}

export default DropDownMenuNavBooks;