import bcrypt from "bcrypt"

export const hashPassword = async(password)=>{
const saltRound =10;
const hashedPassword = await bcrypt.hash(password,saltRound)
return hashedPassword
}
export const comparePassword = async(password,hashedPassword)=>{
return bcrypt.compare(password,hashedPassword)
}