import teacher from '../assets/images/teacher.png'

export default function Hero() {
    return (
        <section className="hero" dir="rtl">
            <div className="heroContainer">
                <div className="heroRight">
                    <span className="heroTag">
                        منصة حلها مع مستر وجدي
                    </span>
                    <h1>
                        <span>حلها ببساطة وتفوق</span>
                        <br />
                        مع مستر وجدي في الرياضيات
                    </h1>
                    <p className="heroQuote">
                    مع مستر وجدي الرياضيات لعبتك
                    </p>
                    <p className="heroDesc">
                        أفهم الرياضيات بطريقة أسهل، اختبر مستوياتك، تابع تطورك، وحقق في كل مسألة خطوة حديدة نحو التفوق.
                    </p>
                    <div className="heroButtons">
                        <button className="ghostBtn btn">تعرّف على مستر وجدي</button>
                        <button className="startLearning btn">ابدأ التعلم الآن</button>
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
                            <span className="heroStatValue">+150</span>
                            <span className="heroStatLabel">طالب</span>
                        </div>
                    </div>
                </div>
                
                    
                        <img src={teacher} alt="مستر وجدي" className="heroTeacher" />
                    
            </div>
        </section>
    );
}