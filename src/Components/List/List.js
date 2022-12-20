import { useEffect, useState } from "react";
import { Paper, CssBaseline, Box, makeStyles, } from "@material-ui/core";
import { Droppable } from "react-beautiful-dnd";
import { Title, Card, InputContainer } from "../Component";

const useStyles = makeStyles(theme => ({
    root: { backgroundColor: "transparent", overflowY: "auto", overflowX: "hidden", },
    cardContainer: { marginTop: theme.spacing(4) }
}))

const List = ({ list, taskData, addNewTask, handleDeleteTask }) => {
    const [width, setWidth] = useState();
    useEffect(() => {
        setWidth(window.innerWidth)
    }, [width]);
    const task = taskData.filter(entries=>{
        return entries.team === localStorage.getItem('team')
    });

    let filterTask = task.filter(entries=>{
        return entries.listId === list.id
    });

    const classes = useStyles();
    return (
        <>
            <Paper className={classes.root} style={{width:"fit-content"}}>
                <CssBaseline />
                <Title title={list.title} bgColor={list.bgColor} badge={filterTask.length}  />
                <Box style={{ paddingTop: "4rem", width:"fit-content" }}>
                        {
                            <Box className={classes.cardContainer}>
                                {
                                    filterTask.map((item, index)=>{
                                        return <Card card={item} key={item.id} index={index} handleDeleteTask={handleDeleteTask} />
                                    })
                                }
                            </Box>
                        }
                    <InputContainer listId={list.id} type="card" addNewTask={addNewTask} />
                </Box>
            </Paper>
        </>
    )
}

export default List