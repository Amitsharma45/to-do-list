import React, { useState, useEffect } from 'react'
import './Home.scss';
import Navbar from './Navbar'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Showdata from './Showdata';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { getDatabase, ref, onValue, set } from "firebase/database";




const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)', borderColor: 'rgba(0, 0, 0, 0.4)',
        width: '300px',
        height: '380px',
        margin:'20px 0px',
        overflowY:'scroll',
        scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            // backgroundColor: "#2b2b2b",
                width: '0.4em'
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            // backgroundColor: "#6b6b6b",
                backgroundColor: 'rgba(0,0,0,.1)',
            minHeight: 24,
            border: "1px solid slategrey",
          },
        [theme.breakpoints.between('sm', 'md')]: {
        // backgroundColor: 'red',
        width:'250px',
        
        }
        
    },
    h2: {
        textAlign: 'center',
        margin: '5px 0px 20px 0px',
        
    },
    nav:{
        
    }
}));

function Home(props) {

    const classes = useStyles();
    // 3Lr1Lcts4CSosywz0xrK6YtjDIv2
    const { userid, signout ,displayname} = props;
    const [input, setinput] = useState();
    const [data, setdata] = useState([]);
    const [work, setwork] = useState([]);
    const [comp, setcomp] = useState([]);
    const [load, setload] = useState(false);
    
    // {data:'dfsd',time:'cvdc'},{data:'dfsd',time:'cvdc'}
    const db = getDatabase();
    
    

    useEffect(() => {
        const starCountRef = ref(db, 'users/' + userid);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            // console.log(work);
            if (data !== null) {
                if (data.data !== undefined) {
                    setdata(data.data);

                }else{
                    setdata([]);
                }
                if (data.work !== undefined) {
                    setwork(data.work);

                }else{
                    setwork([]);
                }
                if (data.comp !== undefined) {
                    setcomp(data.comp);
                }else{
                    setcomp([]);
                }
                // console.log(data.work);
            }
            setload(true);
            
        });
        // console.log('1');
        // console.log(work);
    },[]);
    
    useEffect(() => {
        
        function writeUserData(userid, data, work, comp) {
            
            // console.log(work);
        // const db = getDatabase();
            set(ref(db, 'users/' + userid), {
                data: data,
                work: work,
                comp: comp,
            });
            
        }
        if(load){
            // setTimeout(() => {
                writeUserData(userid, data, work, comp);
                // setload(true);
                // console.log('2');
            // }, 5000);
        }
    },[data,work,comp]);


    const addinput =  () => {

        const d = new Date();
        const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
        const value = {
            data: input,
            time: days[d.getDay()] + ' ' + String(d.getDate()) + ', ' + String(d.getHours()) + ':' + String(d.getMinutes())
        }
        setdata([...data, value]);
        // console.log('hi i clicked');
        setinput('');
        // writeUserData(userid, data, work, comp);
    }
    const del = (value, mark) => {
        if (mark === "a") {
            setdata(data.filter((e) => { return e !== value }));
        } else if (mark === "b") {
            setwork(work.filter((e) => { return e != value }));
        } else {
            setcomp(comp.filter((e) => { return e != value }));
        }
        // writeUserData(userid, data, work, comp);
    }
    const edit = (value, mark) => {
        setinput(value.data);
        del(value, mark);
    }
    const swap = (input, mark, n) => {
        if (mark === "a") {
            if (n === 0) {
                setwork([...work, input]);
                // console.log(n);
            } else {
                setcomp([...comp, input]);
            }
        } else if (mark === "b") {
            if (n === 0) {
                setdata([...work, input]);
                // console.log(n);
            } else {
                setcomp([...comp, input]);
            }
        } else {
            if (n === 0) {
                setdata([...data, input]);
                // console.log(n);
            } else {
                setwork([...work, input]);
            }

        }
        del(input, mark);
        // writeUserData(userid, data, work, comp);

    }

    return (
        <div className='home' >
            <Navbar displayname={displayname} signout={signout} />
            <div className='addtask'>
                <form onSubmit={(e) => { e.preventDefault() }} noValidate>
                    <TextField
                    
                        required='true'
                        // id="outlined-required"
                        id='text'
                        label="Add Task"
                        size="small"
                        variant="outlined"
                        value={input}
                        onChange={e => setinput(e.target.value)}

                    />
                    <Box ml={1} display="inline"  >
                        <Button
                        id='input'
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
                <Paper overflow='hidden' className={classes.root} variant="outlined" >
                    <List  >
                        <h2 className={classes.h2} >Active Task: {data.length}</h2>
                        {data.map(input => (
                            <Showdata input={input} del={del} mark={{ a: 'Working', b: 'Completed' }} edit={edit} swap={swap} temp={'a'} />
                        ))}
                    </List>
                </Paper>
                <Paper className={classes.root} variant="outlined" >
                    <List  >
                        <h2 className={classes.h2}>In Working: {work.length}</h2>
                        {work.map(input => (
                            <Showdata input={input} del={del} mark={{ a: 'Active', b: 'Completed' }} edit={edit} swap={swap} temp={'b'} />
                        ))}
                    </List>
                </Paper>
                <Paper className={classes.root} variant="outlined" >
                    <List  >
                        <h2 className={classes.h2}>Completed: {comp.length}</h2>
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








