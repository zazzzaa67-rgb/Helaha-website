import Need from './Need.jsx'
import { needsData } from '../data.js'
export default function Needs(){
    return <section className='needs' dir='rtl'>
        {needsData.map((need) => (
            <Need key={need.id} icon={need.icon} title={need.title} description={need.description} />
        ))}
    </section>
}
