import { TabContext, TabList, TabPanel } from "@material-ui/lab"
import { Search } from "@mui/icons-material"
import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Tab, Tabs } from "@mui/material"
import { useContext, useState } from "react"
import DataTable from "react-data-table-component"
import { AiFillStar, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { FiMoreHorizontal } from "react-icons/fi"
import { Link } from "react-router-dom"
import classes from '../assets/style/reportDetails.module.scss'
import SideNav from "../Components/Navbar/SideNavbar/sideNav"
import TopNavbar from "../Components/Navbar/TopNavbar/topNav"
import user from '../assets/imgs/user.png'
import { TabsContext } from "../Components/Context/context"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { topSellingReport } from "../Components/Redux/Slices/DashboardSlice/Reports/topSellingReportSlice"
import { salesReport } from "../Components/Redux/Slices/DashboardSlice/Reports/salesReportSlice"
import { lowInventoryReport } from "../Components/Redux/Slices/DashboardSlice/Reports/lowInventoryReportSlice"
import { newCutomerReport } from "../Components/Redux/Slices/DashboardSlice/Reports/newCustomerReportSlice"

const ReportDetails = () => {

    const [toggleNav, settoggleNav] = useState(true)


    const toggleNavHandler = ()=>{
        settoggleNav(!toggleNav)
    }

    let activeClassName = classes.activeBtn

    const tabValContext = useContext(TabsContext)

    const tabValue = tabValContext.tabVal

    /* Tabs Content */

    const [value, setValue] = useState(tabValue);

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    const state = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(topSellingReport())
        dispatch(salesReport())
        dispatch(lowInventoryReport())
        dispatch(newCutomerReport())
    }, [])
    

    console.log(state);


    /* Table */
    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

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

    /* Data for Sales Table */
    const columns = [
        {            
            name: 'Code',
            selector: (row) => row.code,
            sortable: true,
        },
        {
            name: 'Product',
            selector: row => row.product_name,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.amount,
            sortable: true,
            style: {
                color: "#2A85FF",
            },
        },
        {
            name: 'Tax 3%',
            selector: row => row.tax,
            sortable: true,
            style: {
                color: "#F27636",
            },
        },
        {
            name: 'Commission 2%',
            selector: row => row.commission,
            sortable: true,
        },
        {
            name: 'Total',
            selector: row => row.total,
            sortable: true,
            style: {
                color: "#6ED09A",
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
            style: {
                textAlign: "center",
            },
        },
        
    ];
    
    // const data = [
    //     {
    //         id: 1,
    //         code: '20012',
    //         product: 'Product Name',
    //         amount : "1520",
    //         tax : "1000",
    //         commission : "300",
    //         total : "20000",
    //         action : "",
    //     },
    //     {
    //         id: 2,
    //         code: '52262',
    //         product: 'Product Name',
    //         amount : "570",
    //         tax : "1000",
    //         commission : "300",
    //         total : "20000",
    //         action : "",

    //     },
    //     {
    //         id: 3,
    //         code: '0002566',
    //         product: 'Product Name',
    //         amount : "2520",
    //         tax : "1000",
    //         commission : "300",
    //         total : "20000",
    //         action : "",

    //     },
    //     {
    //         id: 4,
    //         code: '77745',
    //         product: 'Product Name',
    //         amount : "2520",
    //         tax : "1000",
    //         commission : "300",
    //         total : "20000",
    //         action : "",

    //     },
    // ]

    /* Data for Top Selling Table */
    const columns2 = [
        {
            name: 'Logo',
            cell: (row) => (<img src={row.image}/>),
            sortable: true,
            
        },
        {
            name: 'Product Name',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.amount.sum,
            sortable: true,
            style: {
                color: "#2A85FF",
            },
        },
        {
            name: 'Orders',
            selector: row => row.orders,
            sortable: true,
            style: {
                color: "#FC5555",
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

    /* Data for Low Inventory Table */
    const columns3 = [
        {
            name: 'Created at',
            selector: (row) => row.create_at,
            sortable: true,
        },
        {
            name: 'Product Name',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Retail Price',
            selector: row => row.price,
            sortable: true,
            style: {
                color: "#2A85FF",
            },
        },
        {
            name: 'On-Hand',
            selector: row => row.on_hand,
            sortable: true,
            
        },
        {
            name: 'Average Cost',
            selector: row => row.avg_per_order,
            sortable: true,
            style: {
                color: "#F27636",
            },
        },
        {
            name: 'Total',
            selector: row => row.total,
            sortable: true,
            style: {
                color: "#6ED09A",
            },
        },
        {
            name: 'Updated at',
            selector: row => row.update_at,
            sortable: true,
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
            style: {
                textAlign: "center",
            },
        },
        
    ];

    /* Data for New Customers Table */
    const columns4 = [
        {
            name: '#',
            selector: (row) => row.count,
            sortable: true,
        },
        {
            name: 'Customer',
            selector: (row) => row.customer,
            sortable: true,
        },
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Mail',
            selector: row => row.email,
            sortable: true,
            style: {
                color: "#2A85FF",
            },
        },
        {
            name: 'Orders Count',
            selector: row => row.orders_count,
            sortable: true,
            
        },
        {
            name: 'Products Count',
            selector: row => row.products_count,
            sortable: true,
            style: {
                color: "#F27636",
            },
        },
        {
            name: 'Total',
            selector: row => row.total,
            sortable: true,
            style: {
                color: "#6ED09A",
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
            style: {
                textAlign: "center",
            },
        },
        
    ];

    /* Pagination */
    const pageChange1 = async (page) => {
        dispatch(topSellingReport(page))
	};

    const pageChange2 = async (page) => {
        dispatch(salesReport(page))
	};

    const pageChange3 = async (page) => {
        dispatch(lowInventoryReport(page))
	};

    const pageChange4 = async (page) => {
        dispatch(newCutomerReport(page))
	};

    return ( 
        <>
            <article className={classes.reportDetailsWrapper}>
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

                        <div className={classes.reportTabs}>

                            <Box sx={{ width: '100%', typography: 'body1' }}>

                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList variant="scrollable" className={classes.tabListContainer} onChange={handleChange} aria-label="lab API tabs example" textColor="primary" indicatorColor="primary">
                                            <Tab label="Sales" value="1" />
                                            <Tab label="Top Selling" value="2" />
                                            <Tab label="Low Inventory" value="3" />
                                            <Tab label="New Customer" value="4" />
                                        </TabList>
                                    </Box>

                                    <TabPanel value="1">
                                        <Box className={classes.tableSearchInput}>
                                            <p>Sales</p>

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
                                        <DataTable
                                            // title="Store Sales"
                                            className={classes.dataTableComponentWrapper}
                                            columns={columns}
                                            data={state.salesReport.data && state.salesReport.data.results}
                                            selectableRows
                                            responsive= {true}
                                            striped = {true}
                                            selectableRowsHighlight = {true}
                                            highlightOnHover = {true}
                                            fixedHeader = {false}
                                            subHeader
                                            subHeaderAlign = {"left"}
                                            // expandableRowsComponent={ExpandedComponent}
                                            customStyles={customStyles}
                                            pagination
                                            paginationServer
                                            paginationTotalRows={state.salesReport.data && state.salesReport.data.count}
                                            onChangePage={pageChange1}
                                        /> 
                                    </TabPanel>

                                    <TabPanel value="2">
                                        <Box className={classes.tableSearchInput}>
                                            <p>Top Selling</p>

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
                                        <DataTable
                                            // title="Store Sales"
                                            className={classes.dataTableComponentWrapper}
                                            columns={columns2}
                                            data={state.topSellingReport.data && state.topSellingReport.data.results}
                                            selectableRows
                                            pagination
                                            paginationServer
                                            paginationTotalRows={state.topSellingReport.data && state.topSellingReport.data.count}
                                            onChangePage={pageChange2}
                                            responsive= {true}
                                            striped = {true}
                                            selectableRowsHighlight = {true}
                                            highlightOnHover = {true}
                                            fixedHeader = {false}
                                            subHeader
                                            subHeaderAlign = {"left"}
                                            customStyles={customStyles}

                                        /> 
                                    </TabPanel>
                                    
                                    <TabPanel value="3">
                                        <Box className={classes.tableSearchInput}>
                                            <p>Low Inventory</p>

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
                                        <DataTable
                                            // title="Store Sales"
                                            className={classes.dataTableComponentWrapper}
                                            columns={columns3}
                                            data={state.lowInventoryReport.data && state.lowInventoryReport.data.results}
                                            selectableRows
                                            pagination
                                            paginationServer
                                            paginationTotalRows={state.lowInventoryReport.data && state.lowInventoryReport.data.count}
                                            onChangePage={pageChange3}
                                            responsive= {true}
                                            striped = {true}
                                            selectableRowsHighlight = {true}
                                            highlightOnHover = {true}
                                            fixedHeader = {false}
                                            subHeader
                                            subHeaderAlign = {"left"}
                                            customStyles={customStyles}
                                        /> 
                                    </TabPanel>

                                    <TabPanel value="4">
                                        <Box className={classes.tableSearchInput}>
                                            <p>New Customers</p>

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
                                        <DataTable
                                            // title="Store Sales"
                                            className={classes.dataTableComponentWrapper}
                                            columns={columns4}
                                            data={state.newCustomerReport.data && state.newCustomerReport.data.results}
                                            selectableRows
                                            pagination
                                            paginationServer
                                            paginationTotalRows={state.newCustomerReport.data && state.newCustomerReport.data.count}
                                            onChangePage={pageChange4}
                                            responsive= {true}
                                            striped = {true}
                                            selectableRowsHighlight = {true}
                                            highlightOnHover = {true}
                                            fixedHeader = {false}
                                            subHeader
                                            subHeaderAlign = {"left"}
                                            customStyles={customStyles}
                                        /> 
                                    </TabPanel>

                                </TabContext>
                            </Box>   

                        </div>
                    </section>
                </section>

            </article>
        </>
    );
}

export default ReportDetails;