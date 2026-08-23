import Link from 'react-router-dom'
export default function SecHeader(props){
    return <header className='secHeader' dir='rtl'>
        <h3>{props.title}</h3>
        <Link to='/' className='btn backToHome'>الصفحة الرئيسية</Link>
    </header>
}