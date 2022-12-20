import React, { useState } from 'react'
import { Box, Toolbar, IconButton, CssBaseline, styled, useTheme, Divider, Avatar, Tooltip, Button, makeStyles } from "@material-ui/core";
import { MenuOutlined, LeftOutlined, RightOutlined, } from '@ant-design/icons';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Logo from '../../Images/task.svg';
import Logo_Light from '../../Images/task_light-01 (1).png'

const drawerWidth = 240;

const useStyles = makeStyles(theme=>({
    addNewAdmin: { backgroundColor: "#18b78f", color: "#fff", '&:hover': { backgroundColor: "#14a681" }, marginRight: "0.5rem", },
}))

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const AppDrawer = ({addNewAdmin}) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

    const handleLogout =() =>{
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('pass');

        if(!sessionStorage.getItem('name') || !sessionStorage.getItem('pass') || !sessionStorage.getItem('email')){
            window.location.reload()
        }
    }

    const classes = useStyles();

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar className="bg-white" style={{ boxShadow: "none" }} position='fixed' open={open}>
                    <Toolbar>
                        <IconButton onClick={handleDrawerOpen} aria-label="open drawer" style={{  marginRight: '.5rem', ...(open && { display: 'none' }), }}>
                            <MenuOutlined />
                        </IconButton>
                        <img src={Logo} alt="Logo" style={{ width: "6rem", }} />
                        <Box style={{flexGrow:1}}  />
                         <Tooltip title={sessionStorage.getItem("name")}>
                        <IconButton onClick={handleLogout}><Avatar>{sessionStorage.getItem("name").split(" ")[0].charAt(0)+sessionStorage.getItem("name").split(" ")[1].charAt(0)}</Avatar></IconButton>
                        </Tooltip> 
                    </Toolbar>
                </AppBar>
                <Drawer  open={open} anchor="left" >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <RightOutlined className="text-white" /> : <LeftOutlined className="text-white" />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider className='bg-secondary' />
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
            </Box>
        </>
    )
}

export default AppDrawer