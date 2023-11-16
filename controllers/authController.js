import userModel from "../models/userModel.js"
// import { comparePassword, hashPassword } from "../helper/auth.helper.js"
// import JWT from 'jsonwebtoken'


export const registerController = async (req, res) => {
    const { name, email, password, address, phone } = req.body;

    try {
        if (!name) {
            return res.send({ error: "name is required" })
        }
        if (!email) {
            return res.send({ error: "email is required" })
        }
        if (!password) {
            return res.send({ error: "password is required" })
        }
        if (!address) {
            return res.send({ error: "address is required" })
        }
        if (!phone) {
            return res.send({ error: "phone is required" })
        }
        // if (!answer) {
        //     return res.send({ error: "answer is required" })
        // }

        //existing user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            res.status(202).send({
                success: false,
                message: 'email exist already'
            })
        }

        // const hashedPassword = await hashPassword(password)
        const user = await new userModel({ name, email, password, phone, address }).save()
        res.status(200).send({
            success: true,
            message: 'user registered succesfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            success: false,
            message: 'error in registration'
        })
    }


}

//login

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        if (!user) {
          return res.status(404).send("User Not Found").json({
            message : 'user not found'
          });
        }
        res.status(200).json({
          success: true,
          message : 'Login successfully',
          user,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message : 'something went wrong',
          error,
        });
      }
}
//forget password

export const forgetPassword = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body

        if (!email) {
            res.status(404).send({ message: 'email is required' })
        }
        if (!newPassword) {
            res.status(404).send({ message: 'password is required' })

        }
        if (!answer) {
            res.status(404).send({ message: 'answer is required' })

        }
        const user = await userModel.findOne({ email, answer })
        if (!user) {
            res.status(404).send({
                success: false,
                message: 'invalid email or answer'
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: 'password reset successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(404).send({
            success: false,
            message: "error in resetting password"
        })
    }
}

//update profile

export const updateProfileController = async (request, response) => {
   
const {id} = request.params
        const {user} = request.body;

        // const editUser = new userModel(user);
        try{
            await userModel.findByIdAndUpdate(id, user);
            response.status(201).json(user);
        } catch (error){
            response.status(409).json({ message: error.message});     
        }
    

}
//get all users

export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({})
          

        res.status(202).send({
            totalUsers: users.length,
            success: true,
            message: 'successfully got all products',
            users
        })

    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'error in getting products',
        })
    }
}
//delete user

export const deleteUserController = async (req, res) => {
    try {
        const { pid } = req.params

        const user = await userModel.findByIdAndDelete(pid)
        res.status(202).send({
            success: true,
            message: 'product deleted successfully'
        })

    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'error in deleting product',
        })
    }
}
//get single user 
export const getSingleUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}