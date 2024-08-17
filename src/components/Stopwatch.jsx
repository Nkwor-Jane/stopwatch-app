import React, {useState, useEffect, useRef} from 'react'

const Stopwatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [timeUsed, setTimeUsed] = useState(0)
    const intervalRef = useRef(null)
    const startTime = useRef(0)

    useEffect(() =>{
        if(isRunning){
            intervalRef.current = setInterval(() =>{
                setTimeUsed(Date.now() - startTime.current)
            }, 10)
        }
        return () =>{
            clearInterval(intervalRef.current)
        }
    },[isRunning])

    const start = () =>{
        setIsRunning(true)
        startTime.current = Date.now() - timeUsed;
    }

    const stop = () =>{
        setIsRunning(false)        
    }

    const reset = () =>{
        setTimeUsed(0)
        setIsRunning(false)
    }
    const formatTime = () =>{
        // let hours = Math.floor(timeUsed / (1000 *60*60));
        let mins = Math.floor(timeUsed / (1000 * 60) % 60);
        let secs = Math.floor(timeUsed / (1000) % 60);
        let millisecs = Math.floor((timeUsed % 1000) / 10)
        
        // hours = String(hours).padStart(2, "0")
        mins = String(mins).padStart(2, "0")
        secs = String(secs).padStart(2, "0")
        millisecs = String(millisecs).padStart(2, "0")

        return `${mins}:${secs}:${millisecs}`
    }
  return (
    <div className='bg-gradient-to-r from-[#402E7A] via-[#4C3BCF] to-[#4B70F5]  h-screen flex flex-col font-mono'>
        {/* <div className='bg-white shadow-xl rounded-lg p-10 w-2/4 '> */}
            <div className='flex items-center gap-4 justify-center mt-20'>
                <p className='font-bold text-6xl text-white tracking-wide leading-4 pb-20'>Stopwatch</p>
            </div>
            <p className='font-bold text-lg text-center text-indigo-200 tracking-wide'>HOURS MINUTES SECONDS</p>
            <p className='font-bold text-8xl text-center text-white pb-20'>{formatTime()}</p>
            <div className='flex justify-center gap-6'>
                <button onClick={reset} className='p-2 border-2 rounded-lg w-20 bg-blue-200 font-extrabold text-gray-700 hover:scale-100 hover:bg-blue-400 hover:text-white '>Reset</button>
                <button onClick={start} className='p-2 border-2 rounded-lg w-20 bg-green-200 font-bold text-gray-700 hover:scale-100 hover:bg-green-400 hover:text-white'>Start</button>
                <button onClick={stop} className='p-2 border-2 rounded-lg w-20 bg-red-200 font-bold text-gray-700 hover:scale-100 hover:bg-red-400 hover:text-white'>Stop</button>
            </div>
        {/* </div> */}
    </div>
  )
}

export default Stopwatch