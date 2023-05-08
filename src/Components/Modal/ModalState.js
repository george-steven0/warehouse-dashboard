import classNames from 'classnames';
import { useEffect } from 'react';
import Backdrop from './backdrop/backdrop';
import classes from  './ModalState.module.css'

const ModalState = (props) => {
    return ( 
        <div className={classes.modalContainer}>
            <Backdrop show={props.show} dismiss = {props.dismissHandler} />
            <div className={classes.modal}
                style={{ transform : props.show ? 'translateY(0)' : 'translateY(-200vh)',
                            opacity : props.show ? '1' : '0'}}>

                {/* {props.children} */}

                <div className={classes.errorModal}>
                    <div className={classes.errorDismiss}>
                        {!props.changeSuccess ? <span onClick={props.dismissHandler}>X</span> : null}
                    </div>

                    <div className={classes.errorModalContent}>
                        <div className={classes.errorImg}>
                            <img src={props.src} alt="Image Status" />
                        </div>
                        <ul className={classes.errorModalInstruction}>
                            {props.error && props.error ? props.error && props.error.map( (err,index)=>{
                                
                                return err.ErrorMSG == "The input is not a valid Base-64 string as it contains a non-base 64 character, more than two padding characters, or an illegal character among the padding characters. " ? <span>Check Image/s</span>  : 
                                
                                err.ErrorCode !== "Err10" ?
                                <li key={index}>
                                    {err.ErrorMSG}
                                </li> : 
                                err.ErrorCode == "Err10" ? 
                                <li key={index}>
                                    <span>Something Went Wrong Please Reload</span> <br/> <br/>
                                    <button
                                        style={{
                                            backgroundColor : "#007CC2",
                                            cursor : "pointer",
                                            border : "1px solid #007CC2",
                                            borderRadius : "25px",
                                            color : "#fff",
                                            padding : "5px 15px",

                                        }}
                                        onClick={()=>{
                                            window.location.reload(true)
                                        }}
                                    >Reload</button>
                                </li> : null
                                
                            } ) : props.verfiy ? props.verfiyText : null }
                        </ul>

                            {props.children}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ModalState;