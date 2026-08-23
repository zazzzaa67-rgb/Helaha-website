import Sidebar from './Sidebar';

export default function Test() {
    const tests = [
        {
            id: 1,
            title: "اختبار الحبر - الوحدة 4",
            category: "الفئة (3)",
            categoryColor: "blue",
            level: "بسيط",
            duration: "25 سؤال",
            time: "45 دقيقة",
            questions: "100 نقطة",
            date: "20 أغسطس 2025",
            buttonText: "ابدأ الاختبار",
            buttonColor: "blue"
        },
        {
            id: 2,
            title: "اختبار المثنيات",
            category: "المثنيات",
            categoryColor: "red",
            level: "متوسط",
            duration: "20 سؤال",
            time: "40 دقيقة",
            questions: "80 نقطة",
            date: "25 أغسطس 2025",
            buttonText: "ابدأ الاختبار",
            buttonColor: "red"
        },
        {
            id: 3,
            title: "اختبار نصف الفصل",
            category: "عام",
            categoryColor: "purple",
            level: "متقدم",
            duration: "40 سؤال",
            time: "90 دقيقة",
            questions: "200 نقطة",
            date: "1 سبتمبر 2025",
            buttonText: "ابدأ الاختبار",
            buttonColor: "purple"
        }
    ];

    return (
        <div className="testPage" dir="rtl">
            <Sidebar />
            
            <main className="testContent">
                <div className="testHeader">
                    <h1>الاختبارات</h1>
                    <button className="testNotify">
                        <span className="notifyBadge">3</span>
                        <i className="fa-solid fa-bell"></i>
                    </button>
                </div>

                <div className="testIntro">
                    <div className="introIcon">
                        <i className="fa-solid fa-file-lines"></i>
                    </div>
                    <h2>الاختبارات</h2>
                    <p>اختبر تحقق وتابع تقدمك</p>
                    <div className="introTabs">
                        <button className="introTab active">الفئة (3)</button>
                        <button className="introTab">المختيرة (4)</button>
                    </div>
                </div>

                <div className="testsContainer">
                    {tests.map((test) => (
                        <div key={test.id} className={`testCard testCard-${test.buttonColor}`}>
                            <div className="testCardLeft">
                                <button className={`testStartBtn btn-${test.buttonColor}`}>
                                    ابدأ الاختبار
                                </button>
                                <span className="testCategory">{test.category}</span>
                            </div>

                            <div className="testCardMiddle">
                                <div className="testInfo">
                                    <span className="testDetail">
                                        <i className="fa-solid fa-bars"></i>
                                        {test.duration}
                                    </span>
                                    <span className="testDetail">
                                        <i className="fa-solid fa-star"></i>
                                        {test.questions}
                                    </span>
                                    <span className="testDetail">
                                        <i className="fa-solid fa-clock"></i>
                                        {test.time}
                                    </span>
                                    <span className="testDetail">
                                        <i className="fa-solid fa-question"></i>
                                        {test.date}
                                    </span>
                                </div>
                            </div>

                            <div className="testCardRight">
                                <h3>{test.title}</h3>
                                <div className="testIcon">
                                    <i className="fa-solid fa-file-lines"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
