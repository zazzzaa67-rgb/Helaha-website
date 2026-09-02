import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../Exams.css'
export default function Exams() {
	const [exams, setExams] = useState([])
	const [error, setError] = useState('')
	const session = JSON.parse(localStorage.getItem('studentSession') || 'null')

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/students/exams`, {
			headers: { Authorization: `Bearer ${session?.access_token || ''}` },
		})
			.then(async (response) => {
				const result = await response.json()
				if (!response.ok) throw new Error(result.message || 'فشل تحميل الامتحانات')
				return result
			})
			.then((result) => setExams(Array.isArray(result.exams) ? result.exams : []))
			.catch((requestError) => setError(requestError.message))
	}, [session?.access_token])

	return <main className="exams-page" dir='rtl'>
		<Link className='backHome' to="/student">
			الرجوع إلى الصفحة الرئيسية
			<i className="fa-solid fa-arrow-right-long"></i>
        </Link>
		<h1>الامتحانات</h1>
		{error && <p role='alert'>{error}</p>}
		{!error && exams.length === 0 && (
			<p role='status'>لا توجد امتحانات متاحة لك حاليًا.</p>
		)}
		
		{exams.map((exam) => <article key={exam.id}>
			<h2>{exam.title}</h2>
			<p>{exam.stage} - {exam.grade}</p>
			<p>{Array.isArray(exam.exam_questions) ? exam.exam_questions.length : 0} أسئلة - {exam.duration_minutes} دقيقة</p>
			<Link to={`/exams/${exam.id}`}>ابدأ الامتحان</Link>
		</article>)}
	</main>
}
