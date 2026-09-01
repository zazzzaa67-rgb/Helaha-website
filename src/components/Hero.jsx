import teacher from '../assets/images/teacher.webp'
import {NavLink} from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import CountUpNumber from './CountUpNumber'

export default function Hero() {
    const heroStatsRef = useRef(null)
    const [shouldAnimateStats, setShouldAnimateStats] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setShouldAnimateStats(true)
                observer.disconnect()
            }
        })

        if (heroStatsRef.current) observer.observe(heroStatsRef.current)

        return () => observer.disconnect()
    }, [])

    return (
        <section className="hero" dir="rtl">
            <div className="heroContainer">
                <div className="heroRight">
                    <span className="heroTag">
                        منصة حلها مع مستر وجدي
                    </span>
                    <h1>
                        <span className='motiTitle'>حلها ببساطة وتفوق</span>
                        <br />
                        مع <span>مستر وجدي</span> في الرياضيات
                    </h1>
                    <p className="heroQuote">
                    مع مستر وجدي الرياضيات لعبتك
                    </p>
                    <p className="heroDesc">
                        أفهم الرياضيات بطريقة أسهل، اختبر مستوياتك، تابع تطورك، وحقق في كل مسألة خطوة حديدة نحو التفوق.
                    </p>
                    <div className="heroButtons">
                        <a href='https://wa.me/201270707586' target='_blank' className="ghostBtn btn">تواصل معنا </a>
                        <NavLink to='/student' className="startLearning btn">ابدأ التعلم الآن</NavLink>
                    </div>
                    <div className="heroStats" ref={heroStatsRef}>
                        <div className="heroStat">
                            <CountUpNumber end={4.9} decimals={1} prefix='' className='heroStatValue' shouldAnimate={shouldAnimateStats} />
                            <span className="heroStatLabel">تقييم المدرسة</span>
                        </div>
                        <div className="heroStat">
                            <CountUpNumber end={95} suffix='%' className='heroStatValue' shouldAnimate={shouldAnimateStats} />
                            <span className="heroStatLabel">نسبة التفوق</span>
                        </div>
                        <div className="heroStat">
                            <CountUpNumber end={500} className='heroStatValue' shouldAnimate={shouldAnimateStats} />
                            <span className="heroStatLabel">طالب</span>
                        </div>
                    </div>
                </div>
                <div className='teacherImage' >
                    <div className="blueBlob"></div>
                    <img src={teacher} alt="مستر وجدي" className="heroTeacher" fetchPriority="high"/>
                </div>
            </div>
        </section>
    );
}