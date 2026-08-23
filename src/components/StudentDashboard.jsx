import {NavLink} from 'react-router-dom'
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

export default function StudentDashboard({ data, onLogout }) {
    const { student, stats, performance, recentAttempts } = data

    return <main className='studentDashboard' dir='rtl'>
        <aside className='studentSidebar'>
            <div className='studentBrand'>
                <span className='brandMark'>Σ</span>
                <div><strong>حِلها</strong><small>مع مستر وجدي</small></div>
            </div>
            <p className='sidebarLabel'>الحساب</p>
            <nav>
                <NavLink className='active' to='/student'>الرئيسية</NavLink>
                <NavLink to='/exams'>الاختبارات</NavLink>
                <NavLink to='/points'>النقاط</NavLink>
                <NavLink to='/leaderboard'>الترتيب</NavLink>
            </nav>
            <div className='studentProfile'>
                <strong>{student.full_name}</strong>
                <small>{student.stage} - {student.grade}</small>
                <button type='button' onClick={onLogout}>تسجيل الخروج</button>
            </div>
        </aside>
        <section className='studentContent'>
            <header className='studentTopbar'>
                <h1>الرئيسية</h1>
                <span>👋 أهلاً يا {student.full_name}</span>
            </header>
            <section className='studentWelcome'>
                <div>
                    <span>استمر في التقدم</span>
                    <h2>الرياضيات أسهل مع التدريب المستمر</h2>
                    <p>{student.stage} - {student.grade}</p>
                </div>
                <strong>{stats.earnedPoints.toLocaleString('en-US')}<small>نقطة إجمالية</small></strong>
            </section>
            <section className='studentStats'>
                <article><strong>{stats.earnedPoints.toLocaleString('en-US')}</strong><span>النقاط الإجمالية</span></article>
                <article><strong>{stats.averagePercentage}%</strong><span>متوسط الأداء</span></article>
                <article><strong>#{stats.rank || '-'}</strong><span>الترتيب</span></article>
                <article><strong>{stats.attemptsCount}</strong><span>اختبارات مكتملة</span></article>
            </section>
            <section className='studentPaymentStatus'>
                <h2>حالة الاشتراك</h2>
                <strong>{student.status === 'paid' ? 'مدفوع' : 'غير مدفوع'}</strong>
                <span>{student.payment_date
                    ? `تاريخ الدفع: ${new Date(student.payment_date).toLocaleDateString('ar-EG')}`
                    : 'لم يتم تسجيل تاريخ دفع بعد'}</span>
            </section>
            <section className='studentCharts'>
                <article className='studentChartCard'>
                    <h2>تطور الأداء</h2>
                    <p>نتائجك في آخر الاختبارات</p>
                    <div className='studentChartBox'>
                        {performance.length ? <ResponsiveContainer width='100%' height='100%'>
                            <LineChart data={performance}>
                                <CartesianGrid strokeDasharray='3 3' vertical={false} />
                                <XAxis dataKey='label' />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                <Line type='monotone' dataKey='percentage' name='الأداء %' stroke='#3478f6' strokeWidth={3} dot={{ r: 5 }} />
                            </LineChart>
                        </ResponsiveContainer> : <p>لم تخض أي اختبار بعد</p>}
                    </div>
                </article>
                <article className='studentChartCard studentTopicsCard'>
                    <h2>ابدأ التعلم</h2>
                    <p>اختبر مستواك وطور نقاطك</p>
                    <a href='/exams'>اذهب إلى الاختبارات</a>
                </article>
            </section>
            <section className='recentAttempts'>
                <h2>آخر الاختبارات</h2>
                {recentAttempts.map((attempt) => <article key={attempt.completed_at}>
                    <span>{attempt.exams?.title || 'اختبار'}</span>
                    <strong>{attempt.score} نقطة</strong>
                </article>)}
            </section>
        </section>
    </main>
}
