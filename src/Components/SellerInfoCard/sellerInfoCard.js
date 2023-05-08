import { AiFillStar } from 'react-icons/ai';
import classes from './sellerInfoCard.module.scss'

const SellerInfoCard = (props) => {

    
    return ( 
        <>
            <article className={classes.sellCardWrapper}>
                <section>
                    {props.name}
                </section>

                <section>
                    {props.name === "review" && props.value ? 
                        [...Array(Math.round(props.value))].map((el, index) => <span key={index} className={classes.reviewStar}> <AiFillStar /> </span>)
                    : props.value}
                </section>

                
                
            </article>
        </>
    );
}

export default SellerInfoCard;