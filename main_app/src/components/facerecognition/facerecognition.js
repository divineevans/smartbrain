import React from 'react';
import './facerecognition.css'

const FaceRecognition = ({imgUrl, box}) =>{
    return(
        <div>
        <div className="center shadow-3 pa2 br2 imageDetect">
        <img id='inputimage' className='center' 
            style={{objectFit:"contain"}}
            alt='pic goes here' 
            src={imgUrl} />
        <div className="bounding-box-container" >
            <div className="bounding-boxes" style={{width:box.imgWidth, height:box.imgHeight}}>
                <div className='bounding-box' style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol }}>
                            
                </div>

            </div>
        </div>
             
                  
        </div>
    </div>
    )
    
}

export default FaceRecognition;
