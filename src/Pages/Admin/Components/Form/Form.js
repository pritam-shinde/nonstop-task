import { useContext, useState } from 'react';
import { Container, Box, Paper, Typography, Grid, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    formHead: { fontSize: "1.2rem", fontWeight: 600 },
    submitBtn: { backgroundColor: "#18b78f", color: "#fff", '&:hover': { backgroundColor: "#14a681", color: "#fff" }, marginRight: "0.5rem" },
    cancelBtn: { backgroundColor: "#dc3545", color: "#fff", '&:hover': { backgroundColor: "#bd2836", color: "#fff" }, }
}))


const Form = ({ handleCloseNewMemForm, updateUser, formData, setUpdateFormData, method }) => {
    const [user, setUser] = useState({
        fullName: "",
        designation: "",
        team: "",
        email: "",
        pass: "",
        cPass: "",
        uid: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser((prevVal) => {
            return {
                ...prevVal,
                [name]: value,
            }
        })
    }

    const handleOnChangeImage = (e) => {
        let file = e.target.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (e) => {
            setUser((prevVal) => {
                return {
                    ...prevVal,
                    photo: file
                }
            })
        });
        reader.readAsDataURL(file)
    }

    const handleOnSubmit = async (e) => {
        if (method === "POST") {
            e.preventDefault();
            handleCloseNewMemForm(false);

            await fetch('https://my-json-server.typicode.com/pritam-shinde/task-api/profile', {
                method: 'POST',
                body: JSON.stringify({ id: new Date().getTime(), ...user }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((data) => console.log(`Successfully POST ${JSON.stringify(data)}`)).catch(err => console.log(`err ${err}`));
            updateUser(user)
        } else if (method === "GET") {
            e.preventDefault();
            setUpdateFormData("text")
        }


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
                                    <Typography variant="h6" className={classes.formHead}>Add New Member</Typography>
                                </Box>
                                <Box py={3} px={5}>
                                    <form method={method} onSubmit={handleOnSubmit}>
                                        <Box className="form-group">
                                            <input type="text" placeholder="Name" className="form-control" name="fullName" onChange={handleOnChange} value={user.fullName} required />
                                        </Box>
                                        <Box className="form-group">
                                            <input type="text" placeholder="Designation" className="form-control" name="designation" onChange={handleOnChange} value={user.designation} required />
                                        </Box>
                                        <Box className="form-group">
                                            <input type="text" placeholder="Team" className="form-control" onChange={handleOnChange} name="team" value={user.team} required />
                                        </Box>
                                        <Box className="form-group">
                                            <input type="text" placeholder="UserId" className="form-control" onChange={handleOnChange} name="uid" value={user.uid} required />
                                        </Box>
                                        <Box className="form-group">
                                            <input type="file" placeholder="Photo" className="form-control" onChange={handleOnChangeImage} accept="image/*" />
                                        </Box>
                                        <Box className="form-group">
                                            <input type="email" placeholder="Email" className="form-control" name="email" onChange={handleOnChange} value={user.email} required />
                                        </Box>
                                        <Box className="form-group">
                                            <input type="password" placeholder="Password" className="form-control" id="pass" name="pass" onChange={handleOnChange} autoComplete="off" value={user.pass} required />
                                        </Box>
                                        <Box className="form-group">
                                            <input type="password" placeholder="Confirm Password" className="form-control" id="cPass" name="cPass" onChange={handleOnChange} autoComplete="off" value={user.cPass} required />
                                        </Box>
                                        <Box className="form-group">
                                            <Button type="submit" variant='contained' className={`${classes.submitBtn} btn`} >Submit</Button>
                                            <Button variant='contained' className={`${classes.cancelBtn} btn`} onClick={() => { handleCloseNewMemForm(false) }}>Cancel</Button>
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

export default Form