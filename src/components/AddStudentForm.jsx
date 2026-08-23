import { useState } from 'react'
import '../addStudentForm.css'
const gradesByStage = {
    الإعدادية: ['الصف الأول', 'الصف الثاني', 'الصف الثالث'],
    الثانوية: ['الصف الأول', 'الصف الثاني', 'الصف الثالث'],
}

const initialStudent = {
    full_name: '',
    password: '',
    parent_phone: '',
    student_phone: '',
    area: '',
    stage: '',
    grade: '',
}

            // full_name,
            // password,
            // parent_phone,
            // area,
            // stage,
            // grade,
            // student_phone

export default function AddStudentForm({ token }) {
    const [student, setStudent] = useState(initialStudent)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    function updateStudent(field, value) {
        setStudent((current) => ({
            ...current,
            [field]: value,
            ...(field === 'stage' ? { grade: '' } : {}),
        }))
    }
    async function handleSubmit(event) {
        event.preventDefault()
        setMessage('')
        setIsLoading(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/students`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(student),
            })
            const result = await response.json()
            if (!response.ok) throw new Error(result.message || 'فشل إضافة الطالب')

            setStudent(initialStudent)
            setMessage('تم إضافة الطالب بنجاح')
        } catch (submitError) {
            setMessage(submitError.message)
        } finally {
            setIsLoading(false)
        }
    }

    return <section className='addForm'>
        <h1>إضافة طالب</h1>
        <form className='addStudentForm' onSubmit={handleSubmit}>
            <div className='container'>
                <label htmlFor='student-name'>اسم الطالب</label>
                <input id='student-name' value={student.full_name} onChange={(event) => updateStudent('full_name', event.target.value)} required />
            </div>
            <div className='container'>
                <label htmlFor='student-password'>كلمة المرور</label>
                <input id='student-password' type='password' minLength='6' value={student.password} onChange={(event) => updateStudent('password', event.target.value)} required />
            </div>
            <div className='container'>
                <label htmlFor='student-stage'>المرحلة</label>
                <select id='student-stage' value={student.stage} onChange={(event) => updateStudent('stage', event.target.value)} required>
                    <option value='' disabled>اختر المرحلة</option>
                    <option value='الإعدادية'>المرحلة الإعدادية</option>
                    <option value='الثانوية'>المرحلة الثانوية</option>
                </select>
            </div>
            <div className='container'>
                <label htmlFor='student-grade'>الصف</label>
                <select id='student-grade' value={student.grade} onChange={(event) => updateStudent('grade', event.target.value)} disabled={!student.stage} required>
                    <option value=''>اختر الصف</option>
                    {(gradesByStage[student.stage] || []).map((grade) => <option key={grade} value={grade}>{grade}</option>)}
                </select>
            </div>
            <div className='container'>
                <label htmlFor='student-phone'>رقم الطالب</label>
                <input id='student-phone' value={student.student_phone} onChange={(event) => updateStudent('student_phone', event.target.value)} />
            </div>
            <div className='container'>
                <label htmlFor='parent-phone'>رقم ولي الأمر</label>
                <input id='parent-phone' value={student.parent_phone} onChange={(event) => updateStudent('parent_phone', event.target.value)} />
            </div>
            <div>
                <label htmlFor='student-area'>المنطقة</label>
                <input id='student-area' value={student.area} onChange={(event) => updateStudent('area', event.target.value)} />
            </div>
            <button type='submit' disabled={isLoading}>{isLoading ? 'جاري الإضافة...' : 'إضافة الطالب'}</button>
            {message && <p role='status'>{message}</p>}
        </form>
    </section>
}
