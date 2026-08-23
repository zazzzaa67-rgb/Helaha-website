import { useState } from 'react'
import '../CreateExamForm.css'

const emptyQuestion = {
    topic: '',
    question_text: '',
    points: 1,
    options: ['', '', '', ''],
    correct_answer: '',
}

const gradesByStage = {
    الإعدادية: ['الصف الأول', 'الصف الثاني', 'الصف الثالث'],
    الثانوية: ['الصف الأول', 'الصف الثاني', 'الصف الثالث'],
}

export default function CreateExamForm({ token, onCreated }) {

    const [exam, setExam] = useState({
        title: '',
        type: '',
        stage: '',
        grade: '',
        duration_minutes: 30,
        total_points: 1,
    })

    const [questions, setQuestions] = useState([
        {
            ...emptyQuestion,
            options: ['', '', '', ''],
        },
    ])

    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    function updateQuestion(index, field, value) {
        setQuestions((current) =>
            current.map((question, questionIndex) =>
                questionIndex === index
                    ? {
                        ...question,
                        [field]: value,
                    }
                    : question
            )
        )
    }

    function updateOption(questionIndex, optionIndex, value) {
        setQuestions((current) =>
            current.map((question, index) => {

                if (index !== questionIndex) {
                    return question
                }

                const options = question.options.map(
                    (option, currentIndex) =>
                        currentIndex === optionIndex
                            ? value
                            : option
                )

                return {
                    ...question,
                    options,
                    correct_answer:
                        question.correct_answer === question.options[optionIndex]
                            ? value
                            : question.correct_answer,
                }
            })
        )
    }

    function addQuestion() {
        setQuestions((current) => [
            ...current,
            {
                ...emptyQuestion,
                options: ['', '', '', ''],
            },
        ])
    }

    function updateStage(stage) {
        setExam((current) => ({
            ...current,
            stage,
            grade: '',
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()

        setMessage('')
        setIsLoading(true)

        try {

            const response = await fetch(
                'http://localhost:5000/api/admin/exams',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        ...exam,
                        questions,
                    }),
                }
            )

            const result = await response.json()

            if (!response.ok) {
                throw new Error(
                    result.message || 'فشل إنشاء الامتحان'
                )
            }

            setMessage('تم إنشاء الامتحان بنجاح ✅')

            setExam({
                title: '',
                type: '',
                stage: '',
                grade: '',
                duration_minutes: 30,
                total_points: 1,
            })

            setQuestions([
                {
                    ...emptyQuestion,
                    options: ['', '', '', ''],
                },
            ])
            onCreated?.(result.exam)
        } catch (submitError) {
            setMessage(submitError.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <section className="createExam" dir="rtl">

            <div className="createExam-header">
                <div className="createExam-icon">
                    📝
                </div>
                <div>
                    <span>لوحة الإدارة</span>
                    <h2>إنشاء امتحان جديد</h2>
                    <p>
                        قم بإضافة بيانات الامتحان والأسئلة
                    </p>
                </div>

            </div>

            <form
                className="createExam-form"
                onSubmit={handleSubmit}
            >

                {/* =========================
                    EXAM INFORMATION
                ========================= */}

                <div className="exam-info-card">

                    <div className="card-title">
                        <span>📋</span>

                        <div>
                            <h3>بيانات الامتحان</h3>
                            <p>
                                المعلومات الأساسية للامتحان
                            </p>
                        </div>
                    </div>

                    <div className="form-grid">

                        <div className="form-group">

                            <label htmlFor="exam-title">
                                اسم الامتحان
                            </label>

                            <input
                                id="exam-title"
                                placeholder="مثال: اختبار الجبر"
                                value={exam.title}
                                onChange={(event) =>
                                    setExam({
                                        ...exam,
                                        title: event.target.value,
                                    })
                                }
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label htmlFor="exam-type">
                                نوع الامتحان
                            </label>

                            <input
                                id="exam-type"
                                placeholder="مثال: اختبار شهري"
                                value={exam.type}
                                onChange={(event) =>
                                    setExam({
                                        ...exam,
                                        type: event.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exam-stage">
                                المرحلة
                            </label>
                            <select
                                id="exam-stage"
                                value={exam.stage}
                                onChange={(event) =>
                                    updateStage(event.target.value)
                                }
                                required
                            >
                                <option value="">
                                    اختر المرحلة
                                </option>
                                <option value="الإعدادية">
                                    المرحلة الإعدادية
                                </option>
                                <option value="الثانوية">
                                    المرحلة الثانوية
                                </option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exam-grade">
                                الصف
                            </label>
                            <select
                                id="exam-grade"
                                value={exam.grade}
                                onChange={(event) =>
                                    setExam({
                                        ...exam,
                                        grade: event.target.value,
                                    })
                                }
                                disabled={!exam.stage}
                                required
                            >
                                <option value="">
                                    اختر الصف
                                </option>
                                {(
                                    gradesByStage[exam.stage] || []
                                ).map((grade) => (
                                    <option
                                        key={grade}
                                        value={grade}
                                    >
                                        {grade}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exam-duration">
                                مدة الامتحان بالدقائق
                            </label>
                            <input
                                id="exam-duration"
                                type="number"
                                min="1"
                                value={exam.duration_minutes}
                                onChange={(event) =>
                                    setExam({
                                        ...exam,
                                        duration_minutes:
                                            Number(
                                                event.target.value
                                            ),
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exam-total-points">
                                إجمالي نقاط الامتحان
                            </label>
                            <input
                                id="exam-total-points"
                                type="number"
                                min="1"
                                value={exam.total_points}
                                onChange={(event) =>
                                    setExam({
                                        ...exam,
                                        total_points:
                                            Number(
                                                event.target.value
                                            ),
                                    })
                                }
                                required
                            />
                        </div>
                    </div>
                </div>
                {/* =========================
                    QUESTIONS
                ========================= */}

                <div className="questions-section">

                    <div className="section-header">

                        <div>
                            <span>❓</span>

                            <div>
                                <h3>أسئلة الامتحان</h3>
                                <p>
                                    أضف الأسئلة والاختيارات
                                </p>
                            </div>
                        </div>

                        <span className="questions-count">
                            {questions.length} سؤال
                        </span>

                    </div>

                    {questions.map((question, index) => (

                        <fieldset
                            key={index}
                            className="question-card"
                        >

                            <div className="question-header">

                                <div className="question-number">
                                    {index + 1}
                                </div>

                                <div>
                                    <h3>
                                        السؤال {index + 1}
                                    </h3>

                                    <span>
                                        أضف بيانات السؤال
                                    </span>
                                </div>

                            </div>

                            <div className="question-fields">

                                <div className="form-group">

                                    <label
                                        htmlFor={`question-topic-${index}`}
                                    >
                                        موضوع السؤال
                                    </label>

                                    <input
                                        id={`question-topic-${index}`}
                                        placeholder="مثال: جبر"
                                        value={question.topic}
                                        onChange={(event) =>
                                            updateQuestion(
                                                index,
                                                'topic',
                                                event.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label
                                        htmlFor={`question-points-${index}`}
                                    >
                                        نقاط السؤال
                                    </label>

                                    <input
                                        id={`question-points-${index}`}
                                        type="number"
                                        min="1"
                                        value={question.points}
                                        onChange={(event) =>
                                            updateQuestion(
                                                index,
                                                'points',
                                                Number(
                                                    event.target.value
                                                )
                                            )
                                        }
                                        required
                                    />

                                </div>

                            </div>

                            <div className="form-group">

                                <label
                                    htmlFor={`question-text-${index}`}
                                >
                                    نص السؤال
                                </label>

                                <textarea
                                    id={`question-text-${index}`}
                                    placeholder="اكتب نص السؤال هنا..."
                                    value={
                                        question.question_text
                                    }
                                    onChange={(event) =>
                                        updateQuestion(
                                            index,
                                            'question_text',
                                            event.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            {/* OPTIONS */}

                            <div className="options-container">

                                <div className="options-header">

                                    <div>
                                        <h4>
                                            الاختيارات
                                        </h4>

                                        <span>
                                            اختر الإجابة الصحيحة
                                        </span>
                                    </div>

                                    <span className="options-badge">
                                        4 اختيارات
                                    </span>

                                </div>

                                <div className="options-list">

                                    {question.options.map(
                                        (
                                            option,
                                            optionIndex
                                        ) => (

                                            <div
                                                className={`option-row ${
                                                    question.correct_answer ===
                                                    option &&
                                                    option.trim()
                                                        ? 'correct'
                                                        : ''
                                                }`}
                                                key={optionIndex}
                                            >

                                                <span className="option-number">
                                                    {String.fromCharCode(
                                                        65 +
                                                        optionIndex
                                                    )}
                                                </span>

                                                <input
                                                    id={`question-${index}-option-${optionIndex}`}
                                                    placeholder={`اكتب الاختيار ${optionIndex + 1}`}
                                                    value={option}
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        updateOption(
                                                            index,
                                                            optionIndex,
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    required
                                                />

                                                <label
                                                    htmlFor={`question-${index}-correct-${optionIndex}`}
                                                    className="correct-option"
                                                >

                                                    <input
                                                        type="radio"
                                                        id={`question-${index}-correct-${optionIndex}`}
                                                        name={`correct-answer-${index}`}
                                                        checked={
                                                            question.correct_answer ===
                                                            option &&
                                                            option.trim() !==
                                                                ''
                                                        }
                                                        onChange={() =>
                                                            updateQuestion(
                                                                index,
                                                                'correct_answer',
                                                                option
                                                            )
                                                        }
                                                        disabled={
                                                            !option.trim()
                                                        }
                                                    />
                                                    <span className="radio-custom"></span>
                                                    <span>
                                                        صحيحة
                                                    </span>
                                                </label>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </fieldset>
                    ))}
                </div>
                {/* =========================
                    ACTIONS
                ========================= */}

                <div className="exam-actions">
                    <button
                        type="button"
                        onClick={addQuestion}
                        className="add-question-btn"
                    >
                        <span>＋</span>
                        إضافة سؤال
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="create-exam-btn"
                    >
                        {isLoading ? (
                            <>
                                <span className="loading-spinner"></span>
                                جاري الإنشاء...
                            </>
                        ) : (
                            <>
                                <span>✓</span>
                                إنشاء الامتحان
                            </>
                        )}
                    </button>
                </div>
                {message && (
                    <div
                        className={`exam-message ${
                            message.includes('نجاح')
                                ? 'success'
                                : 'error'
                        }`}
                        role="status"
                    >
                        {message}
                    </div>
                )}
            </form>
        </section>
    )
}
