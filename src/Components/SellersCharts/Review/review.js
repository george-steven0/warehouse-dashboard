import classes from './review.module.scss'
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
import { Bar, Line } from 'react-chartjs-2';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { review } from '../../Redux/Slices/DashboardSlice/Seller/reviewSlice';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Review = () => {

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
        
    function formatDate(date) {
        return (
            [
                date.getFullYear(),
                padTo2Digits(date.getMonth() + 1),
                padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
                padTo2Digits(date.getHours()),
                padTo2Digits(date.getMinutes()),
                padTo2Digits(date.getSeconds()),
            ].join(':')
        );
    }
        
     // Current Date

    const currentDate = formatDate(new Date())

    // this week
    const currWeek = new Date(); // get current date
    const first = currWeek.getDate() - 6; // First day is the day of the month - the day of the week

    const firstDayw = formatDate(new Date(currWeek.setDate(first)));

    //last two week
    const lastTwoWeek = formatDate(new Date(Date.now() - 12096e5))

    // this month
    
    const date = new Date();

    const firstDaym = formatDate(new Date(date.getFullYear(), date.getMonth(), 1));

    // last two month
    const lastTwoMonth = formatDate(new Date(date.getFullYear(), date.getMonth() - 2, new Date().getDate()))

    // last three month
    const lastThreeMonth = formatDate(new Date(date.getFullYear(), date.getMonth() - 3, new Date().getDate()))

    
    const [currDate, setcurrDate] = useState({
        end_date : currentDate,
        start_date : firstDayw
    })

    const currentDateHandler = (e)=>{

        if(e.target.value === 'week1'){
            setcurrDate({
            "end_date" : currentDate,
            "start_date" : firstDayw
            })
        } else if(e.target.value === 'week2'){
            setcurrDate({
            "end_date" : currentDate,
            "start_date" : lastTwoWeek
            })
        } else if(e.target.value === 'month1'){
            setcurrDate({
            "end_date" : currentDate,
            "start_date" : firstDaym
            })
        } else if(e.target.value === 'month2'){
            setcurrDate({
            "end_date" : currentDate,
            "start_date" : lastTwoMonth
            })
        } else if(e.target.value === 'month3'){
            setcurrDate({
            "end_date" : currentDate,
            "start_date" : lastThreeMonth
            })
        }
    }

    const state = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(review(currDate))

    }, [currDate])


    const splitDate = (date)=>{
        const dateArr =  date.split(' ')[0].split('-')
        const month = dateArr[1]
        const day = dateArr[2]
        const dayMonth = [month,day].join('/')
        return dayMonth
    }

    // const sumSameVal = (review)=> {
    //     let arr = []
    //     let unique = []
    //     review&&review.map((item, index)=> {

    //         review.map((item1, index1) => {
    //         // console.log(index, item, index1, item1)
    //         let total = 0
    //         splitDate(item.date) === splitDate(item1.date) && index !== index1 ?  total= item.total+item1.total : console.log(null)
    //             total !== 0 && arr.push({total : total,date:splitDate(item.create_at)})
    //             unique = [...new Map( arr.map(item=>[item["date"],item.total] )).values()]
    //     })
    // })

    //     return  unique
    // }
    //Labels

    const labels = [] 
    const dataSet = [] 

    // const reviewLabelList = state.review.data.results && state.review.data.results.map((item,index)=>{
    //     return(
    //         <>
    //             {labels.push(splitDate(item.date))}
                
    //         </>

    //     )
    // })

    // const reviewDataSet = state.review.data.results && state.review.data.results.map((item,index)=>{
    //     return(
    //         <>
    //             {dataSet.push(item.count)}
                
    //         </>

    //     )
    // })

    // const uniqueLabels = Array.from(new Set(labels));

    const options = {
        indexAxis: 'x',
        elements: {
            bar: {
            borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
            position: 'bottom',
            },
            title: {
            display: false,
            text: 'Chart.js Horizontal Bar Chart',
            },
        },
        };

    const data = {
        // labels,
        labels : ['jan','feb','mar','apri'],
        datasets: [
            {
            label: 'Monthly',
            // data: dataSet,
            data: [10,25,55,30],
            borderColor: '#2A85FF',
            backgroundColor: '#2A85FF',
            }
        ],
        };


    return ( 
        <>
            <article className={classes.customersWrapper}>
                <section className={classes.customersTitle}>
                    <h4>Review</h4>

                    <div className={classes.filterWrapper}>
                        <select name="" id="" onChange={(e)=>currentDateHandler(e)}>
                            <option selected disabled>Choose Date</option>
                            <option value="week1">Last Week</option>
                            <option value="week2">Last Two Week</option>
                            <option value="month1">This Month</option>
                            <option value="month2">Last Two Month</option>
                            <option value="month3">Last Three Month</option>
                        </select>
                    </div>
                </section>

                <section className={classes.customerChart}>
                    <Line options={options} data={data} />
                </section>
            </article>
        </>
    );
}

export default Review;