import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore"; 
import { useDispatch, useSelector } from 'react-redux';
import { getImagesAction } from '../actions/imiageActions';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Divider, ImageList, ImageListItem, Button } from '@mui/material'
import { loginAction, registerAction } from '../actions/authActions';
import { forgotPasswordAction, resetPasswordAction } from '../actions/recoveryActions';
import { useNavigate } from 'react-router';
import { LIST_IMAGES_RESET } from '../constants/imageConstants';
import { RESET_PASSWORD_RESET } from '../constants/recoveryConstants';
import LockIcon from '@mui/icons-material/Lock';

export const EnterPasswordScreen = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const url = window.location.pathname.split('/')
    const endpoint = url[2];
    const email = url[3];
    let collectionId = url[4];
    const name = url[5]

    const [open, setOpen] = useState(false)
    const [selImages, setSelImages] = useState([])  
    const [show,setShow] = useState(false);

    const getImages = useSelector(state => state.getImages);
    const { loading, images } = getImages;

    const loginUser = useSelector(state => state.loginUser);
    const { loading:loadLogin, error:errorLogin, userInfo:usLogin } = loginUser

    const registerUser = useSelector(state => state.registerUser);
    const { loading:loadReg, error:errorReg } = registerUser

    const sendOtp = useSelector(state => state.sendOtp)
    const { loading:loadSend, error:errorSend, success } = sendOtp;

    const resetPassword = useSelector(state => state.resetPassword)
    const { loading:loadReset, error:errorReset, success:successReset } = resetPassword

    const [pImages, setPImages] = useState([])

    const generateImages = async () =>{
        dispatch(getImagesAction(endpoint))
        if(endpoint==="login" || endpoint==="reset"){
            const docRef = doc(db,"gpausers",collectionId)
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                let arr = []
                Object.keys(docSnap.data()).forEach(key =>  arr.push({id:docSnap.data()[key].split('_____')[1], urls:{small:docSnap.data()[key].split('_____')[0]}} ))
                setPImages([...arr]);
            }
        } 
    }

    const imageSelector = (url, id) => {
        if(selImages.length===4) setOpen(true);
        else{
            images.filter((each) => { return each.id!==id })
            setSelImages([...selImages,{ url, id }])
        }
    }

    const concat = (int) => {
        return selImages[int].url+"_____"+selImages[int].id
    }

    const shuffle = (arr) => {
        arr.sort(() => Math.random()-0.5)
        return arr;
    }

    const register = async () => {
        const collectionRef = collection(db,'gpausers');
        const payload = {
            image1:concat(0),
            image2:concat(1),
            image3:concat(2),
            image4:concat(3)
        }
        try{
            const doc = await addDoc(collectionRef, payload)
            collectionId = doc.id;
            let password = []
            selImages.forEach(ele => password.push(ele.id));
            dispatch(registerAction(name.split("%20").join(" "),email,password,collectionId))
        }
        catch(err){
            console.log("error")
        }
    }

    const login = () => {
        let password = []
        selImages.forEach(ele => password.push(ele.id));
        dispatch(loginAction(email,password))
    }

    const reset = async () => {
        const docRef = doc(db,'gpausers',collectionId);
        const payload = {
            image1:concat(0),
            image2:concat(1),
            image3:concat(2),
            image4:concat(3)
        }
        try{
            await setDoc(docRef,payload)
            let password = []
            selImages.forEach(ele => password.push(ele.id));
            dispatch(resetPasswordAction(email,password,collectionId))
        }
        catch(err){
            console.log("error")
        }
    }

    useEffect(() => {
        if(success){
            setTimeout(() => {
                navigate(`/enterotp`)
            },3000)
        }
        if(usLogin){
            dispatch({ 
                type:LIST_IMAGES_RESET
             })
            navigate('/');
        }
        if(successReset){
            dispatch({
                type:RESET_PASSWORD_RESET
            })
            navigate('/validate/login')
        }
    },[usLogin, navigate, dispatch, success,email,successReset])

    if(open) setTimeout(() => { setOpen(false) },2500)

    return (
        <>
            {loadLogin || loadReg ||loadSend || loadReset ? 
            <Loader/> 
            : <>
                <h5 className='mt-3'>{endpoint==="register" ? "Password Selection" : "Enter Password" }</h5>
                {endpoint==="register" ||endpoint==="reset"
                    ? <p className='mt-3'>Choose images to set as your graphical password, 
                        the images you select should be clicked in order of the password, 
                        i.e. the sequence in which you click the images will be your password.
                    </p>
                    : <p className='mt-3'>Choose images to enter your graphical password, 
                        the images you select should be clicked in order of the password, 
                        i.e. the sequence in which you click the images will be your password.
                    </p>
                }
                <Divider className='my-2 mb-3' />
                <div className='d-flex mb-0' style={{ alignItems:'center', justifyContent:'space-between' }}>
                    <div style={{ fontWeight:500, fontSize:'1.1rem' }}>Chosen Images</div>
                    <div>
                        {selImages.length>0 && <Button className='mr-2' variant='contained'  style={{ fontSize:12 }} onClick={e => setSelImages([])}>Clear</Button>}
                        {endpoint==="login" && <Button className='mr-2' variant='contained' onClick={e => dispatch(forgotPasswordAction(email))} style={{ fontSize:12 }}>
                            Forgot?
                        </Button>}
                        <Button variant='contained' onClick={e => endpoint==="register" ? register() : endpoint==="reset" ? reset() : login()} style={{ fontSize:12 }} disabled={selImages.length<4}>
                            {endpoint==="register" || endpoint==="reset" ? "Set Password" : "Login"}
                        </Button>
                        <Button className='ml-2' variant='contained' onClick={e => setShow(!show)} style={{ fontSize:12 }}>{show ? "hide" : "show"}</Button>
                    </div>
                </div>
                {show ? <ImageList cols={4} rowHeight={200}>
                    {selImages.map((item,index) => (
                        <div key={index} style={{ cursor:'pointer' }}>
                            <div className='badge ml-auto' style={{ backgroundColor:selImages.length===4 ? 'var(--success)' : 'gray' }} >{index+1}</div>
                            <ImageListItem className='mx-1' style={{ border:"3.5px solid", padding:0, borderRadius:'6px',
                                borderColor:selImages.length===4 ? 'var(--success)' : 'gray',
                            }}>
                                <img src={item.url} alt={index} loading="lazy" style={{ height:"100px", borderRadius:'5px' }}/>
                            </ImageListItem>
                        </div>
                    ))}
                </ImageList>
                :
                <ImageList cols={4} rowHeight={200}>
                    {selImages.map((item,index) => (
                        <div key={index} style={{ cursor:'pointer' }}>
                            <div className='badge ml-auto' style={{ backgroundColor:selImages.length===4 ? 'var(--success)' : 'gray' }} >{index+1}</div>
                            <ImageListItem className='mx-1' style={{ border:"3.5px solid", borderRadius:'6px', borderColor:selImages.length===4 ? 'var(--success)' : 'gray', textAlign:'center', alignItems:'center'}}>
                                <LockIcon style={{ top:'45%', position:'absolute' }} />
                            </ImageListItem>
                        </div>
                    ))}
                </ImageList>
                }
                <Divider className='my-2 mb-4'/>
                <div className='d-flex mb-2' style={{ alignItems:'center', justifyContent:'space-between' }}>
                    <div style={{ fontWeight:500, fontSize:'1.1rem' }}>Select from these images</div>
                    <Button onClick={generateImages} style={{ fontSize:12 }} disabled={selImages.length===4} variant='contained'>
                        Get images to select
                    </Button>
                </div>
                {loading 
                ? <Loader/> 
                : endpoint==="register" 
                ? <ImageList cols={4} rowHeight={200}>
                    {images && images.length>0 && images.map((item,index) => (
                        <ImageListItem onClick={e => imageSelector(item.urls.small, item.id)} className='m-1 border' style={{ padding:0, borderRadius:'6px', cursor:'pointer' }} key={item.id}>
                            <img
                                src={item.urls.small}
                                alt={index}
                                loading="lazy"
                                style={{ height:"150px", borderRadius:'5px', pointer:'cursor !important' }}
                            />
                        </ImageListItem>
                        ))
                    } 
                </ImageList> 
                : <ImageList cols={4} rowHeight={200}>
                {images && images.length>0 && shuffle([...images,...pImages]).map((item,index) => (
                    <ImageListItem onClick={e => imageSelector(item.urls.small, item.id)} className='m-1 border' style={{ padding:0, borderRadius:'6px', cursor:'pointer' }} key={item.id}>
                        <img
                            src={item.urls.small}
                            alt={index}
                            loading="lazy"
                            style={{ height:"150px", borderRadius:'5px', pointer:'cursor !important' }}
                        />
                    </ImageListItem>
                    ))
                } 
                </ImageList> 
                }
                {open && <Message variant='error' message="Only 4 images are need to be selected" />}
            </>}
            {success && <Message variant="success" message={`OTP sent to ${email}`} />}
            {(errorLogin || errorReg || errorSend || errorReset) && <Message variant="error" message={errorLogin || errorReg || errorSend || errorReset} />}
        </>
    )
}
