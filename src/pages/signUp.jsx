export default function signUp(){
    return <section className='signUp' dir='rtl'>
        <form>
            <h1>إنشاء حساب</h1>
            <label for='name'>الاسم</label>
            <input type='text' id='name' name='name' placeholder='أدخل اسمك' required aria-label='الاسم'/>
            <label for='place'>المكان</label>
            <input type='text' id='place' name='place' placeholder='أدخل مكانك' required aria-label='المكان'/>
            <label for='phone'>الهاتف</label>
            <input type='tel' id='phone' name='phone' placeholder='أدخل هاتفك' required aria-label='الهاتف'/>
            <label for='guardianPhone'>رقم ولي  الامرأ</label>
            <input type='tel' id='guardianPhone' name='guardianPhone' placeholder='أدخل رقم ولي  الامرأ' required aria-label='رقم ولي  الامرأ'/>
            <label for='email'>البريد الإلكتروني</label>
            <input type='email' id='email' name='email' placeholder='أدخل بريدك الإلكتروني' required aria-label='البريد الإلكتروني'/>
            <button type='submit' className='btn startLearning'>إنشاء حساب</button>
        </form>
    </section>
}