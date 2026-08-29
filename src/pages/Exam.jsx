import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../Exam.css'
export default function Exam() {
	const { examId } = useParams()
	const [exam, setExam] = useState(null)
	const [answers, setAnswers] = useState({})
	const [result, setResult] = useState(null)
	const [secondsLeft, setSecondsLeft] = useState(null)
	const session = JSON.parse(localStorage.getItem('studentSession') || 'null')
	const token = session?.access_token || ''

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/students/exams`, {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				const selectedExam = data.exams?.find((item) => item.id === examId)
				setExam(selectedExam || null)
				if (selectedExam) setSecondsLeft(selectedExam.duration_minutes * 60)
			})
	}, [examId, token])

	useEffect(() => {
		if (secondsLeft === null || result) return
		if (secondsLeft <= 0) {
			submitExam()
			return
		}
		const timer = setInterval(() => setSecondsLeft((current) => current - 1), 1000)
		return () => clearInterval(timer)
	}, [result])

	function selectAnswer(questionId, answer) {
		setAnswers((current) => ({ ...current, [questionId]: answer }))
	}

	async function submitExam() {
		if (result) return
		const response = await fetch(`${import.meta.env.VITE_API_URL}/api/students/exams/${examId}/submit`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			body: JSON.stringify({
				answers: Object.entries(answers).map(([question_id, answer]) => ({ question_id, answer })),
			}),
		})
		const data = await response.json()
		if (response.ok) setResult(data)
	}

	if (!exam) return <main dir='rtl' aria-live='polite'><p>جاري تحميل الامتحان...</p></main>

	function questionIsCorrect(questionId) {
		return result?.questionResults?.find((item) => item.questionId === questionId)?.isCorrect
	}

return (
    <main className="examPage" dir="rtl">

        {/* Header */}
        <header className="examHeader">

            <div className="examHeaderInfo">
                <span className="examBadge">
                    {exam.type}
                </span>

                <h1>{exam.title}</h1>

                <p>
                    {exam.stage} • {exam.grade}
                </p>
            </div>

            <div className={`examTimer ${secondsLeft < 60 ? 'danger' : ''}`}>
                <span className="timerIcon">⏱</span>

                <div>
                    <small>الوقت المتبقي</small>
                    <strong>
                        {Math.floor(secondsLeft / 60)}:
                        {String(secondsLeft % 60).padStart(2, '0')}
                    </strong>
                </div>
            </div>

        </header>


        {/* Progress */}
        <section className="examProgress">

            <div className="progressInfo">
                <span>تقدمك في الامتحان</span>

                <strong>
                    {Object.keys(answers).length} / {exam.exam_questions.length}
                </strong>
            </div>

            <div className="progressBar">
                <span
                    style={{
                        width: `${
                            (Object.keys(answers).length /
                                exam.exam_questions.length) *
                            100
                        }%`,
                    }}
                />
            </div>

        </section>


        {/* Questions */}
        <section className="questionsContainer">

            {exam.exam_questions.map((question, index) => {

                const selectedAnswer = answers[question.id]

                const correct = questionIsCorrect(question.id)

                return (
                    <article
                        key={question.id}
                        className={`questionCard ${
                            result
                                ? correct
                                    ? 'questionCorrect'
                                    : 'questionWrong'
                                : ''
                        }`}
                    >

                        {/* Question top */}
                        <div className="questionTop">

                            <span className="questionNumber">
                                {index + 1}
                            </span>

                            <div className="questionMeta">

                                <span className="questionTopic">
                                    {question.topic}
                                </span>

                                <span className="questionPoints">
                                    {question.points} نقطة
                                </span>

                            </div>

                        </div>


                        {/* Question */}
                        <h2>
                            {question.question_text}
                        </h2>


                        {/* Answers */}
                        <div className="answersContainer">

                            {question.options.map((option, optionIndex) => {

                                const isSelected =
                                    selectedAnswer === option

                                return (
                                    <label
                                        key={option}
                                        className={`
                                            answerOption
                                            ${isSelected ? 'selected' : ''}
                                            ${
                                                result &&
                                                isSelected &&
                                                correct
                                                    ? 'correct'
                                                    : ''
                                            }
                                            ${
                                                result &&
                                                isSelected &&
                                                !correct
                                                    ? 'wrong'
                                                    : ''
                                            }
                                        `}
                                    >

                                        <input
                                            type="radio"
                                            name={question.id}
                                            value={option}
                                            checked={isSelected}
                                            onChange={() =>
                                                selectAnswer(
                                                    question.id,
                                                    option
                                                )
                                            }
                                            disabled={Boolean(result)}
                                        />

                                        <span className="optionLetter">
                                            {String.fromCharCode(
                                                65 + optionIndex
                                            )}
                                        </span>

                                        <span className="optionText">
                                            {option}
                                        </span>

                                        {result && isSelected && correct && (
                                            <span className="answerIcon">
                                                ✓
                                            </span>
                                        )}

                                        {result && isSelected && !correct && (
                                            <span className="answerIcon">
                                                ✕
                                            </span>
                                        )}

                                    </label>
                                )
                            })}

                        </div>

                    </article>
                )
            })}

        </section>


        {/* Submit */}
        {!result && (
            <div className="examSubmitContainer">

                <div>
                    <strong>
                        جاهز لتسليم الامتحان؟
                    </strong>

                    <span>
                        تأكد من إجابة جميع الأسئلة
                    </span>
                </div>

                <button
                    type="button"
                    className="submitExamButton"
                    onClick={submitExam}
                >
                    تسليم الامتحان
                    <span>→</span>
                </button>

            </div>
        )}


        {/* Result */}
        {result && (
            <section className="examResult">
                <div className="resultIcon" aria-hidden='true'>
                    🏆
                </div>
                <h2>
                    تم تسليم الامتحان بنجاح!
                </h2>
                <p>
                    أحسنت! إليك نتيجتك
                </p>
                <div className="resultScore">
                    <strong>{result.score}</strong>
                    <span>
                        / {result.totalPoints}
                    </span>
                </div>
                <div className="resultPercentage">
                    {Math.round(
                        (result.score / result.totalPoints) * 100
                    )}%
                </div>
            </section>
        )}

    </main>
)
}
