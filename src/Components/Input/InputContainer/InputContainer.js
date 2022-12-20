import { useState } from "react";
import { Box, Paper, Typography, makeStyles, Collapse, alpha } from "@material-ui/core"
import { PlusCircleOutlined, } from '@ant-design/icons';
import { InputCard } from '../../Component'

const useStyles = makeStyles(theme => ({
    root: { marginTop: theme.spacing(2), width:"300px" },
    addCard: { padding: theme.spacing(1, 1, 1, 2), margin: theme.spacing(0, 1, 1, 1), backgroundColor: "transparent", },
    addIcon: { fontSize: "2rem", color: "#fff", "&:hover": { color: alpha("#000", 0.25) } }
}))

const InputContainer = ({listId, type, addNewTask, addNewList}) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    return (
        <>
            <Box className={classes.root}>
                <Collapse in={open}>
                    <InputCard listId={listId} type={type} setOpen={setOpen} addNewTask={addNewTask} addNewList={addNewList} />
                </Collapse>
                <Collapse in={!open}>
                <Paper className={classes.addCard} elevation={0}>
                    <Typography align="center"><PlusCircleOutlined className={classes.addIcon} onClick={() => setOpen(!open)} /></Typography>
                </Paper>
                </Collapse>
            </Box>
        </>
    )
}

export default InputContainer
