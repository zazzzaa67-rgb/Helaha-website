export default function Need(props){
    return (
        <div className='need'>
            <div className='icon'>{props.icon}</div>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    )
}