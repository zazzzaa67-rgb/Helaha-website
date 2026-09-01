import { useEffect, useRef, useState } from 'react'
import teacher from '../assets/images/teacher.webp'
import CountUpNumber from './CountUpNumber'

export default function Teacher() {
    const teacherNumbersRef = useRef(null)
    const [shouldAnimateNumbers, setShouldAnimateNumbers] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setShouldAnimateNumbers(true)
                observer.disconnect()
            }
        })

        if (teacherNumbersRef.current) observer.observe(teacherNumbersRef.current)

        return () => observer.disconnect()
    }, [])

    return (
        <section className='teacher' dir='rtl'>
            <div className='teacherHeader'>
                <div className='teacherContent'>
                    <img src={teacher} alt='mr Wagdy photo' />
                    <h3>
                        <span>مستر واجدي</span>
                        مدرس الرياضيات
                    </h3>
                    <span className='desc'>
                        4.9 <i className='fa-solid fa-star'></i> تقييم المدرس
                    </span>
                    <div className='teacherStats'>
                        <span><span className='blue'>+5000</span><br /> <i className='fa-solid fa-book'></i>دروس</span>
                        <span><span className='blue'>95%</span><br /> <i className='fa-solid fa-percentage'></i> تفوق</span>
                        <span><span className='blue'>4.9</span><br /> <i className='fa-solid fa-star'></i> تقييم المدرس</span>
                        <span><span className='blue'>+500</span><br /> <i className='fa-solid fa-user'></i> طالب</span>
                    </div>
                </div>

                <div className='teacherDesc'>
                    <span className='blue'>مين المستر</span>
                    <h3>
                        مين هو <span className='blue'>مستر واجدي؟</span>
                    </h3>
                    <p>مستر وجدي مدرس رياضيات متميز بأسلوب تدريس عصري يركز على الفهم الحقيقي قبل الحفظ. أسس هذه المنصة ليقدم تجربة تعليمية استثنائية لطلابه.</p>
                    <ul>
                        <li className='feature'>خبرة طويلة في التدريس <i className='fa-solid fa-check'></i></li>
                        <li className='feature'>أساليب تدريس مبتكرة <i className='fa-solid fa-check'></i></li>
                        <li className='feature'>دعم طلابه بشكل فردي <i className='fa-solid fa-check'></i></li>
                        <li className='feature'>التدريب المستمر وبناء طريقة تفكير رياضية <i className='fa-solid fa-check'></i></li>
                    </ul>
                    <span className='quote'>"مش بنحفظ قوانين... بنفهم الرياضيات."</span>
                </div>
            </div>
            <div className='teacherNumbers' ref={teacherNumbersRef}>
                <div className='numberStats'>
                    <i className='fa-solid fa-user'></i>
                    <CountUpNumber end={500} shouldAnimate={shouldAnimateNumbers} />
                    <span>طالب نشط </span>
                </div>
                <div className='numberStats'>
                    <i className='fa-solid fa-book'></i>
                    <CountUpNumber end={1000} shouldAnimate={shouldAnimateNumbers} />
                    <span>درس متوفر </span>
                </div>
                <div className='numberStats'>
                    <i className='fa-solid fa-file-alt'></i>
                    <CountUpNumber end={500} shouldAnimate={shouldAnimateNumbers} />
                    <span>اختبار تم حلة </span>
                </div>
                <div className='numberStats'>
                    <i className='fa-solid fa-trophy'></i>
                    <span className='blue'>95% </span>
                    <span>نسبة التفوق </span>
                    
                </div>
            </div>
        </section>
    )
}