import { useEffect, useState } from 'react'
import StudentRanking from '../components/StudentRanking.jsx'
import DashboardCharts from '../components/DashboardCharts.jsx'
import { NavLink } from 'react-router-dom'
import logInImage from '../assets/images/logInImage.png'
const API_URL = `${import.meta.env.VITE_API_URL}/api/admin`
export default function Admin() {
    const [token, setToken] = useState(() => localStorage.getItem('adminToken'))
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [data, setData] = useState(null)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [studentFilters, setStudentFilters] = useState({ name: '', stage: '', grade: '' })
    function handlePaymentStatusChanged(updatedStudent) {
        setData((currentData) => ({
            ...currentData,
            students: currentData.students.map((student) => (
                student.id === updatedStudent.id
                    ? { ...student, status: updatedStudent.status }
                    : student
            )),
        }))
    }

    function handlePointsChanged(updatedStudent) {
        setData((currentData) => ({
            ...currentData,
            students: currentData.students
                .map((student) => student.id === updatedStudent.id
                    ? {
                        ...student,
                        studentPoints: updatedStudent['student-points'],
                        finalPoints: updatedStudent.points,
                    }
                    : student)
                .sort((firstStudent, secondStudent) => secondStudent.studentPoints - firstStudent.studentPoints)
                .map((student, index) => ({
                    ...student,
                    rank: index + 1,
                    percentage: student.finalPoints > 0
                        ? Math.round((student.studentPoints / student.finalPoints) * 100)
                        : 0,
                })),
        }))
    }
    useEffect(() => {
        if (!token) {
            return
        }
        setIsLoading(true)
        fetch(`${API_URL}/dashboard`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(async (response) => {
                const result = await response.json()
                if (!response.ok) {
                    throw new Error(result.message || 'Failed to load dashboard')
                }
                return result
            })
            .then((result) => setData(result))
            .catch((requestError) => {
                setError(requestError.message)
                if (requestError.message.includes('token') || requestError.message.includes('authentication')) {
                    localStorage.removeItem('adminToken')
                    setToken(null)
                }
            })
            .finally(() => setIsLoading(false))
    }, [token])

    async function handleLogin(event) {
        event.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            })
            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Admin login failed')
            }

            localStorage.setItem('adminToken', result.token)
            setToken(result.token)
            setCredentials({ email: '', password: '' })
        } catch (loginError) {
            setError(loginError.message)
        } finally {
            setIsLoading(false)
        }
    }

    function handleLogout() {
        localStorage.removeItem('adminToken')
        setToken(null)
        setData(null)
    }

    const filteredStudents = data?.students?.filter((student) => {
        const matchesName = student.full_name.toLocaleLowerCase('ar').includes(studentFilters.name.trim().toLocaleLowerCase('ar'))
        const matchesStage = !studentFilters.stage || student.stage === studentFilters.stage
        const matchesGrade = !studentFilters.grade || student.grade === studentFilters.grade
        return matchesName && matchesStage && matchesGrade
    }) || []

    if (!token) {
        return <main className='adminPage login' dir='rtl'>
            <img src={logInImage} className='logInPhoto' alt='our website logo'/>
            <form className='adminLogin' onSubmit={handleLogin}>
                
                <h1>تسجيل دخول الإدارة</h1>
                <div className='container'>
                    <label htmlFor='admin-email'>البريد الإلكتروني</label>
                    <input
                        id='admin-email'
                        type='email'
                        value={credentials.email}
                        onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
                        required
                    />
                </div>
                <div className='container'>
                    <label htmlFor='admin-password'>كلمة المرور</label>
                    <input
                        id='admin-password'
                        type='password'
                        value={credentials.password}
                        onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                        required
                    />
                </div>
                <button type='submit' disabled={isLoading}>
                    {isLoading ? 'جاري الدخول...' : 'دخول'}
                </button>
                {error && <p role='alert'>{error}</p>}
            </form>
        </main>
    }

    return <main className='adminPage' dir='rtl'>
        {isLoading && <p>جاري تحميل البيانات...</p>}
        {error && <p role='alert'>{error}</p>}
        {data && <>
            <section className='adminHero'>
                <p>اهلا مستر وجدي</p>
                <h1>لوحة الإدارة</h1>
                <p>
                    اليوم: {new Date().toLocaleDateString('ar-EG')} - {data.overview.totalStudents} طالب نشط
                </p>
            </section>
            <section className='adminStats'>
                <article>
                    <strong>{data.overview.totalStudents}</strong>
                    <span>عدد الطلاب</span>
                </article>
                <article>
                    <strong>{data.overview.totalStudentPoints.toLocaleString('en-US')}</strong>
                    <span>إجمالي النقاط المحققة</span>
                </article>
                <article>
                    <strong>{data.overview.totalPossiblePoints.toLocaleString('en-US')}</strong>
                    <span>إجمالي النقاط الأساسية</span>
                </article>
                <article>
                    <strong>{data.overview.averagePercentage}%</strong>
                    <span>متوسط الدرجات</span>
                </article>
                <article>
                    <strong>{data.overview.paidStudents}</strong>
                    <span>طلاب مدفوعون</span>
                </article>
            </section>
            <DashboardCharts
                studentGrowth={data.studentGrowth}
                topicPerformance={data.topicPerformance}
            />
            <NavLink className='btn addStudent' to='/admin/students/new'>إضافة طالب</NavLink>
            <NavLink className='btn addTest' to='/admin/exams'>إنشاء امتحان</NavLink>
            <section className='studentFilters' dir='rtl'>
                <h2>بحث الطلاب</h2>
                <input
                    type='search'
                    placeholder='ابحث باسم الطالب'
                    value={studentFilters.name}
                    onChange={(event) => setStudentFilters({ ...studentFilters, name: event.target.value })}
                />
                <select
                    value={studentFilters.stage}
                    onChange={(event) => setStudentFilters({ ...studentFilters, stage: event.target.value, grade: '' })}
                >
                    <option value=''>كل المراحل</option>
                    <option value='الإعدادية'>المرحلة الإعدادية</option>
                    <option value='الثانوية'>المرحلة الثانوية</option>
                </select>
                <select
                    value={studentFilters.grade}
                    onChange={(event) => setStudentFilters({ ...studentFilters, grade: event.target.value })}
                    disabled={!studentFilters.stage}
                >
                    <option value=''>كل الصفوف</option>
                    {['الصف الأول', 'الصف الثاني', 'الصف الثالث'].map((grade) => <option key={grade} value={grade}>{grade}</option>)}
                </select>
            </section>
            <StudentRanking
                students={filteredStudents}
                token={token}
                onPaymentStatusChanged={handlePaymentStatusChanged}
                onPointsChanged={handlePointsChanged}
            />
        </>}
    </main>
}