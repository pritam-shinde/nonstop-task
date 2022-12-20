import { Container, Box, Paper, Typography, Button, List, Grid, makeStyles } from '@material-ui/core';
import { User } from './Components/Components';

const useStyles = makeStyles(theme => ({
    formHead: { fontSize: "1.2rem", fontWeight: 600 },
    addNewMember: { backgroundColor: "#18b78f", color: "#fff", '&:hover': { backgroundColor: "#14a681" } },
    userContainer: { height: "75vh", overflowY: "auto" }
}))

const Member = ({ addNewMember, user, updateUser, deleteUser }) => {
    const classes = useStyles();

    return (
        <>
            <Container maxWidth="xl">
                <Box component={Paper}>
                    <Box className='d-flex justify-content-between align-items-center flex-wrap px-5 py-3'>
                        <Box>
                            <Typography variant='h6' className={classes.formHead}>Members</Typography>
                        </Box>
                        <Box>
                            <Button className={`${classes.addNewMember} rounded-pill`} variant='contained' onClick={() => addNewMember(false)}>Add New Member</Button>
                        </Box>
                    </Box>
                    <Box py={2} px={3} className={classes.userContainer} >
                        <Grid container spacing={4}>
                            {
                                user.map(item => {
                                    return <Grid item xs={12} md={4}>
                                        <User user={item} key={item.id} updateUser={updateUser} deleteUser={deleteUser} />
                                    </Grid>
                                })
                            }
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Member
