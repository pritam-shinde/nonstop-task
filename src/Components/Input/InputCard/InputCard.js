import { useContext, useState } from "react";
import { Paper, InputBase, Box, Button, alpha, makeStyles } from "@material-ui/core";
import { CloseCircleOutlined } from '@ant-design/icons';

const useStyles = makeStyles(theme => ({
    closeIcon: { fontSize: "2rem", color: "#fff", "&:hover": { color: alpha("#000", 0.25) } },
    card: { margin: theme.spacing(0, 1, 1, 1), paddingBottom: theme.spacing(4) },
    input: { margin: theme.spacing(1) },
    confirmBtn: { backgroundColor: "#28a745;", color: "#fff", marginRight: "0.5rem", "&:hover": { backgroundColor: "#1ca13a" } },
    confirm: { margin: theme.spacing(0, 1, 1, 1) }
}))

const InputCard = ({ setOpen, listId, type, addNewTask, addNewList }) => {
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("")
    const classes = useStyles();

    const handleOnChange = (e) => {
        setTitle(e.target.value)
    }

    const handleConfirm = () => {
        if (type === "card") {
            setOpen(false);
            if (title !== "") {
                addNewTask({
                    id: new Date().getTime(),
                    listId: listId,
                    task: title,
                    assign: localStorage.getItem('name'),
                    team: localStorage.getItem('team')
                })
            } else {
                alert("Task must not be empty..!")
            }
            setTitle("")
        } else if (type === "list") {
            setOpen(false);
            if (title !== "") {
                addNewList({
                    id: localStorage.getItem('team') === "Development" ? `devList-${new Date().getTime()}` : `SeoList-${new Date().getTime()}`,
                    title: title,
                    bgColor: color,
                    team: localStorage.getItem('team')
                })
            }else{
                alert("List name must not be empty...!")
            }
        }

    }
    return (
        <>
            <Box>
                <Box>
                    <Paper className={classes.card}>
                        <InputBase fullWidth multiline inputProps={{ className: classes.input }} placeholder={type !== "list" ? "Enter a Task..." : "Add another list..."} onChange={handleOnChange} value={title} />
                        {
                            type === "list" ? <input type="color" onChange={(e) => setColor(e.target.value)} /> : null
                        }
                    </Paper>
                </Box>
                <Box className={classes.confirm}>
                    <Button className={classes.confirmBtn} onClick={handleConfirm}>{type !== "list" ? "Add a Task" : "Add a List"}</Button>
                    <CloseCircleOutlined className={classes.closeIcon} onClick={() => setOpen(false)} />
                </Box>
            </Box>
        </>
    )
}

export default InputCard
