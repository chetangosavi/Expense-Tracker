import express from 'express'
import {getUserExpensesWithTotal,getExpenseById,createExpense,updateExpense,deleteExpense} from '../controllers/expenseController.js'
const router = express.Router()

router.get('/get-all-expenses', getUserExpensesWithTotal)
router.get('/get-expense/:id', getExpenseById)
router.post('/create-expense', createExpense)
router.put('/update/:id', updateExpense)
router.delete('/delete/:id', deleteExpense)

export default router;