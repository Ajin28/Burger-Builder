import React from 'react';
import classes from './Logo.module.css'
import burgerLogo from '../../assests/images/burger-logo.png'
// here burgerLogo refers to a string of the path where webpack stored the optimized and copied image.

const Logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img alt="Logo" src={burgerLogo} />
        </div>);
}

export default Logo;
