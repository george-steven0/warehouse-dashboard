import classes from '../Review/review.module.scss'
import { BiFilterAlt } from 'react-icons/bi';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { failedOrder } from '../../Redux/Slices/DashboardSlice/Seller/failedOrderSlice';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const FailedSellChart = () => {

    const state = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(failedOrder())

    }, [])


    const percentage = 30;

    return ( 
        <>
            <article className={classes.customersWrapper}>
                <section className={classes.customersTitle} style={{textAlign : "center",justifyContent : "center", marginBottom : "20px"}}>
                    <h3>Sellers</h3>

                    
                </section>

                <section className={classes.customerChart} style={{ width: 200, height: 200, margin : "auto" }}>

                    {/* <CircularProgressbar value={state.failedOrder.data.data && state.failedOrder.data.data.total_orders} text={`${state.failedOrder.data.data && state.failedOrder.data.data.total_orders}%`} className={classes.customerProgress} */}
                    <CircularProgressbar value={30} text={`${30}%`} className={classes.customerProgress}
                        styles={{
                            // Customize the root svg element
                            root: {},
                            // Customize the path, i.e. the "completed progress"
                            path: {
                              // Path color
                                stroke: `rgba(255, 0, 0, ${30 / 100})`,
                            },
                            // Customize the circle behind the path, i.e. the "total progress"
                            trail: {
                                // Trail color
                                stroke: '#d6d6d6',
                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'butt',
                                // Rotate the trail
                                transform: 'rotate(0.25turn)',
                                transformOrigin: 'center center',
                            },
                            // Customize the text
                            text: {
                              // Text color
                                fill: '#000',
                                // Text size
                                fontSize: '16px',
                            }
                        }}
                    />

                    <p>Failed Sell</p>
                    <span>
                        {/* only {state.failedOrder.data.data && state.failedOrder.data.data.failed_orders}% of sellers failed to sell */}
                        only {70}% of sellers failed to sell
                    </span>
                </section>
            </article>
        </>
    );
}

export default FailedSellChart;