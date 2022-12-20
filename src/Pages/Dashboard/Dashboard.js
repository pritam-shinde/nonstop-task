import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Container, Box, Avatar, makeStyles, IconButton } from '@material-ui/core';
import { AppDrawer, InputContainer, List } from '../../Components/Component';

const useStyles = makeStyles(theme => ({
    root: { height: "100vh", padding: 0, margin: 0, overflowY: "hidden" },
    listContainer: { height: "91.9vh", backgroundImage: `linear-gradient(to left, #47d7acd4, #008ac3d9)`, display: "flex" },
    userListContainer: { position: "fixed", top: 0, bottom: 0, right: 0, width: "5rem", backgroundColor: "#3d474d", display: "flex", flexDirection: "column", alignItems: "center", height: "100%", overflowY: "scroll" }
}))

const Dashboard = ({ team }) => {
    const [taskList, setTaskList] = useState([]);
    const [taskData, setTaskData] = useState([]);
    const [allTeamMember, setAllTeamMember] = useState([]);
    const [isShowIndividualTask, setIsShowIndividualTask] = useState(true);
    const [width, setWidth] = useState();

    useEffect(() => {
        setWidth(window.innerWidth);
    }, [width, taskData])

    useEffect(() => {
        getList()
    }, [team, taskList])

    useEffect(() => {
        getTask()
    }, [taskData]);

    useEffect(() => {
        getAllTeamMember()
    }, [allTeamMember])


    const getTask = async () => {
        await fetch("https://nonstop-task-api.vercel.app/task").then(res => res.json()).then(data => setTaskData(data))
    }

    const getList = async () => {
        let res = await fetch(`https://nonstop-task-api.vercel.app/list/?team=${team}`).then(res => res.json()).then(data => setTaskList(data)).catch(error => console.log(error))
    }

    const addNewTask = async (task) => {
        console.log(task)
        let res = await fetch("https://nonstop-task-api.vercel.app/task", {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(res => res.json()).then(data => console.log("POST Successfully")).catch(error => console.error(`Error ${error}`))
    }

    const addNewList = async (list) => {
        console.log(list)
        const res = await fetch("https://nonstop-task-api.vercel.app/list", {
            method: "POST",
            body: JSON.stringify(list),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(res => res.json()).then(data => console.log("POST Successfully")).catch(error => console.error(`Error ${error}`))
    }

    const handleDeleteTask = async (card) => {
        let res = await fetch(`https://nonstop-task-api.vercel.app/task/${card.id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(res => res.json()).then(data => console.log("Delete Successfully")).catch(error => console.log(`Error ${error}`))
    }

    const getAllTeamMember = async () => {
        await fetch(`hhttps://nonstop-task-api.vercel.app/profile/?team=${team}`).then(res => res.json()).then(data => setAllTeamMember(data)).catch(error => console.log(error))
    }

    const showIndividual = async (user) => {
        await fetch(`https://nonstop-task-api.vercel.app/task/?assign=${user}`).then(res => res.json()).then(data => setTaskData(data)).catch(error => console.log(error));
        setIsShowIndividualTask(false)
    }

    const classes = useStyles();
    return (
        <>
            <Container className={`${classes.root} p-0 m-0`} maxWidth="xl">
                <AppDrawer />
                <Box className={classes.listContainer} style={{ marginTop: width < 576 ? "3.6rem" : "4rem" }}>
                    {
                        taskList.map(item => {
                            return <List list={item} key={item.id} taskData={taskData} addNewTask={addNewTask} handleDeleteTask={handleDeleteTask} />
                        })
                    }
                    <InputContainer type="list" addNewList={addNewList} />
                    <Box className={classes.userListContainer} pt={10}  >
                        {
                            allTeamMember.map(member => {
                                return <Box mt={2}  >
                                    <IconButton onClick={() => showIndividual(member.fullName)}><Avatar>{member.fullName.split(" ")[0].charAt(0) + member.fullName.split(" ")[1].charAt(0)}</Avatar></IconButton>
                                </Box>
                            })
                        }
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Dashboard