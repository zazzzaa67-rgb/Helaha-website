import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
export default function PerformanceChart({ performance }) {
    if (!performance || !performance.length) {
        return <p>لم تخض أي اختبار بعد</p>
    }
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={performance}>
                <CartesianGrid strokeDasharray='3 3' vertical={false} />
                <XAxis dataKey='label' />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                    type='monotone'
                    dataKey='percentage'
                    name='الأداء %'
                    stroke='#3478f6'
                    strokeWidth={3}
                    dot={{ r: 5 }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}