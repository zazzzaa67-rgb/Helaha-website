import sigma from '../assets/icons/sigma.ico'
import {useState} from 'react'
import {NavLink} from 'react-router-dom'
export default function Header(){
    const [mood , setMood] = useState(true)
    function toggle(set){
        set(prevMood => !prevMood)
    }
    return <header>
        
            <div className='container'>
                <img src={sigma} alt='Our website icon' className='sigma'/>
                <div>
                    <span className='name'>حلها </span>
                    <span className='thin'>مع مستر وجدي </span>
                </div>
            </div>
            <div className='btns'>
                <button className='mood' onClick={()=>toggle(setMood)}>{mood?<i className="fa-solid fa-sun"></i>:<i className="fa-solid fa-moon"></i>}</button>
                <NavLink to='student' className='signUp btn'>دخول الطالب</NavLink>
                <NavLink to='student' className='startLearing btn'>أبدأ تعلم</NavLink>
            </div>
        
    </header>
}