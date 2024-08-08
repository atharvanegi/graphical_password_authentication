import React, { useState } from 'react'
import { Form, ListGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import bcrypt from 'bcryptjs'
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import { FORGOT_PASSWORD_RESET } from '../constants/recoveryConstants'
export const OTPScreen = () => {

    const [otp, setOtp] = useState("")

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const sendOtp = useSelector(state => state.sendOtp)
    const { otpDetails } = sendOtp

    // const id = otpDetails && otpDetails?._id
    const email = otpDetails && otpDetails?.email
    const reqdOTP = otpDetails && otpDetails?.otp
    const collId = otpDetails && otpDetails?.collectionId

    const verifyOTP = (e) => {
        e.preventDefault()
        bcrypt.compare(otp, reqdOTP).then((res) => {
            if(res){
                setLoading(true)
                setTimeout(() => {
                    setSuccess(true)
                },1500)
                setTimeout(() => {
                    dispatch({ 
                        type:FORGOT_PASSWORD_RESET
                    })
                    navigate(`/recovery/reset/${email}/${collId}`)
                },3000)        
            }
            else{
                setError(true)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    return (
        <>
        {error && <Message variant='error' message="Invalid OTP entered" />}
        {success && <Message variant='success' message="Verified!" />}
        {loading 
        ? <Loader/> 
        : <Form onSubmit={verifyOTP} className='formcomponent mx-auto mt-5'>
            <ListGroup className='card p-3' style={{ backgroundColor:'#f1f1f1' }}>
                <ListGroup.Item className='border-0' style={{ backgroundColor:'#f1f1f1' }}>
                    <h4 className='d-flex' style={{ alignItems:'center' }}>
                        <LockIcon className='mr-2'/>
                        <div>Enter OTP</div>
                    </h4>
                    <p style={{ fontSize:'0.85rem', fontWeight:'400' }} className='mb-0 pb-0 mt-3'>
                        We have sent an email to with the otp to {email && email} be entered if want to reset your password.
                        Please do the same
                        <br/>
                        It will be a 6 digit alpha-numeric OTP
                        <br/>
                        <br/>
                        For example : <strong>AGPGT3</strong>
                    </p>
                </ListGroup.Item>
                <ListGroup.Item className='border-0' style={{ backgroundColor:'#f1f1f1' }}>
                    <Form.Group>
                        <Form.Label style={{ fontSize:'0.9rem' }}>OTP<span style={{ color:'var(--error)' }} className='ml-1'>*</span></Form.Label>
                        <Form.Control style={{ backgroundColor:'#f1f1f1' }} required value={otp} type="text" onChange={e => setOtp(e.target.value)} />
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item className="border-0 mt-1" style={{ backgroundColor:'#f1f1f1' }}>
                    <Button className='w-100' variant='contained' type="submit">Verify OTP</Button>
                    <div className='mt-2'>
                        <small style={{ fontSize:'14px' }}>
                            <Link to='/login'>
                                Remembered your password? Go back to login?
                            </Link>
                        </small>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Form>}
        </>
    )
}