import { useEffect, useMemo, useState } from 'react'
import {NavLink} from 'react-router-dom'
import '../LeaderBoard.css'
export default function LeaderBoard() {
    const [studentsRanking, setStudentsRanking] = useState([])
    const [grade, setGrade] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)

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

        fetch(`${import.meta.env.VITE_API_URL}/api/students/leaderboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (response) => {
                const result = await response.json()

                if (!response.ok) {
                    throw new Error(
                        result.message || 'فشل تحميل لوحة المتصدرين'
                    )
                }

                return result
            })
            .then((result) => {
                setStudentsRanking(result.leaderboard || [])
                setGrade(result.grade || '')
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    // ترتيب المناطق حسب مجموع نقاط طلابها
    const areaRanking = useMemo(() => {
        const areas = {}

        studentsRanking.forEach((student) => {
            const area = student.area || 'غير محدد'

            if (!areas[area]) {
                areas[area] = {
                    name: area,
                    points: 0,
                    students: 0,
                }
            }

            areas[area].points += Number(student.points) || 0
            areas[area].students += 1
        })

        return Object.values(areas).sort(
            (a, b) => b.points - a.points
        )
    }, [studentsRanking])

    if (isLoading) {
        return (
            <main className="leaderboard-page" dir="rtl">
                <div className="leaderboard-loading">
                    <div className="loading-trophy">🏆</div>
                    <p>جاري تحميل لوحة المتصدرين...</p>
                </div>
            </main>
        )
    }

    if (error) {
        return (
            <main className="leaderboard-page" dir="rtl">
                <div className="leaderboard-error">
                    <span>⚠️</span>
                    <p>{error}</p>
                </div>
            </main>
        )
    }

    return (
        <main className="leaderboard-page" dir="rtl">

            {/* Header */}
            <section className="leaderboard-hero">
                <NavLink to='student'> الرجوع الي الصفحة الرئيسية <i class="fa-solid fa-arrow-right-long"></i></NavLink>
                <div className="hero-trophy">🏆</div>
                <div>
                    <span className="hero-label">
                        المنافسة مستمرة
                    </span>
                    <h1>لوحة المتصدرين</h1>
                    <p>
                        {grade}
                    </p>
                </div>
            </section>
            {/* Area Competition */}
            <section className="areas-section">

                <div className="section-title">
                    <div>
                        <span>🔥 المنافسة الجماعية</span>
                        <h2>أفضل المناطق</h2>
                    </div>
                </div>

                <div className="areas-grid">

                    {areaRanking.slice(0, 3).map((area, index) => (
                        <div
                            className={`area-card area-${index + 1}`}
                            key={area.name}
                        >
                            <div className="area-rank">
                                {index === 0
                                    ? '🥇'
                                    : index === 1
                                        ? '🥈'
                                        : '🥉'}
                            </div>

                            <div className="area-info">
                                <h3>{area.name}</h3>

                                <span>
                                    {area.students} طالب
                                </span>
                            </div>

                            <div className="area-points">
                                <strong>
                                    {area.points.toLocaleString('ar-EG')}
                                </strong>

                                <span>نقطة</span>
                            </div>
                        </div>
                    ))}

                </div>
            </section>


            {/* Students */}
            <section className="students-section">

                <div className="section-title">
                    <div>
                        <span>⭐ المنافسة الفردية</span>
                        <h2>ترتيب الطلاب</h2>
                    </div>

                    <span className="students-count">
                        {studentsRanking.length} طالب
                    </span>
                </div>


                {/* Top 3 */}
                {studentsRanking.length >= 3 && (
                    <div className="podium">

                        {/* المركز الثاني */}
                        <div className="podium-card second">
                            <div className="podium-medal">🥈</div>

                            <div className="student-avatar">
                                {studentsRanking[1].full_name?.charAt(0)}
                            </div>

                            <h3>
                                {studentsRanking[1].full_name}
                            </h3>

                            <span className="student-area">
                                📍 {studentsRanking[1].area}
                            </span>

                            <strong>
                                {studentsRanking[1].points}
                            </strong>

                            <small>نقطة</small>
                        </div>


                        {/* المركز الأول */}
                        <div className="podium-card first">
                            <div className="crown">👑</div>

                            <div className="podium-medal">🥇</div>

                            <div className="student-avatar">
                                {studentsRanking[0].full_name?.charAt(0)}
                            </div>

                            <h3>
                                {studentsRanking[0].full_name}
                            </h3>

                            <span className="student-area">
                                📍 {studentsRanking[0].area}
                            </span>

                            <strong>
                                {studentsRanking[0].points}
                            </strong>

                            <small>نقطة</small>
                        </div>


                        {/* المركز الثالث */}
                        <div className="podium-card third">
                            <div className="podium-medal">🥉</div>

                            <div className="student-avatar">
                                {studentsRanking[2].full_name?.charAt(0)}
                            </div>

                            <h3>
                                {studentsRanking[2].full_name}
                            </h3>

                            <span className="student-area">
                                📍 {studentsRanking[2].area}
                            </span>

                            <strong>
                                {studentsRanking[2].points}
                            </strong>

                            <small>نقطة</small>
                        </div>

                    </div>
                )}


                {/* باقي الطلاب */}
                <div className="ranking-list">

                    {studentsRanking.slice(3).map((student) => (
                        <div
                            className="ranking-row"
                            key={student.id}
                        >

                            <div className="rank">
                                #{student.rank}
                            </div>

                            <div className="mini-avatar">
                                {student.full_name?.charAt(0)}
                            </div>

                            <div className="row-student">
                                <strong>
                                    {student.full_name}
                                </strong>

                                <span>
                                    📍 {student.area}
                                </span>
                            </div>

                            <div className="row-points">
                                <strong>
                                    {student.points}
                                </strong>

                                <span>
                                    نقطة
                                </span>
                            </div>

                        </div>
                    ))}

                </div>
            </section>
        </main>
    )
}