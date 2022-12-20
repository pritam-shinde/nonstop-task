import { useState } from 'react'
import { Box, Typography, InputBase, Badge, makeStyles, alpha } from '@material-ui/core';
import { MoreOutlined, UnorderedListOutlined } from '@ant-design/icons';

const useStyles = makeStyles(theme => ({
    editableTitle: { marginLeft: theme.spacing(1), flexGrow: 1, fontSize:"1.2rem", fontWeight:"bold", color:"#fff" },
    editableTitleContainer: {  padding: theme.spacing(1), display: "flex",  },
    icon: { margin: theme.spacing(1) }, 
    input:{margin: theme.spacing(1), fontSize:"1.2rem", fontWeight:"bold" ,"&:focus":{backgroundColor: alpha("#ddd",0.25)}}
}))

const Title = ({title, bgColor, icon, badge}) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    return (
        <>
             {
                open ?
                    (<Box>
                        <InputBase value={title} inputProps={{className:classes.input}} fullWidth onBlur={()=>setOpen(!open)} autoFocus />
                    </Box>)
                    :
                    (<Box className={`${classes.editableTitleContainer} shadow-lg`} style={{backgroundColor:bgColor, position:"fixed", width:"300px",boxShadow: "0 1rem 3rem rgba(0, 0, 0, 0.175)" }}>
                        {title.icon}
                        <Typography onClick={() => setOpen(!open)} className={classes.editableTitle}>{title}</Typography>
                        <Box>
                            <Badge badgeContent={badge} color="secondary" className={classes.icon}>
                                <UnorderedListOutlined className="text-white" />
                            </Badge>
                            <MoreOutlined className={`${classes.icon} text-white`} />
                        </Box>
                    </Box>)
            } 
        </>
    )
}

export default Title
