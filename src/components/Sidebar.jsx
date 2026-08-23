import { NavLink } from 'react-router-dom'
export default function Sidebar() {
    return (
        <aside className="sidebar" dir="rtl">
            <div className="sidebarTop">
                <span className="sidebarTitle">حلها</span>
                <span className="sidebarSubtitle">مع مستر وجدي</span>
                <button className="sidebarBtn">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
            </div>

            <nav className="sidebarNav">
                <NavLink to="/" className="navItem">
                    <span className="navIcon">🏠</span>
                    <span className="navLabel">الصفحة الرئيسية</span>
                </NavLink>
                <NavLink to="/exams" className="navItem active">
                    <span className="navIcon">📝</span>
                    <span className="navLabel">الاختبارات</span>
                </NavLink>
                <NavLink to="/student" className="navItem">
                    <span className="navIcon">👤</span>
                    <span className="navLabel">الطالب</span>
                </NavLink>
                <NavLink to="/dashboard" className="navItem">
                    <span className="navIcon">📊</span>
                    <span className="navLabel">Dashboard</span>
                </NavLink>
                <NavLink to="/lessons" className="navItem">
                    <span className="navIcon">📚</span>
                    <span className="navLabel">الدروس</span>
                </NavLink>
                <NavLink to="/students" className="navItem">
                    <span className="navIcon">👥</span>
                    <span className="navLabel">الطلاب</span>
                </NavLink>
            </nav>
            <div className="sidebarBottom">
                <div className="userProfile">
                    <span className="userName">أحمد محمد</span>
                </div>
                <button className="toggleBtn">
                    <div className="toggleSwitch"></div>
                </button>
                <span className="langLabel">Lig <span>?</span></span>
            </div>
        </aside>
    );
}
