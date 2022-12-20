import { Paper, Box, Avatar, Tooltip, makeStyles } from "@material-ui/core";
import { DeleteOutlined } from '@ant-design/icons';

const useStyles = makeStyles(theme => ({
    card: { padding: theme.spacing(2), margin: theme.spacing(1), color: "#20a37b", fontWeight: 600, marginBottom: theme.spacing(1.5) },
    delBtn: { marginLeft: "0.5rem" }
}))

const Card = ({ card, index, title, handleDeleteTask }) => {
    const classes = useStyles()
    return (
        <>
            <Box>
                <Paper className={`${classes.card} shadow-lg`}><Box className="d-flex justify-content-between">
                    {card.task}
                    <Box className="d-flex">
                        <Tooltip title={card.assign}>
                            <Avatar alt="avatar" style={{ height: "1rem", width: "1rem", marginRight: title !== "Done" ? 0 : "0.5rem", fontSize: "0.6rem" }}>{card.assign.split(" ")[0].charAt(0) + card.assign.split(" ")[1].charAt(0)}</Avatar>
                        </Tooltip>
                        <DeleteOutlined className={`text-danger ${classes.delBtn}`} onClick={()=>handleDeleteTask(card)} />
                    </Box>
                </Box></Paper>
            </Box>
        </>
    )
}

export default Card
