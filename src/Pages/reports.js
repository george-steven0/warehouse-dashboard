import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import classes from '../assets/style/reports.module.scss'
import SideNav from "../Components/Navbar/SideNavbar/sideNav"
import TopNavbar from "../Components/Navbar/TopNavbar/topNav"
import {BsFileEarmarkText} from 'react-icons/bs'
import { TabsContext } from "../Components/Context/context"

const Reports = () => {

    const [toggleNav, settoggleNav] = useState(true)


    const toggleNavHandler = ()=>{
        settoggleNav(!toggleNav)
    }

    let activeClassName = classes.activeBtn

    const reportDetails = [
        {id:1, title: "sales report", icon:<BsFileEarmarkText />},
        {id:2, title: "top selling report", icon:<BsFileEarmarkText />},
        {id:3, title: "low inventory report", icon:<BsFileEarmarkText />},
        {id:4, title: "new customers report", icon:<BsFileEarmarkText />},
    ]



    const tabValContext = useContext(TabsContext)
    const valHandler = tabValContext.valHandler

    const reportCardList = reportDetails.map( (item)=>{
        return(
            <NavLink onClick={()=>{valHandler(item.id)}} to="ReportDetails" className={classes.reportCard} key={item.id}>
                <p className={classes.icon}>{item.icon}</p>
                <p className={classes.title}>{item.title}</p>
            </NavLink>
        )
    } )




    return ( 
        <>
            <article className={classes.reportsWrapper}>
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

                        <div className={classes.reportContentWrapper}>
                            <div className={classes.title}>
                                <p>Signle Reports</p>
                            </div>

                            <div className={classes.reportCardWrapper}>
                                {reportCardList}
                            </div>
                        </div>

                    </section>
                </section>
            </article>
        </>
    );
}

export default Reports;