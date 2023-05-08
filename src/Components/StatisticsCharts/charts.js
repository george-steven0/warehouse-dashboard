import BottomLeft from './BottomSide/bottomLeft';
import BottomRight from './BottomSide/bottomRight';
import classes from './charts.module.scss'
import TopLeftChart from './TopSide/topLeft';
import TopRightChart from './TopSide/topRight';

const ChartsComponent = () => {
    return ( 
        <>
            <article className={classes.chartsWrapper}>
                <section className={classes.topSide}>

                    <div className={classes.topLeftSide}>
                        <TopLeftChart />
                    </div>

                    <div className={classes.topRightSide}>
                        <TopRightChart />
                    </div>

                </section>

                <section className={classes.bottomSide}>
                    <div className={classes.bottomLeft}>
                        <BottomLeft />
                    </div>

                    <div className={classes.bottomRight}>
                        <BottomRight />
                    </div>
                </section>
            </article>
        </>
    );
}

export default ChartsComponent;