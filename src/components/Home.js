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
    const { userid, signout ,displayname,loading,setLoading} = props;
    const [input, setinput] = useState();
    const [data, setdata] = useState([]);
    const [work, setwork] = useState([]);
    const [comp, setcomp] = useState([]);
    const [load, setload] = useState(true);
    const db = getDatabase();
    

    useEffect(() => {
        setLoading(true);
        const starCountRef = ref(db, 'users/' + userid);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
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
            }  
        });
    },[]);

    
    useEffect(() => {
        
        function writeUserData(userid, data, work, comp) {
            set(ref(db, 'users/' + userid), {
                data: data,
                work: work,
                comp: comp,
            });
            
        }
        if(load){
                writeUserData(userid, data, work, comp);
        }
    },[data,work,comp]);


    const addinput =  () => {
        if(input.trim() !== ''){
            const d = new Date();
            const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
            const value = {
                data: input,
                time: days[d.getDay()] + ' ' + String(d.getDate()) + ', ' + String(d.getHours()) + ':' + String(d.getMinutes())
            }
            setdata([...data, value]);
        }
        setinput('');
    }
    const del = (value, mark) => {
        if (mark === "a") {
            setdata(data.filter((e) => { return e !== value }));
        } else if (mark === "b") {
            setwork(work.filter((e) => { return e !== value }));
        } else {
            setcomp(comp.filter((e) => { return e !== value }));
        }
    }
    const edit = (value, mark) => {
        setinput(value.data);
        del(value, mark);
    }
    const swap = (input, mark, n) => {
        if (mark === "a") {
            if (n === 0) {
                setwork([...work, input]);
            } else {
                setcomp([...comp, input]);
            }
        } else if (mark === "b") {
            if (n === 0) {
                setdata([...data, input]);
            } else {
                setcomp([...comp, input]);
            }
        } else {
            if (n === 0) {
                setdata([...data, input]);
            } else {
                setwork([...work, input]);
            }

        }
        del(input, mark);

    }

    return (
        <div className='home' >
            {/* {loading == false ?(  */}
            <div>    
            <Navbar displayname={displayname} signout={signout} />
            <div className='addtask'>
                <form onSubmit={(e) => { e.preventDefault() }} noValidate>
                    <TextField
                        required='true'
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
                <Paper overflow='hidden' className={classes.root} id='card' variant="outlined" >
                    <List  >
                        <h2 className={classes.h2} >Active Task: {data.length}</h2>
                        {data.map(input => (
                            <Showdata input={input} del={del} mark={{ a: 'Working', b: 'Completed' }} edit={edit} swap={swap} temp={'a'} />
                        ))}
                    </List>
                </Paper>
                <Paper className={classes.root} variant="outlined" id='card' >
                    <List  >
                        <h2 className={classes.h2}>In Working: {work.length}</h2>
                        {work.map(input => (
                            <Showdata input={input} del={del} mark={{ a: 'Active', b: 'Completed' }} edit={edit} swap={swap} temp={'b'} />
                        ))}
                    </List>
                </Paper>
                <Paper className={classes.root} variant="outlined" id='card' >
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
            {/* ):(
                <Preloader loading={loading} /> 
            )} */}
        </div>
    )
}

export default Home;








