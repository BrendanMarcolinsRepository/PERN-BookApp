const BookListButton = ({styles, name}) => {

    return (
        <>
            <button 
                className={styles}
            >
                {name}
            </button>
        </>   
    );

}

export default BookListButton;