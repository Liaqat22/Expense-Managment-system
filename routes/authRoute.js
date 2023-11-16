import express from 'express'
import { registerController, loginController, forgetPassword, updateProfileController,getAllUsersController, deleteUserController, getSingleUser } from '../controllers/authController.js'
// import { isAdmin, signIn } from '../middleware/authMiddleware.js'

const router = express.Router()
 
router.post('/register', registerController)
router.post('/login', loginController)
router.post('/forgetPassword', forgetPassword)
router.put('/updateprofile/:id',  updateProfileController)
router.get('/getallusers',  getAllUsersController) 
router.get('/getsingleuser/:id',  getSingleUser) 
router.delete('/deleteuser/:pid',  deleteUserController)

export default router