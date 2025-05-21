import { signUpSchema } from "../src/schemas/signUpSchema";
import { yubToFormError } from "../src/utils/yupToFormError";
import { useState ,useRef } from "react";

function SignUpForm()  {

    const styles = {
    divInput : 'flex gap-2',
    input: 'border-1 rounded-lg',
    textError : 'text-red-500 font-bold'
  }

  const [form,setform] = useState({
    username: '',
    nickname:'',
    password:'',
    confirmPassword:'',
    tel: '',
    age:'',
    terms: false

  })

  const [errors , setErrors] = useState({

  })

  const refs= {
    username: useRef(null),
    nickname:useRef(null),
    password:useRef(null),
    confirmPassword:useRef(null),
    tel: useRef(null),
    age: useRef(null),
    terms: useRef(null)

  }

  const hdlChange = (e)=>{
    // setform({...form , [e.target.name]:e.target.value})
    const {type , checked , name , value} = e.target
    setform((prev)=>({
        ...prev , [name]: type === 'checkbox' ? checked : value
    }))
  }

  const hdlChangeCheckbox =(e)=>{
    console.log(e.target.name)
    setform({...form , [e.target.name]: true})

  }

  console.log(form)

  const hdlSubmit = async (e)=>{
    e.preventDefault()
    try{
      await signUpSchema.validate(form , {abortEarly:false})
      alert('ส่งสำเร็จ')
      setErrors({})

    }catch(err){
    //   console.log(err)
    //   console.log(err.inner)

      // const errorObj = {}
      // err.inner.forEach((error)=>{
      //   errorObj[error.path] = error.message
      // })
      const errorObj = yubToFormError(err , refs)

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
          <label>username</label>
          <input className={styles.input} 
          type="text" 
          name='username'
          ref={refs.username}
          value={form.username} 
          onChange={hdlChange}/>
        </div>
        <p className={styles.textError}>{errors.username}</p>

        <div className='flex gap-2'>
          <label>nickname</label>
          <input className={styles.input} 
          type="text" 
          name='nickname'
          ref={refs.nickname}
          value={form.nickname} 
          onChange={hdlChange}/>
        </div>
        <p className={styles.textError}>{errors.nickname}</p>

        <div className='flex gap-2'>
          <label>password</label>
          <input 
          className={styles.input}
          type="password"
          name="password" 
          ref={refs.password}
          value={form.password}
          onChange={hdlChange}/>
        </div>
        <p className={styles.textError}>{errors.password}</p>

        <div className='flex gap-2'>
          <label>confirmPassword</label>
          <input 
          className={styles.input}
          type="password"
          name="confirmPassword" 
          ref={refs.confirmPassword}
          value={form.confirmPassword}
          onChange={hdlChange}/>
        </div>
        <p className={styles.textError}>{errors.confirmPassword}</p>

        <div className='flex gap-2'>
          <label>tel</label>
          <input 
          className={styles.input}
          type="number"
          name="tel" 
          ref={refs.tel}
          value={form.tel}
          onChange={hdlChange}/>
        </div>
        <p className={styles.textError}>{errors.tel}</p>

        <div>
          <label>age</label>
          <input className={styles.input}
          type="number"
          name='age' 
          ref={refs.age}
          value={form.age}
          onChange={hdlChange}/>
        </div>
        <p className={styles.textError}>{errors.age}</p>

        <div>
            <label>term of conditions</label>
            <input className={styles.input}
            type="checkbox" 
            name='terms'
            ref={refs.terms}
            checked={form.terms}
            onChange={hdlChange}
            ></input>
            <p className={styles.textError}>{errors.terms}</p>
        </div>
        

        <button type='submit'>สมัครสมาชิก</button>
       </form>
      </div>
    
    </>
  )
}

export default SignUpForm