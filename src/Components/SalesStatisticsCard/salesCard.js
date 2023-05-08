import classes from './salesCard.module.scss'
import user from '../../assets/imgs/user.png'
import { AiOutlineRise } from 'react-icons/ai';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {MdShowChart} from 'react-icons/md'

const SalesCard = (props) => {
    return ( 
        <>
            <article className={classes.salesCardWrapper}>
                <div className={classes.cardContainer}>
                    <section className={classes.leftSide}>
                        <div className={classes.leftSideContent}>
                            <div className={classes.leftIcon}>
                                <MdShowChart />
                            </div>

                            <div className={classes.cardInfo}>
                                <p>{props.title}</p>
                                <p>{props.count}</p>
                            </div>
                        </div>
                    </section>

                    <section className={classes.rightSide}>
                        <div className={classes.rightSideContent}>
                            <div className={classes.icon}>
                                <AiOutlineRise />
                            </div>

                            <div className={classes.cardPercent}>
                                <p>
                                    {/* <span> <FontAwesomeIcon icon={props.icon === "up" ? faArrowUp : faArrowDown} />{props.percent}%</span>this week */}

                                    {props.icon === "down" ? 
                                        <span className={classes.down}>
                                            <span><FontAwesomeIcon icon={faArrowDown} /></span>
                                            <span>{props.percent}%</span>
                                        </span> : props.icon === "up" ?

                                        <span className={classes.up}>
                                            <span className={classes.up}><FontAwesomeIcon icon={faArrowUp} /></span>
                                            <span>{props.percent}%</span>
                                        </span> : null

                                    }
                                    this week
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </article>
        </>
    );
}

export default SalesCard;