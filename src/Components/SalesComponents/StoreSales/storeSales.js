import classes from './storeSales.module.scss'
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import DataGrid from 'react-data-grid';
import DataTable from 'react-data-table-component';
import user from '../../../assets/imgs/user.png'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { BiFilterAlt } from 'react-icons/bi';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useState } from 'react';
import { addDays } from 'date-fns';
import Modal from '../../Modal/modal';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { topSellingReport } from '../../Redux/Slices/DashboardSlice/Reports/topSellingReportSlice';
import axios from 'axios';




const StoreSales = () => {

    const [date, setdate] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    const state = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(topSellingReport())
    }, [])


    /* Mui Data table */

    // const columns = [
    //     { field: 'Logo',flex:1 },
    //     { field: 'Product',flex:1 },
    //     { field: 'Amount',flex:1 },
    //     { field: 'Orders',flex:1 },
    //     { field: 'Action',flex:1 },
    // ];

    // const rows = [
    //     {
    //         id: 1,
    //         Product: 'MUI',
    //         Qty: 28000,
    //         Amount: 200,
    //     },
    //     {
    //         id: 2,
    //         Product: 'DataGrid',
    //         Qty: 15000,
    //         Amount: 5000,
    //     },
    //     {
    //         id: 3,
    //         Product: 'Grid',
    //         Qty: 2000,
    //         Amount: 1000,
    //     },
    //     {
    //         id: 4,
    //         Product: 'Data',
    //         Qty: 23000,
    //         Amount: 15000,
    //     },
    //     {
    //         id: 5,
    //         Product: 'React',
    //         Qty: 15000,
    //         Amount: 5000,
    //     },
    //     {
    //         id: 6,
    //         Product: 'DataGrid',
    //         Qty: 15000,
    //         Amount: 5000,
    //     }
    // ];

    /* React Data Grid */
    // const columns = [
    //     { key: 'id', name: 'ID' },
    //     { key: 'title', name: 'Title' }
    // ];
    
    // const rows = [
    // { id: 0, title: 'Example' },
    // { id: 1, title: 'Demo' }
    // ];

    /* React Data table Component */

    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    const columns = [
        {
            name: 'image',
            cell: (row) => (<img src={row.image}/>),
            sortable: true,
            
        },
        {
            name: 'title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'amount',
            selector: row => row.amount.sum,
            sortable: true,
            style: {
                color: "#2A85FF",
            },
        },
        {
            name: 'orders',
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
    
    const data = [
        {
            id: 1,
            logo: 'Beetlejuice',
            product: 'Product Name',
            amount : "25",
            orders : "1000",
            action : ""
        },
        {
            id: 2,
            logo: 'Ghostbusters',
            product: 'Product Name',
            amount : "25",
            orders : "1000",
            action : ""

        },
        {
            id: 3,
            logo: 'Beetlejuice',
            product: 'Product Name',
            amount : "25",
            orders : "1000",
            action : ""

        },
        {
            id: 4,
            logo: 'Ghostbusters',
            product: 'Product Name',
            amount : "25",
            orders : "1000",
            action : ""

        },
    ]

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


    const [modal, setModal] = useState(false)

    const showModalHandler = ()=>{
        setModal(true)
    }
    const dismissModalHandler = ()=>{
        setModal(false)
    }

    /* Pagination */
    const pageChange = async (page) => {
        dispatch(topSellingReport(page))
	};

    return ( 
        <>
            <article className={classes.storeSalesWrapper} style={{ minHeight: 400, width: '100%' }}>

                {/* <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    sx={{
                        backgroundColor : "#fff",
                        width : "100%"
                    }}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    loading={false}
                /> */}

                {/* <DataGrid 
                    columns={columns} 
                    rows={rows} 
                    rowKeyGetter={rowKeyGetter}
                    enableCellSelect={true}

                /> */}

            <DataTable
                // title="Store Sales"
                className={classes.dataTableComponentWrapper}
                columns={columns}
                data={state.topSellingReport.data && state.topSellingReport.data.results}
                selectableRows
                responsive= {true}
                striped = {true}
                fixedHeaderScrollHeight="300px"
                selectableRowsHighlight = {true}
                highlightOnHover = {true}
                fixedHeader = {true}
                customStyles={customStyles}
                pagination
                paginationServer
                paginationTotalRows={state.topSellingReport.data && state.topSellingReport.data.count}
                onChangePage={pageChange}
                subHeader
                subHeaderComponent = {
                    <div className={classes.tableHeaderTitle}>
                        <div className={classes.left}>
                            <p>Store Sales</p>
                            <input type="search" placeholder='Search' />
                        </div>

                        <div className={classes.right}>
                            <div>
                                <button>
                                    day
                                </button>
                            </div>

                            <div>
                                <button>
                                    week
                                </button>
                            </div>

                            <div>
                                <button>
                                    month
                                </button>
                            </div>

                            <div className={classes.dateFilter}>
                                <button className={classes.filterIcon} onClick={showModalHandler}>
                                    <BiFilterAlt />
                                </button>
                            </div>
                        </div>
                    </div>
                }
                subHeaderAlign = {"left"}

            /> 
            </article>

            <Modal show={modal} showHandler={showModalHandler} dismissHandler={dismissModalHandler} >
                <div className={classes.datePicker}>
                    <DateRangePicker
                        onChange={item => setdate([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={date}
                        direction="horizontal"
                    />
                </div>
            </Modal>
        </>
    );
}

export default StoreSales;