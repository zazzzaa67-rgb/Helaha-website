import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function StudentDetails() {
    const { studentId } = useParams()
    const token = localStorage.getItem('adminToken')
    const [data, setData] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/students/${studentId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(async (response) => {
                const result = await response.json()
                if (!response.ok) throw new Error(result.message || 'فشل تحميل بيانات الطالب')
                return result
            })
            .then(setData)
            .catch((requestError) => setError(requestError.message))
    }, [studentId, token])

    if (error) return <main dir='rtl'><p role='alert'>{error}</p><Link to='/admin'>العودة للوحة الإدارة</Link></main>
    if (!data) return <main dir='rtl'><p>جاري تحميل بيانات الطالب...</p></main>

    const { student } = data
    return <main dir='rtl' className='studentDetails'>
        <Link to='/admin'>العودة للوحة الإدارة</Link>
        <h1>بيانات الطالب</h1>
        <section>
            <p><strong>الاسم:</strong> {student.full_name}</p>
            <p><strong>المرحلة:</strong> {student.stage}</p>
            <p><strong>الصف:</strong> {student.grade}</p>
            <p><strong>الترتيب:</strong> #{data.rank || '-'}</p>
            <p><strong>النقاط:</strong> {student['student-points'] || 0} / {student.points || 0}</p>
            <p><strong>رقم الطالب:</strong> {student.student_phone || '-'}</p>
            <p><strong>رقم ولي الأمر:</strong> {student.parent_phone || '-'}</p>
            <p><strong>المنطقة:</strong> {student.area || '-'}</p>
            <p><strong>حالة الدفع:</strong> {student.status === 'paid' ? 'مدفوع' : 'غير مدفوع'}</p>
            <p><strong>تاريخ الدفع:</strong> {student.payment_date
                ? new Date(student.payment_date).toLocaleDateString('ar-EG')
                : '-'}</p>
            <p><strong>كلمة المرور:</strong> {data.password || 'غير متاحة لهذا الحساب القديم'}</p>
            {!data.password && <small>كلمة المرور متاحة للطلاب الذين تم إنشاؤهم بعد إضافة تخزين كلمة المرور المشفر.</small>}
        </section>
    </main>
}
