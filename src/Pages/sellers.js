import { faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { AiOutlineLineChart } from "react-icons/ai"
import { BiCategory } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import classes from '../assets/style/sellers.module.scss'
import SideNav from "../Components/Navbar/SideNavbar/sideNav"
import TopNavbar from "../Components/Navbar/TopNavbar/topNav"
import { overView } from "../Components/Redux/Slices/DashboardSlice/Home/overViewSlice"
import CustomerReview from "../Components/SellersCharts/customerChartReview/customerChartReview"
import FailedSellChart from "../Components/SellersCharts/failedSellChart/failedSellChart"
import IncomeChart from "../Components/SellersCharts/IncomeChart/income"
import Review from "../Components/SellersCharts/Review/review"
import StatisCard from "../Components/StatisticsCard/statisCard"

const Sellers = () => {

    const [toggleNav, settoggleNav] = useState(true)


    const toggleNavHandler = ()=>{
        settoggleNav(!toggleNav)
    }

    let activeClassName = classes.activeBtn

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
        dispatch(overView(currDate))


        // dispatch(error("error"))
    }, [currDate])

    return ( 
        <>
            <article className={classes.sellersWrapper}>
                <nav className={classes.navbar}>
                    <section className={classes.topNav}>
                        <TopNavbar />
                    </section>
                </nav>

                <section className={classes.mainContentWrapper}>
                    <section className={toggleNav ? classes.sideNav : classes.sideNav + " " +classes.miniSideNav} onClick={toggleNavHandler}>
                        <SideNav />
                    </section>

                    <section className={toggleNav ? classes.mainContentContainer : classes.mainContentContainerFull + " " + classes.mainContentContainer}>
                        <div className={classes.homeSwapperBtn}>
                            <div className={classes.btnWrapper}>
                                <NavLink to="/Sellers" className={({ isActive }) => isActive ? activeClassName : undefined }>
                                    <span>General</span>
                                </NavLink>

                                <NavLink to="/SellersInfo" className={({ isActive }) => isActive ? activeClassName : undefined }>
                                    <span>Data Range</span>
                                </NavLink>
                            </div>
                        </div>

                        <div className={classes.statisticsWrapper}>
                            <div className={classes.statisTitle}>
                                <h3>Overview</h3>

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

                            <div className={classes.statisCardWrapper}>

                                <div>
                                    {/* <StatisCard icon={<FontAwesomeIcon icon={faUser} />} percent={Math.round(state.overview.data.data && state.overview.data.data.sellers.percentage)} arrow={state.overview.data.data && state.overview.data.data.sellers.percentage >=0 ? "up" : "down"} title={"total sellers"} count = {state.overview.data.data && state.overview.data.data.sellers.count}  /> */}
                                    <StatisCard icon={<FontAwesomeIcon icon={faUser} />} percent={33} count = {20} arrow={"down"} title={"total sellers"}  />
                                </div>

                                <div>
                                    {/* <StatisCard icon={<AiOutlineLineChart />}  percent={Math.round(state.overview.data.data && state.overview.data.data.sales.percentage)} arrow={state.overview.data.data && state.overview.data.data.sales.percentage >=0 ? "up" : "down"} title={"total sales"} count = {state.overview.data.data && state.overview.data.data.sales.count}  /> */}
                                    <StatisCard icon={<FontAwesomeIcon icon={faUser} />} percent={33} count = {20} arrow={"up"} title={"total sales"}  />
                                </div>

                                <div>
                                    {/* <StatisCard icon={<FontAwesomeIcon icon={faUserGroup} />}  percent={Math.round(state.overview.data.data && state.overview.data.data.customers.percentage)} arrow={state.overview.data.data && state.overview.data.data.customers.percentage >=0 ? "up" : "down"} title={"total customers"} count = {state.overview.data.data && state.overview.data.data.customers.count}  /> */}
                                    <StatisCard icon={<FontAwesomeIcon icon={faUser} />} percent={33} count = {20} arrow={"up"} title={"total customers"} />
                                </div>

                                <div>
                                    {/* <StatisCard icon={<BiCategory />} percent={Math.round(state.overview.data.data && state.overview.data.data.categories.percentage)} arrow={state.overview.data.data && state.overview.data.data.categories.percentage >=0 ? "up" : "down"} title={"total categories"} count = {state.overview.data.data && state.overview.data.data.categories.count}  /> */}
                                    <StatisCard icon={<FontAwesomeIcon icon={faUser} />} percent={33} count = {20} arrow={"down"} title={"total categories"} />
                                </div>

                            </div>

                            <div className={classes.sellersChartsWrapper}>
                                <div className={classes.reviewChart}>
                                    <Review />
                                </div>

                                <div className={classes.customerChartDoungnut}>
                                    <CustomerReview />
                                </div>

                                <div className={classes.incomeChart}>
                                    <IncomeChart />
                                </div>

                                <div className={classes.failedSellChart}>
                                    <FailedSellChart />
                                </div>
                            </div>
                        </div>
                        

                    </section>
                    
                </section>
            </article>
        </>
    );
}

export default Sellers;