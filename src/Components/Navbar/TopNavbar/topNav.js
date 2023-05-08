import './topnav.scss'

import { IconButton, InputAdornment, TextField } from '@mui/material'; 
import { Search } from '@mui/icons-material';
import user from '../../../assets/imgs/user.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { TbMessage } from "react-icons/tb";


const TopNavbar = () => {
    return ( 
        <>
            <article className="topNavWrapper">

                <div className="topNavContainer">

                    <section className="leftSide">
                        <div className="logoSearchWrapper">

                            <div>
                                Logo
                            </div>

                            <div>
                                <TextField
                                    placeholder='Search'
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment>
                                            <IconButton>
                                            <Search />
                                            </IconButton>
                                        </InputAdornment>
                                        )
                                    }}
                                />
                            </div>
                            
                        </div>
                    </section>

                    <section className="rightSide">
                        <div className="navProfileWrapper">

                            <ul>
                                <li>
                                    <button>
                                        <span><FontAwesomeIcon icon={faPlus} /></span>
                                        <span>Create</span>
                                    </button>
                                </li>

                                <li>
                                    <span><TbMessage /></span>
                                </li>

                                <li>
                                    <span><FontAwesomeIcon icon={faBell} /></span>
                                </li>

                                <li>
                                    <img src={user} alt="" />
                                </li>

                            </ul>

                        </div>
                    </section>

                </div>

            </article>
        </>
    );
}

export default TopNavbar;