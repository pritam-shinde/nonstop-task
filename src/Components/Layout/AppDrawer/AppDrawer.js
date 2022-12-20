import React, { useState } from 'react'
import { AppBar, Toolbar, Box, CssBaseline, IconButton, Avatar, Drawer, styled, useTheme, Divider, List, ListItem, ListItemIcon, ListItemText, Tooltip, } from "@material-ui/core";
import { MenuOutlined, LeftOutlined, RightOutlined, HomeOutlined, FlagOutlined, BarChartOutlined, } from '@ant-design/icons';
import { Home } from '../../../Pages/Pages';
import Logo from './Images/task.svg';
import DrawerLogo from './Images/task_light-01 (1).png';
import './sass/AppDrawer.css';

const drawerWidth = 300;

const DrawerHeader = styled('Box')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const AppDrawer = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogOut = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('pass');
        localStorage.removeItem('team');

        if (!localStorage.getItem('email') || !localStorage.getItem('pass') || !localStorage.getItem('team')) {
            window.location.reload()
        }
    }


    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar className="bg-white shadow-none" position="fixed" open={open}>
                    <Toolbar>
                        <Box>
                            <IconButton onClick={handleDrawerOpen} edge="start" style={{ marginRight: "0.5rem" }}>
                                <MenuOutlined />
                            </IconButton>
                            <img src={Logo} alt="Logo" style={{ width: "6rem", display: open ? "none" : "inline" }} />
                        </Box>
                        <Box style={{ flexGrow: 1 }} />
                        <Box>
                            <Tooltip title={localStorage.getItem("name")}>
                                <IconButton onClick={handleLogOut}>
                                    <Avatar>{localStorage.getItem("name").split(" ")[0].charAt(0) + localStorage.getItem("name").split(" ")[1].charAt(0)}</Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer style={{ backgroundColor: "#293033" }} sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', }, }} variant="persistent" anchor="left" open={open}>
                    <DrawerHeader>
                        <img src={DrawerLogo} alt="Logo" style={{ width: "6rem", display: open ? "inline" : "none" }} />
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <LeftOutlined className="text-white" /> : <RightOutlined className="text-white" />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {[{ id: "drawer-list1", title: "Dashboard", icon: <HomeOutlined /> }, { id: "drawer-list2", title: "Agenda", icon: <FlagOutlined /> }, { id: "drawer-list3", title: "Reports", icon: <BarChartOutlined /> }].map(item => {
                            return <><ListItem key={item.id}>
                                <ListItemIcon className="text-white">{item.icon}</ListItemIcon>
                                <ListItemText className="text-white" style={{ fontSize: "1.5rem" }} primary={item.title} />
                            </ListItem>
                                <Divider className="bg-secondary" /></>
                        })}
                    </List>
                </Drawer>
            </Box>
        </>
    )
}

export default AppDrawer
