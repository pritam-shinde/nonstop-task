import React from 'react';
import { Container, Box, Paper, Typography, Button, List, ListItem, Avatar, Card, CardContent, CardActions, IconButton, Grid, makeStyles } from '@material-ui/core';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'


const useStyles = makeStyles(theme => ({
    formHead: { fontSize: "1.2rem", fontWeight: 600 },
    addNewMember: { backgroundColor: "#18b78f", color: "#fff", '&:hover': { backgroundColor: "#14a681" } },
    userContainer: { height: "75vh", overflowY: "auto" },
    nameText: { fontSize: "0.83rem", fontWeight: 700 },
    emailText: { fontSize: "0.67rem", fontWeight: 700 },
    card: { width: "100%",'&:hover':{backgroundColor:"#ebebeb91"} },
}))

const AdminPanel = ({ addNewAdmin, updateAdmin, handleDeleteAdmin, admin }) => {
    const classes = useStyles();
    return (
        <>
            <Container maxWidth="xl">
                <Box component={Paper}>
                    <Box className='d-flex justify-content-between align-items-center flex-wrap px-5 py-3'>
                        <Box>
                            <Typography variant='h6' className={classes.formHead}>Admin</Typography>
                        </Box>
                        <Box>
                            <Button className={`${classes.addNewMember} rounded-pill`} variant='contained' onClick={() => addNewAdmin(false)}>Add New Admin</Button>
                        </Box>
                    </Box>
                    <Box py={2} className={classes.userContainer} >
                        <List>
                            <Grid container spacing={1}>
                                {admin.map(item => {
                                    return <Grid item xs={12} md={6} key={item.id} >
                                        <ListItem>
                                            <Card className={`${classes.card} shadow`}>
                                                <CardContent>
                                                    <Box>
                                                        <Box className='d-flex justify-content-center align-items-center py-3'>
                                                            <Avatar alt={item.adminName} />
                                                        </Box>
                                                        <Box>
                                                            <Typography align="center" variant='h5' className={classes.nameText}>{item.adminName}</Typography>
                                                            <Typography align="center" className={classes.emailText}>{item.adminEmail}</Typography>
                                                        </Box>
                                                    </Box>
                                                </CardContent>
                                                <CardActions>
                                                    <IconButton size='small'>
                                                        <EditOutlined fontSize="small" className='text-primary' />
                                                    </IconButton>
                                                    <IconButton size='small' onClick={()=> handleDeleteAdmin(item.id)} >
                                                        <DeleteOutlined fontSize="small" className='text-danger' />
                                                    </IconButton>
                                                </CardActions>
                                            </Card>
                                        </ListItem>
                                    </Grid>
                                })}
                            </Grid>
                        </List>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default AdminPanel
