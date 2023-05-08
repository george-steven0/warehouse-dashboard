import classes from './topLeft.module.scss'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { today } from '../../Redux/Slices/DashboardSlice/Home/todaySlice';
import { useState } from 'react';
import { paidvsunpaid } from '../../Redux/Slices/DashboardSlice/Home/paidvsunpaidOrderSlice';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const TopLeftChart = () => {

    const state = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(today())
    }, [])
    

    const splitDate = (date)=>{
        const dateArr =  date.split(' ')[0].split('-')
        const month = dateArr[1]
        const day = dateArr[2]
        const dayMonth = [month,day].join('/')
        return dayMonth
    }

    const options = {
        maintainAspectRatio : true,
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
            },
            
        },
        };



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
    //Labels

    const labels = [];
    const unPaidDataSet= sumSameVal(state.paidvsunpaid.data.data && state.paidvsunpaid.data.data.unpaid_orders)
    
    const unPaidLabelList = state.paidvsunpaid.data.data && state.paidvsunpaid.data.data.unpaid_orders.map((item,index)=>{
        return(
            <>
                {labels.push(splitDate(item.create_at))}
                
            </>

        )
    })

    const paidDataSet = sumSameVal(state.paidvsunpaid.data.data && state.paidvsunpaid.data.data.pain_orders)

    const PaidLabelList = state.paidvsunpaid.data.data && state.paidvsunpaid.data.data.pain_orders.map(item=>{
        return(
            <>
                {labels.push(splitDate(item.create_at))}
                {paidDataSet.push(item.total)}
            </>

        )
    })

    const uniqueLabels = Array.from(new Set(labels));



    const data = {
        labels : uniqueLabels,
        datasets: [
            {
            label: 'Paid',
            data: paidDataSet,
            borderColor: '#2A85FF',
            backgroundColor: '#2A85FF',
            yAxisID: 'y',
            },
            {
            label: 'Un-Paid',
            data: unPaidDataSet,
            borderColor: '#FDDCCA',
            backgroundColor: '#FDDCCA',
            yAxisID: 'y1',
            },
        ],
        };

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

    useEffect(() => {
        dispatch(paidvsunpaid(currDate))
    }, [currDate])

    // console.log(state);
            
    return ( 
        <>  
            <article className={classes.topLeftChartWrapper}>

                <section className={classes.overViewWrapper}>
                    <div className={classes.overViewCard}>
                        <p>{state.today.todayData.data && state.today.todayData.data.products}</p>
                        <p>Products available</p>
                    </div>

                    <div className={classes.overViewCard}>
                        <p>{state.today.todayData.data && state.today.todayData.data.sales}</p>
                        <p>Products delivery</p>
                    </div>

                    <div className={classes.overViewCard}>
                        <p>{state.today.todayData.data && state.today.todayData.data.customers}</p>
                        <p>new customers</p>
                    </div>

                    <div className={classes.overViewCard}>
                        <p>{state.today.todayData.data && state.today.todayData.data.sellers}</p>
                        <p>new sellers</p>
                    </div>
                </section>

                <section className={classes.reportChart}>
                    <div className={classes.reportTitle}>
                        <h3>Reports</h3>

                        <div>
                            <select name="" id="" onChange={(e)=>currentDateHandler(e)}>
                                <option selected disabled>Choose Date</option>
                                <option value="week1">Last Week</option>
                                <option value="week2">Last Two Week</option>
                                <option value="month1">This Month</option>
                                <option value="month2">Last Two Month</option>
                                <option value="month3">Last Three Month</option>
                            </select>
                        </div>
                    </div>

                    <div className={classes.reportChartWrapper}>
                        <Line options={options} data={data} />
                    </div>
                </section>
            </article>
        </>
    );
}

export default TopLeftChart;