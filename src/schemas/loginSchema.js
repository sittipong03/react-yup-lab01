 import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string().email('รูปแบบอีเมลไม่ถูกต้อง').required("กรุณากรอก e-mail"),
    password: Yup.string().min(6,"อย่างน้อย 6 ตัว").required("กรุณากรอก รหัสผ่าน"),
    day: Yup.number().min(1 ,'ค่ามากกว่า 1' ).max(31 , 'ค่าน้อยกว่า 31').typeError("กรุณาใส่ตัวเลข").required("กรุณากรอก วัน"),
    age: Yup.number()
    .typeError("กรุณากรอกอายุเป็นตัวเลข")
    // .min(11, "ต้องมีอายุมากกว่า 10 ปี")
     .min(11, ({path, value})=> `${path} ต้องมีอายุมากกว่า 10 ปี ตอนนี้คือ ${value}`)
    .required("กรุณากรอกอายุ")
  })