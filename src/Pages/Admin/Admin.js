import { useEffect, useState, useContext } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core"
import { Form, AppDrawer, Member, AdminPanel, AdminForm } from "./Components/Components";
import { AdminLogin } from "../Pages";

const useStyles = makeStyles(theme => ({
    root: { padding: 0, margin: 0, overflowY: "hidden", backgroundImage: `linear-gradient(to left, #47d7acd4, #008ac3d9)`, },
    main: { marginTop: "3rem", overflowY: "auto" }
}))

const Admin = () => {
    const [width, setWidth] = useState();
    const [newUser, setNewUser] = useState([]);
    const [newAdmin, setNewAdmin] = useState([])
    const [open, setOpen] = useState(false);
    const [openAdmin, setOpenAdmin] = useState(false)
    const [updateFormData, setUpdateFormData] = useState({});
    const [method, setMethod] = useState("")

    useEffect(() => {
        setWidth(window.innerWidth)
    }, [width, method,]);

    useEffect(() => {
        getMembers()
    }, [newUser])

    useEffect(() => {
        getAdmin()
    }, [newAdmin])

    const addNewMember = () => {
        setOpen(!open)
        setMethod("POST")
    }

    const addNewAdmin = () => {
        setOpenAdmin(!openAdmin)
    }

    const handleCloseNewMemForm = () => {
        setOpen(!open)
    }

    const handleCloseNewAdminForm = () => {
        setOpenAdmin(!openAdmin)
    }


    const handleUpdateUser = async (userId, text) => {
        // console.log(userId, text )
    }

    const handleDeleteUser = async (userId) => {
        let response = await fetch(`https://nonstop-task-api.vercel.app/profile/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(res => res.json()).then(data => console.log(data));
    }

    const handleDeleteAdmin = async (adminId) => {
        let response = await fetch(`https://nonstop-task-api.vercel.app/admin/${adminId}`, {
            method: "DELETE",
            eaders: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(res => res.json()).then(data => console.log(data));
    }

    const getMembers = async () => {
        let res = await fetch("https://nonstop-task-api.vercel.app/profile", {
            method: "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(res => res.json()).then(data => setNewUser(data)).catch(error => console.error(error))
    }

    const getAdmin = async () => {
        let res = await fetch("https://nonstop-task-api.vercel.app/admin", {
            method: "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(res => res.json()).then(data => setNewAdmin(data)).catch(error => console.error(error))
    }

    const classes = useStyles()

    if (!sessionStorage.getItem('email') || !sessionStorage.getItem('pass') || !sessionStorage.getItem('name')) {
        return <AdminLogin />
    }
    return (
        <>
            <Container className={classes.root} maxWidth="xl" style={{ height: width < 576 ? "auto" : "100vh" }}>
                <AppDrawer />
                <main className={classes.main}>
                    <Grid container>
                        <Grid item lg={4} className="d-lg-block d-none">
                            {openAdmin ? <AdminForm handleCloseNewAdminForm={handleCloseNewAdminForm} /> : <AdminPanel addNewAdmin={addNewAdmin} admin={newAdmin} handleDeleteAdmin={handleDeleteAdmin} />}
                        </Grid>
                        <Grid item xs={12} sm={11} md={10} lg={8}>
                            {open ? <Form method={method} setUpdateFormData={setUpdateFormData} handleCloseNewMemForm={handleCloseNewMemForm} formData={updateFormData} updateUser={handleUpdateUser} /> : <Member user={newUser} addNewMember={addNewMember} updateUser={handleUpdateUser} deleteUser={handleDeleteUser} />}
                        </Grid>
                    </Grid>
                </main>
            </Container>
        </>
    )
}

export default Admin