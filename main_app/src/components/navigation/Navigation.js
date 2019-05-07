import React from 'react'

const Navigation =({onRouteChange, isSignedIn})=>{
    if (isSignedIn){
        return (
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <h3 onClick={()=>onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign Out</h3>
            </nav>
        );
        } else { 
        return (
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <h3 onClick={()=>onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</h3>
                <h3 onClick={()=>onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</h3>
            </nav>
        );
            
        }
        
}
    


export default Navigation;