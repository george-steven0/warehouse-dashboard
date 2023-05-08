import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBoxes, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import classes from '../assets/style/sellersInfo.module.scss'
import SideNav from "../Components/Navbar/SideNavbar/sideNav"
import TopNavbar from "../Components/Navbar/TopNavbar/topNav"
import { GrUserExpert } from "react-icons/gr";
import Box from '@mui/material/Box';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { AiFillStar, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import {FaBoxOpen} from 'react-icons/fa'
import DataTable from "react-data-table-component";
import TextField from '@mui/material/TextField';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sellerOveview } from "../Components/Redux/Slices/DashboardSlice/Seller/sellerOverviewSlice";
import { vedorSeller } from "../Components/Redux/Slices/DashboardSlice/Seller/vendorSellerSlice";
import { useNavigate } from "react-router-dom";




const SellersInfo = () => {

    const [toggleNav, settoggleNav] = useState(true)
    const [activeBtn, setactiveBtn] = useState('b1')
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate()


    const state = useSelector(state=>state)
    const dispatch = useDispatch()

    const toggleNavHandler = ()=>{
        settoggleNav(!toggleNav)
    }

    const toggleActiveBtn = (e)=>{
        const {name} = e.target;
        setactiveBtn(name)
    }

    let activeClassName = classes.activeBtn


    /* Tabs Content */

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
    setValue(newValue);
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
        dispatch(sellerOveview(currDate))
        dispatch(vedorSeller())
    }, [currDate])


    /* Pagination */
    const pageChange = async (page) => {
        setLoading(true);
        dispatch(vedorSeller(page))
        setLoading(false);
	};
    // console.log(state.vendorSeller);


    

    /* Table */
    const columns = [
        {
            name: 'Name',
            selector: (row) => <span className={classes.tableLink}>{row.name}</span>,
            sortable: true,
        },
        {
            name: 'Mail',
            selector: row => row.email,
            sortable: true,
            style : {
                color : "#2A85FF"
            }
        },
        {
            name: 'Status',
            selector: row => row.active === true ? 
                <div className={classes.switchBtn}>
                    <span>Active</span> 
                    <label class={classes.switch}>
                        <input type="checkbox" checked={true} />
                        <span class={classes.slider + " " + classes.round}></span>
                    </label>
                    <span>Inactive</span>
                </div>
            : <div className={classes.switchBtn}>
                    <span>Active</span> 
                    <label class={classes.switch}>
                        <input type="checkbox" checked={false} />
                        <span class={classes.slider + " " + classes.round}></span>
                    </label>
                    <span>Inactive</span>
                </div> ,
            sortable: true,
            // style: {
            //     color: "#2A85FF",
            // },
        },
        {
            name: 'Review',
            cell: (row) => (
                    <div className={classes.tableReview}>
                        <span className={classes.icons}>
                            {/* <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar /> */}
                            {[...Array(Math.floor(row.review))].map((e, i) => <span key={i}><AiFillStar /></span>)}
                        </span>
                        <span className={classes.iconText}>{row.review}</span>
                    </div>
                ),
            sortable: true,
            style: {
                color: "#FCEC59",
            },
        },
        {
            name: 'Products',
            selector: row => row.products,
            sortable: true,
        },
        {
            name: 'Brands',
            selector: row => row.brand,
            sortable: true,
            style: {
                color: "#000",
            },
        },
        {
            name: 'Action',
            cell: (row) => (
                <div className={classes.tableBtn}>
                    <button><AiOutlineEdit /></button>
                    <button><AiOutlineDelete /></button>
                    <button><FiMoreHorizontal /></button>
                </div>
            ),
        },
        
    ];

    const customStyles = {
        // title: {
        //   style: {
        //     fontColor: 'red',
        //     fontWeight: '900',
        //   }
        // },
        // rows: {
        //   style: {
        //     minHeight: '72px', // override the row height
        //   }
        // },
        headCells: {
          style: {
            fontSize: '20px',
            fontWeight: '500',
          },
        },
        cells: {
          style: {
            fontSize: '14px',
            // paddingLeft: '0 8px',
          },
        },
    };


    return ( 
        <>
            <article className={classes.sellersInfoWrapper}>
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

                        <div className={classes.sellerWrapper}>
                            <div className={classes.title}>
                                <h3>Manage Sellers</h3>

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

                            <div className={classes.sellersBtnWrapper}>
                                <button className={activeBtn === "b1" ? classes.sellersactiveBtn : null} name="b1" onClick={toggleActiveBtn}>
                                    <span><FontAwesomeIcon icon={faUserTie} /></span> total sellers <span>{state.sellerOverview.data && state.sellerOverview.data.total_sellers}</span>
                                </button>

                                <button className={activeBtn === "b2" ? classes.sellersactiveBtn : null} name="b2" onClick={toggleActiveBtn}>
                                    <span><GrUserExpert /></span> active sellers <span>{state.sellerOverview.data && state.sellerOverview.data.active_sellers}</span>
                                </button>

                                <button className={activeBtn === "b3" ? classes.sellersactiveBtn : null} name="b3" onClick={toggleActiveBtn}>
                                    <span><FontAwesomeIcon icon={faBoxes} /></span>total products <span>{state.sellerOverview.data && state.sellerOverview.data.total_products}</span>
                                </button>

                                <button className={activeBtn === "b4" ? classes.sellersactiveBtn : null} name="b4" onClick={toggleActiveBtn}>
                                    <span><FaBoxOpen /></span>active products <span>{state.sellerOverview.data && state.sellerOverview.data.active_products}</span>
                                </button>

                                
                            </div>                          
                        </div>

                        <div className={classes.tableSellersWrapper}>
                            <Box className={classes.tableSearchInput}>
                                <p>Seller List</p>
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

                            <Box sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="primary" indicatorColor="primary">
                                            <Tab label="All Sellers" value="1" />
                                            <Tab label="Active" value="2" />
                                            <Tab label="Inactive" value="3" />
                                        </TabList>
                                    </Box>
                                    <Box>
                                        <TabPanel value="1">
                                            <DataTable
                                                // title="Store Sales"
                                                className={classes.dataTableComponentWrapper}
                                                columns={columns}
                                                data={state.vendorSeller.data && state.vendorSeller.data.results}
                                                selectableRows
                                                responsive= {true}
                                                striped = {true}
                                                selectableRowsHighlight = {true}
                                                highlightOnHover = {true}
                                                fixedHeader = {false}
                                                subHeader
                                                subHeaderAlign = {"left"}
                                                customStyles={customStyles}
                                                pagination
                                                paginationServer
                                                paginationTotalRows={state.vendorSeller.data && state.vendorSeller.data.count}
                                                // onChangeRowsPerPage={handlePerRowsChange}
                                                onChangePage={pageChange}
                                                progressPending={loading}
                                                onRowClicked = {(row, event)=>navigate({pathname: "IndividualSellerInfo",search: `?id=${row.id}`} )}
                                                pointerOnHover
                                            /> 
                                        </TabPanel>

                                        <TabPanel value="2">
                                            tab 2
                                        </TabPanel>

                                        <TabPanel value="3">
                                            tab 3
                                        </TabPanel>
                                        
                                    </Box>
                                </TabContext>
                            </Box>                      
                        </div>
                        

                    </section>
                    
                </section>
            </article>
        </>
    );
}

export default SellersInfo;