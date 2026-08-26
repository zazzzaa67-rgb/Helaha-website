import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import '../Points.css'

const levels = [
    {
        name: 'Bronze',
        icon: '🥉',
        min: 0,
        max: 500,
    },
    {
        name: 'Silver',
        icon: '🥈',
        min: 500,
        max: 1500,
    },
    {
        name: 'Gold',
        icon: '⭐',
        min: 1500,
        max: 3000,
    },
    {
        name: 'Platinum',
        icon: '💎',
        min: 3000,
        max: 5000,
    },
    {
        name: 'Diamond',
        icon: '👑',
        min: 5000,
        max: Infinity,
    },
]

function getLevel(points) {
    return (
        levels.find(
            (level) =>
                points >= level.min &&
                points < level.max
        ) || levels[levels.length - 1]
    )
}

export default function Points() {
    const [points, setPoints] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const session = JSON.parse(
            localStorage.getItem('studentSession') || 'null'
        )

        const token = session?.access_token

        if (!token) {
            setError('يجب تسجيل الدخول أولًا')
            setIsLoading(false)
            return
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/students/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (response) => {
                const result = await response.json()

                if (!response.ok) {
                    throw new Error(
                        result.message ||
                        'فشل تحميل نقاط الطالب'
                    )
                }

                return result
            })
            .then((result) => {
                setPoints(
                    Number(result.stats?.earnedPoints) || 0
                )
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return (
            <main
                className="points-page"
                dir="rtl"
            >
                <div className="points-loading">
                    <span>⭐</span>
                    <p>جاري تحميل نقاطك...</p>
                </div>
            </main>
        )
    }
    if (error) {
        return (
            <main
                className="points-page"
                dir="rtl"
            >
                <div className="points-error">
                    ⚠️
                    <p>{error}</p>
                </div>
            </main>
        )
    }
    const level = getLevel(points)
    const nextLevel =
        level.max === Infinity
            ? null
            : levels[levels.indexOf(level) + 1]
    const progress =
        level.max === Infinity
            ? 100
            : Math.min(
                100,
                Math.max(
                    0,
                    ((points - level.min) /
                        (level.max - level.min)) *
                    100
                )
            )
    const remainingPoints =
        nextLevel
            ? Math.max(0, nextLevel.min - points)
            : 0
    return (
        <main
            className="points-page"
            dir="rtl"
        >
            {/* Header */}
            <section className="points-header">
                <Link className='backHome' to="/student">
                    الرجوع إلى الصفحة الرئيسية
                    <i className="fa-solid fa-arrow-right-long"></i>
                </Link>
                <div className="points-header-icon">
                    ⭐
                </div>
                <div>
                    <span>نظام المكافآت</span>
                    <h1>
                        نقاطي
                    </h1>
                    <p>
                        اجمع النقاط وارتقِ إلى مستويات أعلى
                    </p>
                </div>
            </section>
            {/* Main Points Card */}
            <section className="points-main-card">
                <div className="points-total">
                    <span>
                        نقاطك الإجمالية
                    </span>
                    <strong>
                        {points.toLocaleString('ar-EG')}
                    </strong>
                    <small>
                        نقطة
                    </small>
                </div>
                <div className="current-level">
                    <span>
                        مستواك الحالي
                    </span>
                    <strong>
                        {level.name} {level.icon}
                    </strong>
                    {nextLevel ? (
                        <small>
                            {remainingPoints.toLocaleString('ar-EG')}
                            {' '}
                            نقطة للمستوى التالي
                        </small>
                    ) : (
                        <small>
                            وصلت إلى أعلى مستوى 🎉
                        </small>
                    )}
                </div>
            </section>
            {/* Progress */}
            <section className="progress-card">
                <div className="progress-top">
                    <div>
                        <span>
                            مستواك الحالي
                        </span>
                        <strong>
                            {level.name} {level.icon}
                        </strong>
                    </div>
                    <strong>
                        {Math.round(progress)}%
                    </strong>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                </div>
                <div className="progress-bottom">
                    <span>
                        {points.toLocaleString('ar-EG')}
                        {' '}
                        نقطة
                    </span>
                    <span>
                        {level.max === Infinity
                            ? 'أعلى مستوى'
                            : `${level.max.toLocaleString('ar-EG')} نقطة`}
                    </span>
                </div>
            </section>
            {/* Levels */}
            <section className="levels-section">
                <div className="section-heading">
                    <span>🎖️</span>
                    <div>
                        <span>رحلة التقدم</span>
                        <h2>المستويات</h2>
                    </div>
                </div>
                <div className="levels-list">
                    {levels.map((item) => {
                        const isCurrent =
                            item.name === level.name
                        const isCompleted =
                            points >= item.max
                        return (
                            <div
                                className={`level-card ${
                                    isCurrent
                                        ? 'current'
                                        : ''
                                } ${
                                    isCompleted
                                        ? 'completed'
                                        : ''
                                }`}
                                key={item.name}
                            >
                                <NavLink to='student'>Back to home</NavLink>
                                <div className="level-icon">
                                    {item.icon}
                                </div>
                                <div className="level-info">
                                    <strong>
                                        {item.name}
                                    </strong>
                                    <span>
                                        {item.max === Infinity
                                            ? '5,000+'
                                            : `${item.min.toLocaleString('ar-EG')} - ${item.max.toLocaleString('ar-EG')}`}
                                    </span>
                                </div>
                                {isCurrent && (
                                    <span className="current-badge">
                                        مستواك الحالي
                                    </span>
                                )}
                            </div>
                        )
                    })}
                </div>
            </section>
            {/* Ways to earn points */}
            <section className="earn-section">
                <div className="section-heading">
                    <span>💡</span>
                    <div>
                        <span>طريقك للتقدم</span>
                        <h2>كيف تكسب النقاط؟</h2>
                    </div>
                </div>
                <div className="earn-grid">
                    <div className="earn-card">
                        <span>📚</span>
                        <div>
                            <strong>
                                إكمال درس
                            </strong>
                            <b>
                                +20
                            </b>
                        </div>
                    </div>
                    <div className="earn-card">
                        <span>✅</span>
                        <div>
                            <strong>
                                حضور الحصة
                            </strong>
                            <b>
                                +20
                            </b>
                        </div>
                    </div>
                    <div className="earn-card">
                        <span>✏️</span>
                        <div>
                            <strong>
                                إكمال واجب
                            </strong>
                            <b>
                                +30
                            </b>
                        </div>
                    </div>
                    <div className="earn-card">
                        <span>📝</span>
                        <div>
                            <strong>
                                إكمال اختبار
                            </strong>
                            <b>
                                +50
                            </b>
                        </div>
                    </div>
                    <div className="earn-card">
                        <span>🏆</span>
                        <div>
                            <strong>
                                درجة ممتازة
                            </strong>
                            <b>
                                +100
                            </b>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}