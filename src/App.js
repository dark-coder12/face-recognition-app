import React, {Component} from 'react';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imagelinkform';
import Rank from './components/Rank/rank';
import FaceRecognition from './components/FaceRecognition/facerecognition';
import SignIn from './components/SignIn/signin';
import Register from './components/Register/register';


import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,

  user: {

    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

const options = {

  fpsLimit: 120,

  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 2,
      straight: false,
    },
    opacity: {
      value: 0.5,
    },
  },
} 


class App extends Component{

  constructor(){

    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,

      user: {

        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {

    this.setState({user: {

        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLocation = (data) =>{

      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

      const image = document.getElementById('inputimage');

      const width = Number(image.width);
      const height = Number(image.height);

      return{

        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {

    this.setState({imageUrl: this.state.input});

        fetch('http://localhost:3001/imageurl',{
              method: 'post',
              headers: {'Content-Type' : 'application/json'},

              body: JSON.stringify({
                input: this.state.input
              })
            })
         .then(response => response.json())
         .then(response => {

         if(response){

            console.log(this.state.user.entries);

            fetch('http://localhost:3001/image',{
              method: 'put',
              headers: {'Content-Type' : 'application/json'},

              body: JSON.stringify({
                id: this.state.user.id
              })
            })

            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
         })
          .catch(console.log) 
        }
         this.displayFaceBox(this.calculateFaceLocation(response))})

         .catch(err => console.log(err));

  }

  onRouteChange = (route) => {

    if(route === 'signout'){
      this.setState(initialState);
    }
    else if (route === 'home') {
      this.setState({isSignedIn: true});
    }

    this.setState({route: route});
  }

  render(){

      const particlesInit = async (main) => {
      await loadFull(main);
    }

      const particlesLoaded = (container) => {
    }

 const {isSignedIn, imageUrl, route, box} = this.state;

 return(
        <div className= "App">

         <Particles

          className = 'particle'
          id = "tsparticles"
          init = {particlesInit}
          loaded = {particlesLoaded}
          options  = {options}
        />

          <Navigation isSignedIn={isSignedIn} onRouteChange= {this.onRouteChange}/>

          { route == 'home'
          ? <div>
                <Logo/>
                <Rank name = {this.state.user.name} entries = {this.state.user.entries} />
                <ImageLinkForm 
                  onInputChange = {this.onInputChange}
                  onButtonSubmit = {this.onButtonSubmit}/> 
                <FaceRecognition box={box} imageUrl = {imageUrl}/>
            </div>
            : (
                route === 'signin'
                ? <SignIn loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>
                : <Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>
              )
          }
        </div>
      );
  }
}

export default App;
