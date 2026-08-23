import AddStudentForm from '../components/AddStudentForm.jsx'
export default function AddStudent() {
    const token = localStorage.getItem('adminToken')
    return <main className='addStudentPage' dir='rtl'>
        <AddStudentForm token={token} />
    </main>
}
