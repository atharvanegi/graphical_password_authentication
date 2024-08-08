import express from 'express'
import { resetPassword, sendOtp } from '../controllers/recoveryController.js'

const router = express.Router()

router.route('/sendOTP').post(sendOtp)

router.route('/reset').put(resetPassword)

export default router