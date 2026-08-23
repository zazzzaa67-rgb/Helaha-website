import { useState } from 'react'
import '../StudentRanking.css'
export default function StudentRanking({ 
    students = [],
    token,
    onPaymentStatusChanged,
    onPointsChanged }) {
    const [pointsToAdd, setPointsToAdd] = useState({})
    const [totalPoints , setTotalPoints] = useState({})
    const [pointsError, setPointsError] = useState('')
    async function togglePaymentStatus(student) {
        const isPaid = student.status === 'paid'
        const action = isPaid ? 'إلغاء حالة الدفع' : 'تأكيد الدفع'
        if (!window.confirm(`هل أنت متأكد من ${action} للطالب ${student.full_name}؟`)) {
            return
        }
        const response = await fetch('http://localhost:5000/api/admin/students/payment-status', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ studentId: student.id }),
        })
        const result = await response.json()
        if (!response.ok) {
            throw new Error(result.message || 'Failed to update payment status')
        }
        onPaymentStatusChanged(result.student)
    }
    async function addStudentPoints(student) {
        const pointsCount = Number(pointsToAdd[student.id])
        const points = Number(totalPoints[student.id])
        if (!Number.isInteger(pointsCount) || pointsCount <= 0) {
            setPointsError('اكتب نقاط الطالب بشكل صحيح')
            return
        }
        if (!Number.isInteger(points) || points <= 0) {
            setPointsError('اكتب الدرجة النهائية بشكل صحيح')
            return
        }
        if (pointsCount > points) {
            setPointsError('نقاط الطالب لا يمكن أن تكون أكبر من الدرجة النهائية')
            return
        }
        setPointsError('')
        const response = await fetch(
            'http://localhost:5000/api/admin/students/points',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    studentId: student.id,
                    pointsCount,
                    points,
                }),
            }
        )
        const result = await response.json()
        if (!response.ok) {
            setPointsError(result.message || 'فشل إضافة النقاط')
            return
        }
        setPointsToAdd((current) => ({
            ...current,
            [student.id]: '',
        }))
        setTotalPoints((current) => ({
            ...current,
            [student.id]: '',
        }))
        onPointsChanged?.(result.student)
    }
    return <section className='student-ranking'>
        <div className='student-ranking-header'>
        <h2>ترتيب الطلاب</h2>
            <p>متابعة درجات الطلاب وحالة الدفع</p>
        </div>
        <div className='student-table-wrapper'>
            <table>
                <thead>
                    <tr>
                        <th>الترتيب</th>
                        <th>الطالب</th>
                        <th>النقاط</th>
                        <th>النسبة</th>
                        <th>المرحلة</th>
                        <th>إضافة نقاط</th>
                        <th>حالة الدفع</th>
                        <th>تاريخ الدفع</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.rank}</td>
                            <td><a href={`/admin/students/${student.id}`} className='student-name'>{student.full_name}</a></td>
                            <td className='student-points'>{student.studentPoints} / {student.finalPoints}</td>
                            <td className='student-percentage'>{student.percentage}%</td>
                            <td >{student.stage} - {student.grade || '-'}</td>
                            <td>
                                <div className='points-controls'>
                                    <input
                                        type='number'
                                        min='1'
                                        value={pointsToAdd[student.id] || ''}
                                        onChange={(event) => setPointsToAdd({ ...pointsToAdd, [student.id]: event.target.value })}
                                        aria-label={`عدد النقاط للطالب ${student.full_name}`}
                                        placeholder='عدد النقاط '
                                        
                                    />
                                    <input
                                        type='number'
                                        min='1'
                                        value={totalPoints[student.id] || ''}
                                        onChange={(event) =>
                                            setTotalPoints((current) => ({
                                                ...current,
                                                [student.id]: event.target.value,
                                            }))
                                        }
                                        placeholder='الدرجة النهائية'
                                        aria-label={`الدرجة النهائية للطالب ${student.full_name}`}
                                    />
                                    <button type='button' onClick={() => addStudentPoints(student)}>إضافة</button>
                                </div>
                            </td>
                            <td>
                                <button className={`payment-button ${
                                    student.status === 'paid' ? 'paid' : 'unpaid'
                                }`} type='button' onClick={() => togglePaymentStatus(student)}>
                                    {student.status === 'paid' ? 'مدفوع' : 'غير مدفوع'}
                                </button>
                            </td>
                            <td className='payment-date'>
                                {student.paymentDate
                                    ? new Date(student.paymentDate).toLocaleDateString('ar-EG')
                                    : '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {pointsError && <p role='alert' className='points-error'>{pointsError}</p>}
    </section>
}
