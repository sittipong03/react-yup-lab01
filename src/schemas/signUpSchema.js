import * as Yup from 'yup';

export const signUpSchema = Yup.object({
    username: Yup.string()
    .required("กรุณากรอก ชื่อผู้ใช้")
    .min(3 ,'ชื่อผู้ใช้อย่างน้อย 3 ตัวอักษร')
    .matches(/^[a-zA-Z0-9_]{5,12}$/ , 'ภาษาอังกฤษ 5–12 ตัว, ห้ามมี space '),

    nickname: Yup.string()
    .required("กรุณากรอก ชื่อเล่น")
    .min(3 ,({ value ,min , path})=> `${path} ชื่อเล่นมากกว่า ${min} ตัวอักษร ${value}`),
    
    password: Yup.string()
    .min(6,"อย่างน้อย 6 ตัว")
    .required("กรุณากรอก รหัสผ่าน"),
    
    confirmPassword: Yup.string()
    .required("กรุณากรอก รหัสผ่าน")
    .oneOf([Yup.ref("password")], "ยืนยันรหัสผ่านไม่ถูกต้อง"),

    tel : Yup.string().matches(/^\d{10}$/ , "เบอร์โทรต้องมี 10 ตัวเลข"),

    age: Yup.number()
    .typeError("กรุณากรอกอายุเป็นตัวเลข")
    // .min(11, "ต้องมีอายุมากกว่า 10 ปี")
    .min(11, ({path, value})=> `${path} ต้องมีอายุมากกว่า 10 ปี ตอนนี้คือ ${value}`)
    .required("กรุณากรอกอายุ"),

    terms: Yup.boolean()
    .oneOf([true],"กรุณายอมรับเงื่อนไขก่อนสมัคร")
  })