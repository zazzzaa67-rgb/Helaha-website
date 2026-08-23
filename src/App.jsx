import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Test from './components/Test.jsx'
import Login from './pages/Login.jsx'
import Admin from './pages/Admin.jsx'
import CreateExam from './pages/CreateExam.jsx'
import Exams from './pages/Exams.jsx'
import Exam from './pages/Exam.jsx'
import AddStudent from './pages/AddStudent.jsx'
import StudentHome from './pages/StudentHome.jsx'
import StudentDetails from './pages/StudentDetails.jsx'
import LeaderBoard from './pages/LeaderBoard.jsx'
import Points from './pages/Points.jsx'
export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin/create-exam' element={<CreateExam/>}/>
        <Route path='/admin/exams' element={<CreateExam/>}/>
        <Route path='/admin/students/new' element={<AddStudent/>}/>
        <Route path='/admin/students/:studentId' element={<StudentDetails/>}/>
        <Route path='/admin' element={<Admin />} />
        <Route path='/exams' element={<Exams />} />
        <Route path='/exams/:examId' element={<Exam />} />
        <Route path='/student' element={<StudentHome />} />
        <Route path="/" element={<Landing />} />
        <Route path="/tests" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path='parentsLogin' element={<Login/>}/>
        <Route path='/leaderboard' element={<LeaderBoard/>}/>
        <Route path='/points' element={<Points/>}/>
        <Route path='*' element={<h2>Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  )
}
