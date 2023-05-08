import classes from './topSelling.module.scss'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TopSelling = () => {
    return ( 
        <>
            <article className={classes.topSellingWrapper}>
                <section className={classes.title}>
                    <h3>top selling</h3>

                    <div>
                        <select name="" id="">
                            <option value="">this week</option>
                            <option value="">1</option>
                            <option value="">2</option>
                        </select>
                    </div>
                </section>

                <section className={classes.topSellingTable}>
                    <div className={classes.latestTableTitle}>
                        <p>Week</p>
                        <p>Products</p>
                        <p>Brands</p>
                        <p>Discount Codes</p>
                    </div>

                    <div className={classes.tableContent}>
                        <div className={classes.tableCard}>

                        <div>
                            <p>25 sep - 1 oct</p>
                        </div>

                        <div>
                            <p>
                                <span className={classes.numSpan}>8</span>
                                <span className={classes.numPercent}><FontAwesomeIcon icon={faArrowUp} /> 37%  </span>
                            </p>
                        </div>

                        <div>
                            <p>
                                <span className={classes.numSpan}>8</span>
                                <span className={classes.numPercent}><FontAwesomeIcon icon={faArrowUp} /> 37%  </span>
                            </p>
                        </div>

                        <div>
                            <p>
                                <span className={classes.numSpan}>8</span>
                                <span className={classes.numPercent}><FontAwesomeIcon icon={faArrowUp} /> 37%  </span>
                            </p>
                        </div>

                        </div>

                        <div className={classes.tableCard}>

                        <div>
                            <p>25 sep - 1 oct</p>
                        </div>

                        <div>
                            <p>
                                <span className={classes.numSpan}>8</span>
                                <span className={classes.numPercent}><FontAwesomeIcon icon={faArrowUp} /> 37%  </span>
                            </p>
                        </div>

                        <div>
                            <p>
                                <span className={classes.numSpan}>8</span>
                                <span className={classes.numPercent}><FontAwesomeIcon icon={faArrowUp} /> 37%  </span>
                            </p>
                        </div>

                        <div>
                            <p>
                                <span className={classes.numSpan}>8</span>
                                <span className={classes.numPercent}><FontAwesomeIcon icon={faArrowUp} /> 37%  </span>
                            </p>
                        </div>

                        </div>

                        <div className={classes.tableCard}>

                        <div>
                            <p>25 sep - 1 oct</p>
                        </div>

                        <div>
                            <p>
                                <span className={classes.numSpan}>8</span>
                                <span className={classes.numPercent}><FontAwesomeIcon icon={faArrowUp} /> 37%  </span>
                            </p>
                        </div>

                        <div>
                            <p>
                                <span className={classes.numSpan}>8</span>
                                <span className={classes.numPercent}><FontAwesomeIcon icon={faArrowUp} /> 37%  </span>
                            </p>
                        </div>

                        <div>
                            <p>
                                <span className={classes.numSpan}>8</span>
                                <span className={classes.numPercent}><FontAwesomeIcon icon={faArrowUp} /> 37%  </span>
                            </p>
                        </div>

                        </div>

                        <div className={classes.tableCard}>

                        <div>
                            <p>25 sep - 1 oct</p>
                        </div>

                        <div>
                            <p>
                                <span className={classes.numSpan}>8</span>
                                <span className={classes.numPercent}><FontAwesomeIcon icon={faArrowUp} /> 37%  </span>
                            </p>
                        </div>

                        <div>
                            <p>
                                <span className={classes.numSpan}>8</span>
                                <span className={classes.numPercent}><FontAwesomeIcon icon={faArrowUp} /> 37%  </span>
                            </p>
                        </div>

                        <div>
                            <p>
                                <span className={classes.numSpan}>8</span>
                                <span className={classes.numPercent}><FontAwesomeIcon icon={faArrowUp} /> 37%  </span>
                            </p>
                        </div>

                        </div>

                        <div className={classes.tableCard}>

                        <div>
                            <p>25 sep - 1 oct</p>
                        </div>

                        <div>
                            <p>
                                <span className={classes.numSpan}>8</span>
                                <span className={classes.numPercent}><FontAwesomeIcon icon={faArrowUp} /> 37%  </span>
                            </p>
                        </div>

                        <div>
                            <p>
                                <span className={classes.numSpan}>8</span>
                                <span className={classes.numPercent}><FontAwesomeIcon icon={faArrowUp} /> 37%  </span>
                            </p>
                        </div>

                        <div>
                            <p>
                                <span className={classes.numSpan}>8</span>
                                <span className={classes.numPercent}><FontAwesomeIcon icon={faArrowUp} /> 37%  </span>
                            </p>
                        </div>

                        </div>
                    </div>
                </section>
            </article>
        </>
    );
}

export default TopSelling;