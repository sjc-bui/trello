import React, { useState } from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';

const Navigation = ({ changeBackground, resetData }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div>
            <TopBar setOpenSideMenu={setOpenSideMenu} />
            <SideBar resetData={resetData} openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} changeBackground={changeBackground} />
        </div>
    )
}

export default Navigation;
