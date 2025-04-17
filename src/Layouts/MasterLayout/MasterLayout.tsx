import { Box, CssBaseline, Paper, styled } from "@mui/material";
import { useState } from "react";
import SideBar from './../../Shared/Sidebar/SideBar';
import Header from "../../Shared/Header/Header";
import { Outlet } from "react-router-dom";

const drawerWidth = 0; // عرض الـ Sidebar عندما يكون مفتوحًا
const collapsedWidth = 0; // عرض الـ Sidebar عند الإغلاق

const MasterLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
    };


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: 'transparent',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: 'none'
    }));

    const bgColor = '#eceff1';
    const sideBarTextColor = '#78909c';

    return (

        <>

            <CssBaseline />
            <Box sx={{ display: "flex", height: "auto", color: sideBarTextColor }}>

                {/* Sidebar */}
                <SideBar isCollapsed={isCollapsed} handleToggle={handleToggle} />

                {/* Main Content */}
                <Box
                    sx={{
                        flexGrow: 1,
                        // paddingRight: 3,
                        // transition: "margin-left 0.3s ease-in-out",
                        marginLeft: isCollapsed ? `${collapsedWidth}px` : `${drawerWidth}px`,
                        backgroundColor: bgColor
                    }}
                >
                    <Item sx={{ height: 'fit-content', padding: '0' }}>
                        <Header />
                        <Outlet />
                    </Item>
                </Box>

            </Box >

        </>
    );
};

export default MasterLayout;
