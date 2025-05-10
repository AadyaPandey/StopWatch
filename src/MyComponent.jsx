import { string } from 'prop-types';    
import {useState,useEffect,useRef} from 'react';

export default function MyComponent(){
    const [isRunning,setIsRunning]=useState(false)
    const[elapsed,setElapsed]=useState(0)
    const intervalId=useRef(null)
    const startTimeRef=useRef(0)

    useEffect(()=>{
        if(isRunning){
            intervalId.current=setInterval(()=>{
                setElapsed(Date.now()-startTimeRef.current)
            },10)
        }
        return()=>{
            clearInterval(intervalId.current)
        }
    },[isRunning])

    function start(){
        setIsRunning(true)
        startTimeRef.current=Date.now()-elapsed;
    }
    function stop(){
        setIsRunning(false)
    }
    function reset(){
        setElapsed(0)
        setIsRunning(false)
    }
    const timeFormat=()=>{
        let hours=Math.floor(elapsed/(1000*60*60))
        let minutes=Math.floor(elapsed/(1000*60)%60)
        let seconds=Math.floor(elapsed/(1000)%60)
        let miliseconds=Math.floor(elapsed%(100))

        minutes=String(minutes).padStart(2,'0')
        seconds=String(seconds).padStart(2,'0')
        miliseconds=String(miliseconds).padStart(2,'0')


        return `${minutes}:${seconds}:${miliseconds}`;
    }
    return(
        <div className='box'>
            <span className='time-display'>{timeFormat()}</span>
            <div className='button-box'>
                <button className='start'onClick={start}>Start</button>
                <button className='stop'onClick={stop}>Stop</button>
                <button className='reset' onClick={reset}>Reset</button>
            </div>
        </div>
    )
}