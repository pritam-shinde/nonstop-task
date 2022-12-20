import React, { useState } from 'react';
import { Container, Box, Paper, Typography, Grid, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    formHead: { fontSize: "1.2rem", fontWeight: 600 },
    submitBtn: { backgroundColor: "#18b78f", color: "#fff", '&:hover': { backgroundColor: "#14a681", color: "#fff" }, marginRight: "0.5rem" },
    cancelBtn: { backgroundColor: "#dc3545", color: "#fff", '&:hover': { backgroundColor: "#bd2836", color: "#fff" }, }
}))

const AdminForm = ({ handleCloseNewAdminForm }) => {
    const [admin, setAdmin] = useState({
        adminName: "",
        adminEmail: "",
        adminPass: "",
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setAdmin((prevVal) => {
            return {
                ...prevVal,
                [name]: value,
            }
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        await fetch('https://my-json-server.typicode.com/pritam-shinde/task-api/admin', {
            method: 'POST',
            body: JSON.stringify({ id: new Date().getTime(), ...admin }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => console.log(`Successfully POST ${JSON.stringify(data)}`)).then(()=>{handleCloseNewAdminForm(false); setAdmin("")})
    }

    const handleOnChangeImage = () => {

    }

    const classes = useStyles();
    return (
        <>
            <Container>
                <Box component={Paper}>
                    <Grid container>
                        <Grid item xs={12} sm={11} md={10} lg={8} className="mx-auto">
                            <Box>
                                <Box pt={3}>
                                    <Typography variant="h6" className={classes.formHead}>Add New Admin</Typography>
                                </Box>
                                <Box py={3} px={5}>
                                    <form onSubmit={handleOnSubmit}>
                                        <Box className="form-group">
                                            <input type="text" placeholder="Name" className="form-control" name="adminName" onChange={handleOnChange} value={admin.fullName} required />
                                        </Box>
                                        <Box className="form-group">
                                            <input type="file" placeholder="Photo" className="form-control" onChange={handleOnChangeImage} accept="image/*" />
                                        </Box>
                                        <Box className="form-group">
                                            <input type="email" placeholder="Email" className="form-control" name="adminEmail" onChange={handleOnChange} value={admin.email} required />
                                        </Box>
                                        <Box className="form-group">
                                            <input type="password" placeholder="Password" className="form-control" id="pass" name="adminPass" onChange={handleOnChange} autoComplete="off" value={admin.pass} required />
                                        </Box>
                                        <Box className="form-group">
                                            <Button type="submit" variant='contained' className={`${classes.submitBtn} btn`} >Submit</Button>
                                            <Button variant='contained' className={`${classes.cancelBtn} btn`} onClick={() => { handleCloseNewAdminForm(false) }}>Cancel</Button>
                                        </Box>
                                    </form>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default AdminForm