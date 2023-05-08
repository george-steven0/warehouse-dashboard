import classes from './bottomRight.module.scss'
import user from '../../../assets/imgs/user.png'
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { latestProduct } from '../../Redux/Slices/DashboardSlice/Home/latestProductSlice';
import axios from 'axios';
import { countryPercent } from '../../Redux/Slices/DashboardSlice/Home/countrySlice';


const BottomRight = () => {

    const state = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(latestProduct())
        dispatch(countryPercent())
        
    }, [])

    // console.log(state.countryPercent.data.results);

    let arr = []

    state.countryPercent.data.results && state.countryPercent.data.results.map(item=>{
        arr.push([item.shipping_address__country, item.most_count])
    })

    const data = [
        ["", ""],
        ...arr
        // ["New York", "0%"],
        // ["Los Angeles", "15%"],
        // ["Chicago]", "10%"],
        // ["Houston", "35%"],
        // ["Philadelphia", "40%"],
    ];

    const options = {
    chart: {
        title: "Top Country",
    },
    
    bars: "horizontal",
    axes: {
        y: {
            0: { side: "top" },
        },
    },
    };


    let tableList = state.latestProduct.latestProductData.results && state.latestProduct.latestProductData.results.map(item=>{
        return(
            <div className={classes.tableCard} key={item.id}>

                <div>
                    <img src={item.image} alt={item.title} />
                </div>

                <div>
                    <p>{item.title}</p>
                </div>

                <div>
                    {item.price} $
                </div>
            </div>
        )
    })

    return ( 
        <>
            <article className={classes.bottomRightWrapper}>
                <section className={classes.latestAddedWrapper}>
                    <div className={classes.title}>
                        <p>Latest Added Products</p>

                        <div>
                            <input type="search" placeholder='Search' />
                        </div>
                    </div>

                    <div className={classes.latestTableWrapper}>
                        <div className={classes.latestTableTitle}>
                            <p>Logo</p>
                            <p>Name</p>
                            <p>price</p>
                        </div>

                        <div className={classes.latestTableContent}>
                            {/* <div className={classes.tableCard}>

                                <div>
                                    <img src={user} alt="" />
                                </div>

                                <div>
                                    <p>Product Name</p>
                                </div>

                                <div>
                                    40 $
                                </div>
                            </div> */}

                            {tableList}
                        </div>

                        <div className={classes.seeMoreBtn}>
                            <span>see more</span>
                        </div>
                    </div>
                </section>

                <section className={classes.topCountryWrapper}>
                    {/* <Bar options={options} data={data} /> */}
                    <Chart
                        chartType="Bar"
                        width="100%"
                        height="300px"
                        data={data}
                        options={options}
                    />
                    
                </section>

                
            </article>
        </>
    );
}

export default BottomRight;