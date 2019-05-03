import React from 'react';
import './imageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return(
        <div>
            <p className='f3'>{`this will detect faces in your pictures. try it!`}</p>
            <div className='pa4 br3 center form'>
                <input className='w-70 f4 pa2 center' type='text' placeholder='insert link of picture here' onChange={onInputChange}/>
                <button 
                className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' 
                onClick={onButtonSubmit}>Submit</button>
            </div>
            
       
           </div>
               
           );
    }   


export default ImageLinkForm;