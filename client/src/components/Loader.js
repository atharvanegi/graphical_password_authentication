import React from 'react'
import { CircularProgress } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DnsIcon from '@mui/icons-material/Dns';

export const Loader = () => {
  return (
    <div className='mx-auto text-center loader'>
        <CircularProgress size={80} thickness={3} style={{ color:'black' }} />
        <div><DnsIcon className='mr-2' />Render Sleeping App</div>
        <div><AccessTimeIcon className='mr-2' />Might take time!</div>
    </div>
  )
}
