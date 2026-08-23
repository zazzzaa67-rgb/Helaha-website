import { NavLink } from 'react-router-dom'
export default function Social(){
    return <section className='social' dir='rtl'>
        <h2>كل مسئلة خطوة جديدة نحو التفوق </h2>
        <p>انضم لأكثر من 500 طالب يتعلمون الرياضيات مع مستر وجدي</p>
        <div>
            <NavLink to='login' className='btn startLearning'>ابدأ التعلم</NavLink>
            <NavLink className='btn parentsLogin' to='parentsLogin'>
                لولي الأمر
            </NavLink>
        </div>
    </section>
}