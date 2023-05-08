import classes from './topRight.module.scss'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import Bottom from '../BottomSide/bottomLeft';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { newUserVsReturned } from '../../Redux/Slices/DashboardSlice/Home/newUserVsReturnedSlice';
import { useState } from 'react';
import { discountVsUnorder } from '../../Redux/Slices/DashboardSlice/Home/discountVsUnorderSlice';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const TopRightChart = () => {

    const state = useSelector(state=>state)
    const dispatch = useDispatch()


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

    const [currDate2, setcurrDate2] = useState({
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

    const currentDateHandler2 = (e)=>{

        if(e.target.value === 'week1'){
            setcurrDate2({
            "end_date" : currentDate,
            "start_date" : firstDayw
            })
        } else if(e.target.value === 'week2'){
            setcurrDate2({
            "end_date" : currentDate,
            "start_date" : lastTwoWeek
            })
        } else if(e.target.value === 'month1'){
            setcurrDate2({
            "end_date" : currentDate,
            "start_date" : firstDaym
            })
        } else if(e.target.value === 'month2'){
            setcurrDate2({
            "end_date" : currentDate,
            "start_date" : lastTwoMonth
            })
        } else if(e.target.value === 'month3'){
            setcurrDate2({
            "end_date" : currentDate,
            "start_date" : lastThreeMonth
            })
        }
    }

    // console.log()

    useEffect(() => {
        dispatch(newUserVsReturned(currDate))
        dispatch(discountVsUnorder(currDate2))
    }, [currDate || currDate2])
    


    const splitDate = (date)=>{
        const dateArr =  date.split(' ')[0].split('-')
        const month = dateArr[1]
        const day = dateArr[2]
        const dayMonth = [month,day].join('/')
        return dayMonth
    }

    const sumSameVal = (unPaid)=> {
        let arr = []
        let unique = []
        unPaid&&unPaid.map((item, index)=> {

            unPaid.map((item1, index1) => {
            // console.log(index, item, index1, item1)
            let total = 0
            splitDate(item.create_at) === splitDate(item1.create_at) && index !== index1 ?  total= item.total+item1.total : console.log(null)
                total !== 0 && arr.push({total : total,date:splitDate(item.create_at)})
                unique = [...new Map( arr.map(item=>[item["date"],item.total] )).values()]
        })
    })

        return  unique
    }


    const labels = [];

    const newUserLabelsList = state.newUserVsReturned.data.data && state.newUserVsReturned.data.data.new_users_orders.map(item=>{
        return(
            labels.push(splitDate(item.create_at))
        )
    })

    const returnUserLabelList = state.newUserVsReturned.data.data && state.newUserVsReturned.data.data.returned_users_orders.map(item=>{
        return(
            labels.push(splitDate(item.create_at))
        )
    })
    const uniqueLabels = Array.from(new Set(labels));

    //Data Set

    const newUserDataSet = sumSameVal(state.newUserVsReturned.data.data && state.newUserVsReturned.data.data.new_users_orders)

    const returnUserDataSet= sumSameVal(state.newUserVsReturned.data.data && state.newUserVsReturned.data.data.returned_users_orders)



    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
            display: false,
            text: 'Store Sales Amount',
            },
        },
        scales: {
            y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks : {
                callback: function(label, index, labels) {
                    return (label > 9999 ? (label/1000).toLocaleString("en-US", { maximumFractionDigits: 3, minimumFractionDigits: 3 })+'k' : label)
                },
                scaleLabel: {
                    display: true,
                    labelString: '1k = 1000'
                }
            }
            },
            y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
                drawOnChartArea: false,
            },
            ticks : {
                callback: function(label, index, labels) {
                    return (label > 9999 ? (label/1000).toLocaleString("en-US", { maximumFractionDigits: 3, minimumFractionDigits: 3 })+'k' : label)
                },
                scaleLabel: {
                    display: true,
                    labelString: '1k = 1000'
                }
            }
            },
            
        },
    };
    const data = {
        labels : uniqueLabels,
        datasets: [
            {
            label: 'New User',
            data: newUserDataSet,
            borderColor: '#2A85FF',
            backgroundColor: '#2A85FF',
            yAxisID: 'y',
            },
            {
            label: 'Returned User',
            data: returnUserDataSet,
            borderColor: '#FDDCCA',
            backgroundColor: '#FDDCCA',
            yAxisID: 'y1',
            },
        ],
    };



    const options2 = {
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
            text: 'Chart.js Bar Chart',
            },
        },
        };
        
    const labels2 = []
    const discountLabelList = state.discountVsUnorder.data.data && state.discountVsUnorder.data.data.discount_orders.map(item=>{
        return(
            labels2.push(splitDate(item.create_at))
        )
    })

    const nonDiscountLabel = state.discountVsUnorder.data.data && state.discountVsUnorder.data.data.non_discount_orders.map(item=>{
        return(
            labels2.push(splitDate(item.create_at))
        )
    })

    const uniqueLabels2 = Array.from(new Set(labels2));


    //Data Set

    const discountDataSet = sumSameVal(state.discountVsUnorder.data.data && state.discountVsUnorder.data.data.discount_orders)

    const nonDiscountDataSet= sumSameVal(state.discountVsUnorder.data.data && state.discountVsUnorder.data.data.non_discount_orders)

    
        const data2 = {
            labels : uniqueLabels2,
            datasets: [
                
            {
                label: 'Discount Orders',
                data: discountDataSet,
                borderColor: '#2A85FF',
                backgroundColor: '#2A85FF',
            },
            {
                label: 'Non Discount Orders',
                data: nonDiscountDataSet,
                borderColor: '#FFBC99',
                backgroundColor: '#FFBC99',
            }
            ],
        };
    

    return ( 
        <>
            <article className={classes.topRightWrapper}>
                <section className={classes.topRightChart}>
                    <div>
                        <select name="" id="" onChange={currentDateHandler}>
                            <option selected disabled>Choose Date</option>
                            <option value="week1">Last Week</option>
                            <option value="week2">Last Two Week</option>
                            <option value="month1">Last Month</option>
                            <option value="month2">Last Two Month</option>
                            <option value="month3">Last Three Month</option>
                        </select>
                    </div>
                    <Line className={classes.lineChart} options={options} data={data} />
                </section>

                <section className={classes.topRightChartv2}>
                    <div>
                        <select name="" id="" onChange={currentDateHandler2}>
                            <option selected disabled>Choose Date</option>
                            <option value="week1">Last Week</option>
                            <option value="week2">Last Two Week</option>
                            <option value="month1">Last Month</option>
                            <option value="month2">Last Two Month</option>
                            <option value="month3">Last Three Month</option>
                        </select>
                    </div>
                    <Bar className={classes.lineChart} options={options2} data={data2} />
                </section>
            </article>
        </>
    );
}

export default TopRightChart;