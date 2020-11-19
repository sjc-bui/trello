import React, { useState } from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';

const Navigation = (props) => {

    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div>
            <TopBar
                boardName={props.boardName}
                setOpenSideMenu={setOpenSideMenu} />
            <SideBar
                enableEffect={props.enableEffect}
                lang={props.lang}
                formatType={props.formatType}
                setEnableEffect={props.setEnableEffect}
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
