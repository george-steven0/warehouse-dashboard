import classes from '../Review/review.module.scss'
import { BiFilterAlt } from 'react-icons/bi';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { customer } from '../../Redux/Slices/DashboardSlice/Seller/customerSlice';


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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const CustomerReview = () => {

    const state = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(customer())

    }, [])

    console.log(state);
    const percentage = 48;

    return ( 
        <>
            <article className={classes.customersWrapper}>
                <section className={classes.customersTitle} style={{textAlign : "center",justifyContent : "center", marginBottom : "20px"}}>
                    <h3>Customers</h3>

                    
                </section>

                <section className={classes.customerChart} style={{ width: 200, height: 200 }}>
                    {/* <CircularProgressbar value={state.customer.data.data && state.customer.data.data.total_buyers} text={`${state.customer.data.data && state.customer.data.data.total_buyers}%`} className={classes.customerProgress} */}
                    <CircularProgressbar value={70} text={`${70}%`} className={classes.customerProgress}
                        styles={{
                            // Customize the root svg element
                            root: {},
                            // Customize the path, i.e. the "completed progress"
                            path: {
                              // Path color
                                stroke: `rgba(16, 178, 89, ${70 / 100})`,
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
                    <p>Customer Reviews</p>
                    <span>
                        only {30}% of buyers leave a review on your profile
                    </span>
                </section>
            </article>
        </>
    );
}

export default CustomerReview;