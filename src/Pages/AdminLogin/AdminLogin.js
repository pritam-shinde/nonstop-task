
import { Container, Box, Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import { useState } from "react";
import BgImg from './Images/bg.jpg';
import Logo from './Images/Logo.svg';
import {Admin} from '../Pages'

const useStyle = makeStyles(theme => ({
    root: { height: "100vh", width: "100%", overflow: "hidden", backgroundImage: `linear-gradient(to left, #47d7acd4, #008ac3d9),url("${BgImg}")`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center" },
    heading: { fontSize: "1.25rem", letterSpacing: "1px", fontWeight: 700 },
    forgotPassBtn: { color: "#47d7ac", "&:hover": { color: "#2da17e" } },
    loginBtn: { backgroundColor: "#18b78f", color: "#fff" },
    input:{fontSize:"0.8rem"}
}))

const AdminLogin = () => {
    const [user, setUser] = useState([])
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevVal) => {
            return {
                ...prevVal,
                [name]: value
            }
        })
    }

    const validateLoginDetails = (loginEmail, loginPass) =>{
        if(user){
            user.map(item=>{
                const {adminEmail, adminPass, adminName} = item;

                if(adminEmail === loginEmail && adminPass === loginPass ){
                    sessionStorage.setItem("email", adminEmail);
                    sessionStorage.setItem("pass", adminPass);
                    sessionStorage.setItem("name", adminName)
                }
                return true;
            })
        }
    }

    const validLogin = async ({ email, password }) => {
        let response = await fetch(`https://my-json-server.typicode.com/pritam-shinde/nonstop-task-api/admin/?adminEmail=${email}`, {
            method:"GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(res=> res.json()).then(data=> data.length === 1 ? setUser(data) : alert("User is not exist...!"))

        validateLoginDetails(email, password)
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault();
        validLogin(loginData)
    }

    const classes = useStyle();
    if(sessionStorage.getItem("email") && sessionStorage.getItem("pass") && sessionStorage.getItem("name")){
        return <Admin  />
    }
    return (
        <>
             <Container className={`${classes.root}`} maxWidth="xl"  >
                <Box style={{ height: "inherit" }}>
                    <Grid container style={{ height: "inherit" }}>
                        <Grid item xs={12} sm={10} md={8} className="mx-auto" style={{ height: "inherit" }}>
                            <Box style={{ height: "inherit" }} className="d-flex justify-content-center align-items-center">
                                <Grid container>
                                    <Grid item xs={12} lg={8}>
                                        <Box className="text-lg-left text-md-left text-xs-center  py-md-0 py-3">
                                            <img src={Logo} alt="" style={{ width: "10rem", height: "auto" }} />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <Box className="shadow-lg" component={Paper} py={8}>
                                            <Box>
                                                <Typography align="center" className={`text-uppercase ${classes.heading}`} variant="h1">sign in <span style={{ color: "#47d7ac", fontWeight: 700 }}>for Admin</span></Typography>
                                            </Box>
                                            <Box pt={5} px={6}>
                                                <form onSubmit={handleOnSubmit}>
                                                    <div className="form-group">
                                                        <input type="email" name="email" placeholder="Email" className={`form-control ${classes.input}` } value={loginData.email} onChange={handleOnChange} autoComplete="off" required />
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="password" name="password" placeholder="Password" className={`form-control ${classes.input}` } value={loginData.password} onChange={handleOnChange} autoComplete="off" required />
                                                    </div>
                                                    <div className="form-group">
                                                        <button className={`btn btn-link p-0 text-decoration-none ${classes.forgotPassBtn}`}>Forgot Password?</button>
                                                    </div>
                                                    <div className="form-group">
                                                        <button className={`btn d-block w-100 ${classes.loginBtn}`} type="submit">LOGIN</button>
                                                    </div>
                                                </form>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Box className="text-lg-left text-md-left text-xs-center  py-md-0 py-3">
                                            <Typography className="text-white" style={{ fontWeight: 600, fontSize: "1.5rem" }}>Lorem ipsum dolor sit amet consectetur</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default AdminLogin
