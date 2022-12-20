import { useEffect, useState } from 'react';
import { Box, ListItem, Paper, Typography, Collapse, Avatar, Button, Divider, Card, IconButton, CardActions, CardContent, makeStyles } from '@material-ui/core';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import userImg from './Images/IMG_20211119_193450 (1).jpg';

const useStyles = makeStyles(theme => ({
    submitBtn: { backgroundColor: "#18b78f", color: "#fff", '&:hover': { backgroundColor: "#14a681", color: "#fff" }, marginRight: "0.5rem" },
    cancelBtn: { backgroundColor: "#dc3545", color: "#fff", '&:hover': { backgroundColor: "#bd2836", color: "#fff" }, },
    card: { width: "100%", '&:hover':{backgroundColor:"#ebebeb91"} },
    nameText: { fontSize: "0.83rem", fontWeight: 700 },
    emailText: { fontSize: "0.67rem", fontWeight: 700 }
}))

const User = ({ user, updateUser, deleteUser }) => {
    const classes = useStyles()
    return (
        <>
            <Card className={`${classes.card} shadow`} >
                <CardContent>
                    <Box>
                        <Box className='d-flex justify-content-center align-items-center py-3'>
                            <Avatar src={userImg} alt={user.fullName} />
                        </Box>
                        <Box>
                            <Typography align="center" variant='h5' className={classes.nameText}>{user.fullName}</Typography>
                            <Typography align="center" className={classes.emailText}>{user.email}</Typography>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions>
                    <IconButton size='small' onClick={() => updateUser(user.id)}>
                        <EditOutlined fontSize="small" className='text-primary' />
                    </IconButton>
                    <IconButton size='small' onClick={() => deleteUser(user.id)}>
                        <DeleteOutlined fontSize="small" className='text-danger' />
                    </IconButton>
                </CardActions>
            </Card>
        </>
    )
}

export default User
