import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logInImage from '../assets/images/logInImage.png'
export default function Login() {
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    async function sendData(event) {
        event.preventDefault()
        setMessage('')
        setIsLoading(true)
        const formData = new FormData(event.currentTarget)
        const name = formData.get('name')
        const password = formData.get('password')
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/students/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        password,
                    }),
                }
            )
            const data = await response.json()
            console.log('STATUS:', response.status)
            console.log('RESPONSE:', data)
            if (!response.ok) {
                throw new Error(
                    data.message || 'حدث خطأ أثناء تسجيل الدخول'
                )
            }
            // حفظ الـ session
            localStorage.setItem(
                'studentSession',
                JSON.stringify(data.session)
            )
            // حفظ بيانات الطالب
            localStorage.setItem(
                'student',
                JSON.stringify(data.student)
            )
            navigate('/student')
        } catch (error) {
            setMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <main className="login" dir="rtl">
            <img
                src={logInImage}
                className="logInPhoto"
                alt="our website logo"
            />
            <form
                className="studentLogin"
                onSubmit={sendData}
            >
                <h1>مرحبا بك</h1>
                <p>
                    قم بتسجيل الدخول لتتمكن من متابعة دروسك
                </p>
                <div className="container">
                    <label htmlFor="name">
                        اسم الطالب
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="أدخل اسم الطالب"
                        required
                        aria-label="اسم الطالب"
                    />
                </div>
                <div className="container">
                    <label htmlFor="password">
                        كلمة المرور
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="أدخل كلمة المرور"
                        required
                        aria-label="كلمة المرور"
                    />
                </div>

                <button
                    type="submit"
                    className="btn startLearning"
                    disabled={isLoading}
                >
                    {isLoading
                        ? 'جاري تسجيل الدخول...'
                        : 'تسجيل الدخول'}
                </button>

                {message && (
                    <p role="status">
                        {message}
                    </p>
                )}
            </form>
        </main>
    )
}