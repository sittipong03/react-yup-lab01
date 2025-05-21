import { loginSchema } from "../src/schemas/loginSchema";
import { yubToFormError } from "../src/utils/yupToFormError";
import { useState } from "react";
function LoginForm () {

    const styles = {
    divInput : 'flex gap-2',
    input: 'border-1 rounded-lg',
    textError : 'text-red-500 font-bold'
  }

  const [form,setform] = useState({
    email: '',
    password:'',
    day:'',
    age:''

  })

  const [errors , setErrors] = useState({

  })

  const hdlChange = (e)=>{
    setform({...form , [e.target.name]:e.target.value})
  }

  const hdlSubmit = async (e)=>{
    e.preventDefault()
    try{
      await loginSchema.validate(form , {abortEarly:false})
      alert('ส่งสำเร็จ')
      setErrors({})

    }catch(err){
      console.log(err)
      console.log(err.inner)

      // const errorObj = {}
      // err.inner.forEach((error)=>{
      //   errorObj[error.path] = error.message
      // })
      const errorObj = yubToFormError(err)

      console.log(errorObj)
      setErrors(errorObj)

    }

  }


  return (
    <>
      <div>
       <p className='text-2xl font-bold pb-10'>CC 20</p>
       <form className='space-y-2' onSubmit={hdlSubmit}>
        <div className='flex gap-2'>
          <label>อีเมล</label>
          <input className={styles.input} 
          type="email" 
          name='email'
          value={form.email} 
          onChange={hdlChange}/>
        </div>
        <p className={styles.textError}>{errors.email}</p>
        <div className='flex gap-2'>
          <label>รหัสผ่าน</label>
          <input 
          className={styles.input}
          type="password"
          name="password" 
          value={form.password}
          onChange={hdlChange}/>
        </div>
        <p className={styles.textError}>{errors.password}</p>
        <div>
          <label>Day</label>
          <input className={styles.input}
          type="number"
          name='day'
          value={form.day}
          onChange={hdlChange}></input>
        </div>
        <p className={styles.textError}>{errors.day}</p>

        <div>
          <label>age</label>
          <input className={styles.input}
          type="number"
          name='age' 
          value={form.age}
          onChange={hdlChange}/>
        </div>
        <p className={styles.textError}>{errors.age}</p>

        <button type='submit'>สมัครสมาชิก</button>
       </form>
      </div>
    
    </>
  )
}

export default LoginForm