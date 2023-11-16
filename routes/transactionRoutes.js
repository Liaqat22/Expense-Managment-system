import express from 'express'
import { addTransection, deleteTransection, editTransection, getAllTransection, getSingleTransection } from '../controllers/transactionController.js'



const router = express.Router()
 
router.post('/alltransation', getAllTransection)
router.get('/singletransection/:id', getSingleTransection)
router.delete('/deletetransation/:tid', deleteTransection)
router.post('/addtransection', addTransection)
router.put('/edittransation/:tid', editTransection)


export default router