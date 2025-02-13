import styles from '../cssStyles/styles.module.css'
import image from '../images/kitten.jpeg'

function Home(){
    return(
        <>
            <h1 className={styles.body}> this is home </h1>
            <img src={image} alt="kitten" />
            
        </>
    )
}

export default Home;