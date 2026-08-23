import CreateExamForm from '../components/CreateExamForm.jsx'
export default function CreateExam() {
    const token = localStorage.getItem('adminToken')
    return <main dir='rtl'>
        <CreateExamForm token={token} />
    </main>
    
}