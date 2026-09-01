import { useEffect, useRef, useState } from 'react'
import Header from '../components/Header.jsx'
import Hero from '../components/Hero.jsx'
import Teacher from '../components/Teacher.jsx'
import Needs from '../components/Needs.jsx'
import Footer from '../components/Footer.jsx'
import Social from '../components/Social.jsx'
import CountUpNumber from '../components/CountUpNumber.jsx'

export default function Landing(){
    const statsGridRef = useRef(null)
    const [shouldAnimateStats, setShouldAnimateStats] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setShouldAnimateStats(true)
                observer.disconnect()
            }
        })

        if (statsGridRef.current) observer.observe(statsGridRef.current)

        return () => observer.disconnect()
    }, [])

    return <>
        <Header/>
        <Hero/>
        <section className="statsSection" dir="rtl">
            <div className="statsHeader">
                <span className="eyebrow">أرقامنا</span>
                <h2>نتائج تعليمية واقعية</h2>
            </div>

            <div className="statsGrid" ref={statsGridRef}>
                <div className="statBox">
                    <div className="statIcon trophy">🏆</div>
                    <CountUpNumber end={95} suffix='%' className='statValue' as='div' shouldAnimate={shouldAnimateStats} />
                    <div className="statLabel">نسبة النجاح</div>
                </div>
                <div className="statBox">
                    <div className="statIcon paper">📝</div>
                    <CountUpNumber end={3500} className='statValue' as='div' useGrouping shouldAnimate={shouldAnimateStats} />
                    <div className="statLabel">اختبار تم حله</div>
                </div>
                <div className="statBox">
                    <div className="statIcon book">📚</div>
                    <CountUpNumber end={1200} className='statValue' as='div' useGrouping shouldAnimate={shouldAnimateStats} />
                    <div className="statLabel">درس متكامل</div>
                </div>
                <div className="statBox">
                    <div className="statIcon users">👥</div>
                    <CountUpNumber end={500} className='statValue' as='div' shouldAnimate={shouldAnimateStats} />
                    <div className="statLabel">طالب نشط</div>
                </div>
            </div>
        </section>

        <Teacher/>
        <Needs/>
        <Social/>
        <Footer/>
    </>
}
