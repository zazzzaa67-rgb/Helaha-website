import Header from '../components/Header.jsx'
import Hero from '../components/Hero.jsx'
import Teacher from '../components/Teacher.jsx'
import Needs from '../components/Needs.jsx'
import Footer from '../components/Footer.jsx'
import Social from '../components/Social.jsx'
export default function Landing(){
    return <>
        <Header/>
        <Hero/>
        <section className="statsSection" dir="rtl">
            <div className="statsHeader">
                <span className="eyebrow">أرقامنا</span>
                <h2>نتائج تعليمية واقعية</h2>
            </div>

            <div className="statsGrid">
                <div className="statBox">
                    <div className="statIcon trophy">🏆</div>
                    <div className="statValue">95%</div>
                    <div className="statLabel">نسبة النجاح</div>
                </div>
                <div className="statBox">
                    <div className="statIcon paper">📝</div>
                    <div className="statValue">+3,500</div>
                    <div className="statLabel">اختبار تم حله</div>
                </div>
                <div className="statBox">
                    <div className="statIcon book">📚</div>
                    <div className="statValue">+1,200</div>
                    <div className="statLabel">درس متكامل</div>
                </div>
                <div className="statBox">
                    <div className="statIcon users">👥</div>
                    <div className="statValue">+500</div>
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
