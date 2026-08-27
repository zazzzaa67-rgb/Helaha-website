import teacher from '../assets/images/teacher.png'
import {NavLink} from 'react-router-dom'
export default function Hero() {
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
                        <NavLink to='student' className="startLearning btn">ابدأ التعلم الآن</NavLink>
                    </div>
                    <div className="heroStats">
                        <div className="heroStat">
                            <span className="heroStatValue">4.9</span>
                            <span className="heroStatLabel">تقييم المدرسة</span>
                        </div>
                        <div className="heroStat">
                            <span className="heroStatValue">95%</span>
                            <span className="heroStatLabel">نسبة التفوق</span>
                        </div>
                        <div className="heroStat">
                            <span className="heroStatValue">+500</span>
                            <span className="heroStatLabel">طالب</span>
                        </div>
                    </div>
                </div>
                <div className='teacherImage' >
                    <div className="blueBlob"></div>
                    <img src={teacher} alt="مستر وجدي" className="heroTeacher" />
                </div>
            </div>
        </section>
    );
}