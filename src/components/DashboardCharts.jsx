import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

export default function DashboardCharts({ studentGrowth = [], topicPerformance = [] }) {
    return <section className='dashboardCharts'>
        <article className='chartCard'>
            <h2>نمو عدد الطلاب</h2>
            <div className='chartBox'>
                {studentGrowth.length ? <ResponsiveContainer width='100%' height='100%'>
                    <LineChart data={studentGrowth}>
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='label' />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Line type='monotone' dataKey='students' name='الطلاب' stroke='#3478f6' strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer> : <p>ستظهر البيانات بعد إنشاء الاختبارات</p>}
            </div>
        </article>
        <article className='chartCard'>
            <h2>متوسط أداء المواضيع</h2>
            <div className='chartBox'>
                {topicPerformance.length ? <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={topicPerformance} margin={{ left: 10, right: 20 }}>
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='topic' />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Bar dataKey='averagePercentage' name='متوسط الأداء' fill='#3478f6' radius={[5, 5, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer> : <p>ستظهر البيانات بعد إنشاء الاختبارات</p>}
            </div>
        </article>
    </section>
}
