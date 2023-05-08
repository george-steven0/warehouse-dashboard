import classes from './statisCard.module.scss'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

const StatisCard = (props) => {
    return ( 
        <>
            <div className={classes.cardWrapper}>
                <p>
                    {props.arrow === "down" ? 
                    <span className={classes.down}>
                        <span><FontAwesomeIcon icon={faArrowDown} /></span>
                        <span>{props.percent}%</span>
                    </span> : props.arrow === "up" ?

                    <span className={classes.up}>
                        <span className={classes.up}><FontAwesomeIcon icon={faArrowUp} /></span>
                        <span>{props.percent}%</span>
                    </span> : null

                }
                    
                </p>

                <p>
                    <span>{props.icon}</span>
                    <span>{props.title}</span>
                    <span>{props.count}</span>
                </p>
            </div>
        </>
    );
} 
export default StatisCard;