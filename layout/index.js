import React from 'react';
import Navbar from 'components/Navbar'

const Layout = (props) => {
    return (
        <header>
            <Navbar />
            {props.children}
        </header>
    );
}

export default Layout;