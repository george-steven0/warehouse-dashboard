import { Link, NavLink } from "react-router-dom";
import {BiCategory} from "react-icons/bi"
import { faBars, faBoxes, faTimes, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faBoxesPacking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlineLineChart } from "react-icons/ai";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiOutlineSetting } from "react-icons/ai";
import { FiHelpCircle, FiLogOut } from "react-icons/fi";
import './sideNav.scss'
import { useState } from "react";


const SideNav = (props) => {

    let activeClassName = "ActiveItem"

    const [showNav,setshowNav] = useState(true)

    const showNavHandler = ()=>{
        setshowNav(!showNav)
    }


    return ( 
        <>
            <span onClick={showNavHandler} className="showIcon" ><FontAwesomeIcon icon={faBars} /></span>
            <article className="sideNavWrapper" style={{display: showNav ? "block" : "none"}}>
                <span onClick={showNavHandler} className='closeIcon'><FontAwesomeIcon icon={faTimes} /></span>
                <section className="linkWrapper">
                    <ul>
                        <li>
                            <span>
                                <NavLink className={({ isActive }) => isActive ? activeClassName : undefined }
                                    to='/'>
                                    <span><BiCategory /></span>
                                    <span>Dashboard</span>
                                </NavLink>
                            </span>
                        </li>

                        <li>
                            
                            <span>
                                <NavLink className={({ isActive }) => isActive ? activeClassName : undefined }
                                    to='/'>
                                    <span><FontAwesomeIcon icon={faBoxes} /></span>
                                    <span>Products</span>
                                </NavLink>
                            </span>
                        </li>

                        <li>
                            
                            <span>
                                <NavLink className={({ isActive }) => isActive ? activeClassName : undefined }
                                    to='/Sales'>
                                    <span><AiOutlineLineChart /></span>
                                    <span>Sales</span>
                                </NavLink>
                            </span>
                        </li>

                        <li>
                            
                            <span>
                                <NavLink className={({ isActive }) => isActive ? activeClassName : undefined } 
                                    to='/Sellers'>
                                    <span><FontAwesomeIcon icon={faUserTie} /></span>
                                    <span>Sellers</span>
                                </NavLink>
                            </span>
                        </li>

                        <li>
                            
                            <span>
                                <NavLink className={({ isActive }) => isActive ? activeClassName : undefined }
                                    to='/Reports'>
                                    <span><HiOutlineDocumentReport /></span>
                                    <span>reports</span>
                                </NavLink>
                            </span>
                        </li>

                        <li>
                            
                            <span>
                                <NavLink className={({ isActive }) => isActive ? activeClassName : undefined }
                                    to='/'>
                                    <span><AiOutlineSetting /></span>
                                    <span>settings</span>
                                </NavLink>
                            </span>
                        </li>

                        <li>
                            
                            <span>
                                <NavLink className={({ isActive }) => isActive ? activeClassName : undefined }
                                    to='/'>
                                    <span><FiHelpCircle /></span>
                                    <span>Help</span>
                                </NavLink>
                            </span>
                        </li>

                        <li>
                            
                            <span>
                                <NavLink className={({ isActive }) => isActive ? activeClassName : undefined }
                                    to='/#'>
                                    <span><FiLogOut /></span>
                                    <span>logout</span>
                                </NavLink>
                            </span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}

export default SideNav;