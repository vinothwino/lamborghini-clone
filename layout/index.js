import React from 'react';
import Navbar from 'components/Navbar'

const Layout = (props) => {
    return (
        <div className="main-wrapper">
            <Navbar />
            {props.children}

        </div>
    );
}

export default Layout;