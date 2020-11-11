import React, { useState } from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';

const Navigation = (props) => {

    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div>
            <TopBar setOpenSideMenu={setOpenSideMenu} />
            <SideBar
                useEffect={props.useEffect}
                setUseEffect={props.setUseEffect}
                snowFlake={props.snowFlake}
                setSnowFlake={props.setSnowFlake}
                changeEffectOnOff={props.changeEffectOnOff}
                changeSnowFlakeCount={props.changeSnowFlakeCount}
                resetData={props.resetData}
                changeBackground={props.changeBackground}
                openSideMenu={openSideMenu}
                setOpenSideMenu={setOpenSideMenu}
            />
        </div>
    )
}

export default Navigation;
