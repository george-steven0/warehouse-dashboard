import { faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Search } from '@mui/icons-material';
import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Fragment, useState } from 'react';
import { AiOutlineLineChart } from 'react-icons/ai';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import classes from '../assets/style/individualSellerInfo.module.scss'
import SideNav from '../Components/Navbar/SideNavbar/sideNav';
import TopNavbar from '../Components/Navbar/TopNavbar/topNav';
import StatisCard from '../Components/StatisticsCard/statisCard';
import { AiOutlineEdit } from "react-icons/ai";
import { TbMessage } from "react-icons/tb";
import { HiDotsHorizontal } from 'react-icons/hi';
import SellerInfoCard from '../Components/SellerInfoCard/sellerInfoCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { vendorProfile } from '../Components/Redux/Slices/DashboardSlice/Seller/vendorProfileSlice';
import { overView } from '../Components/Redux/Slices/DashboardSlice/Home/overViewSlice';


const IndividualSellerInfo = () => {

    const state = useSelector(state=>state)
    const dispatch = useDispatch()

    // console.log(state);

    const [toggleNav, settoggleNav] = useState(true)


    const toggleNavHandler = ()=>{
        settoggleNav(!toggleNav)
    }

    let activeClassName = classes.activeBtn

    const contentCardData = [
        {id:1, name: "Name", value : state.vendorProfile.data && state.vendorProfile.data.store_name},
        {id:2, name: "products", value : state.vendorProfile.data && state.vendorProfile.data.products_count},
        {id:3, name: "categories", value : state.vendorProfile.data && state.vendorProfile.data.categories_count},
        {id:4, name: "rating", value : state.vendorProfile.data && state.vendorProfile.data.ratings_avg+"%"},
        {id:5, name: "review", value : state.vendorProfile.data && state.vendorProfile.data.ratings_avg},
        {id:6, name: "status", value : state.vendorProfile.data && state.vendorProfile.data.active === true ? "Active" : "disactive"},
        {id:7, name: "sales", value : state.vendorProfile.data && state.vendorProfile.data.sales_count},
        // {id:8, name: "recoveries", value : "13"},
        {id:9, name: "total income", value : state.vendorProfile.data && state.vendorProfile.data.total_income},
        // {id:10, name: "handling fee", value : "40"},
    ]

    const contentCardList = contentCardData.map (item=>{
        return(
            <Fragment key={item.id}>
                <SellerInfoCard  name={item.name} value = {item.value} />
            </Fragment>
        )
    })

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

    const [searchParams] = useSearchParams();
    const id  = searchParams.get('id')



    useEffect(() => {
        dispatch(vendorProfile(id))
        dispatch(overView(currDate))
    }, [])

    console.log(state);
    

    return ( 
        <>
            <article className={classes.individualSellerInfo}>
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

                            <div className={classes.individualSeller}>
                                <div className={classes.sellerStatisticsWrapper}>
                                    <h3>Overview</h3>

                                    <div className={classes.statisCardWrapper}>
                                        <div>
                                            <StatisCard icon={<FontAwesomeIcon icon={faUser} />} percent={Math.round(state.overview.data.data && state.overview.data.data.sellers.percentage)} arrow={state.overview.data.data && state.overview.data.data.sellers.percentage >=0 ? "up" : "down"} title={"total sellers"} count = {state.overview.data.data && state.overview.data.data.sellers.count}  />
                                        </div>

                                        <div>
                                            <StatisCard icon={<AiOutlineLineChart />}  percent={Math.round(state.overview.data.data && state.overview.data.data.sales.percentage)} arrow={state.overview.data.data && state.overview.data.data.sales.percentage >=0 ? "up" : "down"} title={"total sales"} count = {state.overview.data.data && state.overview.data.data.sales.count}  />
                                        </div>

                                        <div>
                                            <StatisCard icon={<FontAwesomeIcon icon={faUserGroup} />}  percent={Math.round(state.overview.data.data && state.overview.data.data.customers.percentage)} arrow={state.overview.data.data && state.overview.data.data.customers.percentage >=0 ? "up" : "down"} title={"total customers"} count = {state.overview.data.data && state.overview.data.data.customers.count}  />
                                        </div>
                                    </div>

                                    <div className={classes.searchWrapper}>
                                        <Box className={classes.tableSearchInput}>
                                            <p>Sellers</p>
                                            <FormControl variant="filled">
                                                <InputLabel htmlFor="outlined-adornment-password">Search by Name Or Email</InputLabel>
                                                <OutlinedInput
                                                    id=""
                                                    type="search"
                                                    endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                        aria-label="Search"
                                                        edge="end"
                                                        >
                                                            <Search />
                                                        </IconButton>
                                                    </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </Box>
                                    </div>

                                    <div className={classes.sellerContentWrapper}>
                                        <div className={classes.title}>
                                            <h3>Seller Name</h3>

                                            <div className={classes.titleIcon}>
                                                <span><AiOutlineEdit /></span>
                                                <span><TbMessage /></span>
                                                <span><HiDotsHorizontal /></span>
                                            </div>
                                        </div>

                                        <div className={classes.contentCardWrapper}>
                                            {contentCardList}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>
                        
                    </section>
            </article>
        </>
    );
}

export default IndividualSellerInfo;