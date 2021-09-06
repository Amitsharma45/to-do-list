import React, { useState } from 'react'
import './Home.scss';
import Navbar from './Navbar'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Showdata from './Showdata';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)', borderColor: 'rgba(0, 0, 0, 0.4)',
        width: '300px',
        height: '380px'
    },
    h2: {
        textAlign: 'center',
        margin: '5px 0px 20px 0px'
    }
}));

function Home(props) {

    const classes = useStyles();
    const { userid, signout } = props;
    const [input, setinput] = useState();
    const [data, setdata] = useState([]);
    const [work, setwork] = useState([]);
    const [comp, setcomp] = useState([]);
    // {data:'dfsd',time:'cvdc'},{data:'dfsd',time:'cvdc'}

    const addinput = () => {
        const d = new Date();
        const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
        const value = {
            data: input,
            time: days[d.getDay()] + ' ' + String(d.getDate()) + ', ' + String(d.getHours()) + ':' + String(d.getMinutes())
        }
        setdata([...data, value]);
        // console.log(data);
        setinput('');
    }
    const del = (value,mark) => {
        if(mark==="a"){
            setdata(data.filter((e)=> { return e != value }));
        }else if(mark==="b"){
            setwork(work.filter((e)=> { return e != value }));
        }else{
            setcomp(comp.filter((e)=> { return e != value }));
        }
    }
    const edit = (value,mark) => {
        setinput(value.data);
        del(value,mark);
    }
    const swap = (input,mark,n) => {
        if(mark==="a"){
            if(n === 0){
                setwork([...work,input]);        
                // console.log(n);
            }else{
                setcomp([...comp,input]);        
            }
        }else if(mark==="b"){
            if(n === 0){
                setdata([...work,input]);        
                // console.log(n);
            }else{
                setcomp([...comp,input]);        
            }
        }else{
            if(n === 0){
                setdata([...data,input]);        
                // console.log(n);
            }else{
                setwork([...work,input]);        
            }

        }
        del(input,mark);
        
    }

    return (
        <div className='home' >
            <Navbar userid={userid} signout={signout} />
            <div className='addtask'>
                <form onSubmit={(e) => { e.preventDefault() }} noValidate>
                    <TextField
                        required='true'
                        id="outlined-required"
                        label="Add Task"
                        size="small"
                        variant="outlined"
                        value={input}
                        onChange={e => setinput(e.target.value)}

                    />
                    <Box ml={1} display="inline"  >
                        <Button
                            disabled={!input}
                            className='addtask-button'
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={addinput}
                        >
                            Add Task
                        </Button>
                    </Box>

                </form>
            </div>
            <div className='show'>
                <Paper className={classes.root} variant="outlined" >
                    <List  >
                        <h2 className={classes.h2} >Active Task: {data.length}</h2>
                        {data.map(input => (
                            <Showdata input={input} del={del} mark={{ a: 'Working', b: 'Completed' }} edit={edit} swap={swap} temp={'a'}/>
                        ))}
                    </List>
                </Paper>
                <Paper className={classes.root} variant="outlined" >
                    <List  >
                        <h2 className={classes.h2}>In Working</h2>
                        {work.map(input => (
                            <Showdata input={input} del={del} mark={{ a: 'Active', b: 'Completed' }} edit={edit} swap={swap} temp={'b'}/>
                        ))}
                    </List>
                </Paper>
                <Paper className={classes.root} variant="outlined" >
                    <List >
                        <h2 className={classes.h2}>Completed</h2>
                        {comp.map(input => (
                            <Showdata input={input} del={del}
                                mark={{ a: 'Active', b: 'Working' }} edit={edit} swap={swap} temp={'c'} />
                        ))}
                    </List>
                </Paper>
            </div>
        </div>
    )
}

export default Home;








