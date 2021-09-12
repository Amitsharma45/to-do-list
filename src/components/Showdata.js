import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '5px  20px'

    // 
  },
  list: {
    padding: "0px 10px",
    border: '1px solid rgba(0, 0, 0, 0.4)',
    borderRadius: '5px'
  },
  b: {
    wordBreak: 'break-all'
  },
  primary: {
    // color:'red',
    fontSize: '18px'
  },
  secondary: {
    // color:'red',
    fontSize: '12px',
    paddingLeft: '8px'
  },
  menuitem:{
    fontSize :'12px'
  }
}));


export default function Showdata(props) {
  const { input, del ,mark,edit,swap,temp} = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
        <Paper className={classes.root} variant="outlined" >
          <ListItem className={classes.list} >
            <ListItemText primary={<div className={classes.primary}>{input.data}</div>} secondary={<div className=
              {classes.secondary}>{input.time}</div>} />
            <>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    // fontSize :'10px',
                    width: '16ch'
                  },
                }}
              >
                <MenuItem className={classes.menuitem} onClick={()=>{
                  edit(input,temp);
                  handleClose()
                }}>
                  Edit
                </MenuItem>
                <MenuItem className={classes.menuitem} onClick={()=>{
                  del(input ,temp);
                  handleClose()
                }}>
                  Delete
                </MenuItem>
                <MenuItem className={classes.menuitem} onClick={()=>{
                  swap(input,temp,0);
                  handleClose()
                }}>
                  Mark as {mark.a}
                </MenuItem>
                <MenuItem className={classes.menuitem} onClick={()=>{
                  swap(input,temp,1);
                  handleClose()
                }}>
                  Mark as {mark.b}
                </MenuItem>
              </Menu>
            </>
          </ListItem>
        </Paper>
    </>
  );
}
