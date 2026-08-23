import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StudentDashboard from '../components/StudentDashboard.jsx'
export default function StudentHome() {
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [error, setError] = useState('')
    useEffect(() => {
        async function loadDashboard() {
            const session = JSON.parse(
                localStorage.getItem('studentSession') || 'null'
            )

            const token = session?.access_token

            if (!token) {
                navigate('/login', { replace: true })
                return
            }

            try {
                const response = await fetch(
                    'http://localhost:5000/api/students/dashboard',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                const result = await response.json()

                if (response.status === 401) {
                    localStorage.removeItem('studentSession')
                    localStorage.removeItem('student')

                    navigate('/login', { replace: true })
                    return
                }

                if (!response.ok) {
                    throw new Error(
                        result.message || 'فشل تحميل بيانات الطالب'
                    )
                }
                setData(result)
            } catch (error) {
                setError(error.message)
            }
        }

        loadDashboard()
    }, [navigate])

    async function handleLogout() {
        await supabase.auth.signOut()

        localStorage.removeItem('student')

        navigate('/login', { replace: true })
    }

    if (error) {
        return (
            <main dir="rtl">
                <p role="alert">{error}</p>
            </main>
        )
    }

    if (!data) {
        return (
            <main dir="rtl">
                <p>جاري تحميل لوحة الطالب...</p>
            </main>
        )
    }

    return (
        <StudentDashboard
            data={data}
            onLogout={handleLogout}
        />
    )
}
