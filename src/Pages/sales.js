import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from '../assets/style/sales.module.scss'
import SideNav from '../Components/Navbar/SideNavbar/sideNav';
import TopNavbar from '../Components/Navbar/TopNavbar/topNav';
import { overView } from '../Components/Redux/Slices/DashboardSlice/Home/overViewSlice';
import Customers from '../Components/SalesComponents/Customers/customers';
import StoreSales from '../Components/SalesComponents/StoreSales/storeSales';
import TopSelling from '../Components/SalesComponents/topSellig/topSelling';
import SalesCard from '../Components/SalesStatisticsCard/salesCard';

const Sales = () => {
    const [toggleNav, settoggleNav] = useState(true)

    const state = useSelector(state => state)
    const dispatch = useDispatch()

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

    useEffect(() => {
        dispatch(overView(currDate))

    }, [currDate])



    return ( 
        <>
            <article className={classes.salesWrapper}>
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
                                <NavLink to="/" className={({ isActive }) => isActive ? activeClassName : undefined }>
                                    <span>General</span>
                                </NavLink>

                                <NavLink to="/Sales" className={({ isActive }) => isActive ? activeClassName : undefined }>
                                    <span>Data Range</span>
                                </NavLink>
                            </div>
                        </div>

                        <div className={classes.salesStatisticsWrapper}>

                            <div className={classes.title}>
                                <h3>Sales Dashboard</h3>

                                <div>
                                    <select name="" id="" onChange={(e)=>currentDateHandler(e)}>
                                        <option selected disabled>Choose Date</option>
                                        <option value="week1">This Week</option>
                                        <option value="week2">Last Two Week</option>
                                        <option value="month1">This Month</option>
                                        <option value="month2">Last Two Month</option>
                                        <option value="month3">Last Three Month</option>
                                    </select>
                                </div>
                            </div>

                            <div className={classes.salesStatisticsCard}>

                                <div>
                                    {/* <SalesCard title={"Store Sales"} count={state.overview.data.data && state.overview.data.data.sales.count} percent={Math.round(state.overview.data.data && state.overview.data.data.sales.percentage)} icon={state.overview.data.data && state.overview.data.data.sales.percentage >=0 ? "up" : "down"} /> */}
                                    <SalesCard title={"Store Sales"} count={45} percent={25} icon={"down"} />
                                </div>

                                <div>
                                    {/* <SalesCard title={"orders"} count={state.overview.data.data && state.overview.data.data.orders.count} percent={Math.round(state.overview.data.data && state.overview.data.data.orders.percentage)} icon={state.overview.data.data && state.overview.data.data.orders.percentage >=0 ? "up" : "down"}/> */}
                                    <SalesCard title={"orders"} count={45} percent={25} icon={"up"} />
                                </div>

                                <div>
                                    {/* <SalesCard title={"customers"} count={state.overview.data.data && state.overview.data.data.customers.count} percent={Math.round(state.overview.data.data && state.overview.data.data.customers.percentage)} icon={state.overview.data.data && state.overview.data.data.customers.percentage >=0 ? "up" : "down"} /> */}
                                    <SalesCard title={"customers"} count={45} percent={25} icon={"down"} />
                                </div>

                                <div>
                                    {/* <SalesCard title={"top selling"} count={state.overview.data.data && state.overview.data.data.sellers.count} percent={Math.round(state.overview.data.data && state.overview.data.data.sellers.percentage)} icon={state.overview.data.data && state.overview.data.data.sellers.percentage >=0 ? "up" : "down"} /> */}
                                    <SalesCard title={"top selling"} count={45} percent={25} icon={"down"} />
                                </div>

                            </div>

                            <div className={classes.salesOverViewWrapper}>

                                <section className={classes.topSelling}>
                                    <TopSelling />
                                </section>

                                <section className={classes.customers}>
                                    <Customers />
                                </section>

                            </div>

                            <div className={classes.storeSales}>
                                <StoreSales />
                            </div>
                        </div>

                    </section>
                </section>
            </article>
        </>
    );
}

export default Sales;