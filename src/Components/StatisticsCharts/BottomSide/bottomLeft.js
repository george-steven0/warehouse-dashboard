import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { newReturnedBuyer } from '../../Redux/Slices/DashboardSlice/Home/newReturnedBuyerSlice';
import { categoryPercent } from '../../Redux/Slices/DashboardSlice/Home/totalProductCategoryPercentSlice';
import classes from './bottomLeft.module.scss'

ChartJS.register(ArcElement, Tooltip, Legend);


const BottomLeft = () => {

    const state = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(categoryPercent())
        dispatch(newReturnedBuyer())
    }, [])


    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'bottom',
            },
            title: {
            display: true,
            text: 'Total Categories',
            },
        },
    };

    const data = {
        labels: ['All Categories', 'Used Categories'],
        datasets: [
            {
            label: '# of Categories',
            data: [state.categoryPercent.data && state.categoryPercent.data.all_categories,
                    state.categoryPercent.data && state.categoryPercent.data.used_categories],
            backgroundColor: [
                '#2A85FF',
                '#FFBC99'
            ],
            borderColor: [
                'transparent',
                'transparent',
            ],
            borderWidth: 1,
            },
        ],
        };


    const options2 = {
        responsive: true,
        plugins: {
            legend: {
            position: 'bottom',
            },
            title: {
            display: true,
            text: 'Customers',
            },
        },
    };

    const data2 = {
        labels: [`All Customers`,
            `New Customer`,
            `Returning Customer`],
        datasets: [
            {
            label: '# of Votes',
            data: [state.newReturnedBuyer.data.data && state.newReturnedBuyer.data.data.all_customers,
                    state.newReturnedBuyer.data.data && state.newReturnedBuyer.data.data.new_customer,
                    state.newReturnedBuyer.data.data && state.newReturnedBuyer.data.data.returned_customer],
            backgroundColor: [
                '#FDF28B',
                '#FFBC99',
                '#0C75FF',
            ],
            borderColor: [
                'transparent',
                'transparent',
            ],
            borderWidth: 1,
            },
        ],
        };

    return ( 
        <> 
            <article className={classes.bottomChartWrapper}>
                <section className={classes.bottomLeft}>

                    <div className={classes.totalProductChart}>
                        <Doughnut data={data} options = {options} />
                    </div>

                    <div className={classes.customerChart}>
                        <Doughnut data={data2} options={options2} />
                    </div>

                </section>
            </article>
        </>
    );
}

export default BottomLeft;