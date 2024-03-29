import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imagelinkform/imageLinkForm'
import Rank from './components/rank/rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/facerecognition/facerecognition'
import SignIn from './components/signin/signin'
import Register from './components/register/register'



const particlesOptions = {
  particles:{
    number:{
      value: 100,
      density:{
        enable:true,
        area:800

      }
    }
      }
    }


const initialState = {
    input:'',
    imgUrl:'',
    box:{},
    route:'signin',
    isSignedIn: false,
    user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
    }
}

class App extends Component {
  constructor(){
    super();
    this.state= initialState;
    
  }

  loadUser = (data) => {
    this.setState({user:{
            id:data.id,
            name:data.name,
            email: data.email,
            entries: data.entries,
            joined:data.joined
            }
    })
  }

  calculateFaceLocation = (data)=>{
    const clariFaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
      
    return{
      imgWidth:width,
      imgHeight:height,  
      leftCol: clariFaiFace.left_col * width,
      topRow: clariFaiFace.top_row * height,
      rightCol: width - (clariFaiFace.right_col * width),
      bottomRow: height - (clariFaiFace.bottom_row*height)
     
    }
    
  }
  
 

  displayFaceBox = (box) =>{
    this.setState({box: box})
  }

  onInputChange = (e)=>{

      this.setState({input:e.target.value})     
}

onButtonSubmit = () =>{  
  this.setState({imgUrl:this.state.input});
    fetch('http://localhost:3000/imageurl', {
        method:'post',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
            input:this.state.input
        })       
    })
    .then(response => response.json())  
    .then(response =>{ 
      if (response){
        fetch('http://localhost:3000/image', {
          method:'put',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            id:this.state.user.id
         })       
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {
            entries:count
          }))
        })
        .catch(console.log)
      }
       this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err=> console.log(err));   
}

  onRouteChange=(route)=>{
    if (route === 'signin'){
      this.setState(initialState) 
    }else if (route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }

  render() {
    const {isSignedIn, route, box, imgUrl}=this.state;
    return (
      <div className="App">
        <Particles style={{position:'fixed', top:0, right:0, bottom:0, left:0, zIndex:-1}}
            params={particlesOptions} />         
        <Navigation isSignedIn={isSignedIn}  onRouteChange={this.onRouteChange} />
        {route === 'home'
            ? <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <ImageLinkForm 
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                
                />        
                <FaceRecognition box={box} imgUrl={imgUrl}/>
              </div>
            
            : (
              this.state.route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              )
        }
      
      </div>
    );
  }
}

export default App;
