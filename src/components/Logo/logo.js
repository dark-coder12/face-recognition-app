import React from 'react';
import Tilt from 'react-parallax-tilt';
import './logo.css';
import logo from './logo.png';
const Logo = () => {

	return(

			<div className= "ma4 mt0">
				<Tilt className ="Tilt br2 shadow-2" options = {{max: 55}} style= {{height: 250, width: 200}}>
					<div className="Tilt-inner">
						<img src={logo} style= {{paddingTop:'5px', height: 225, width: 150}} alt='logo'/>
					</div>
				</Tilt>
			</div>
		);
}

export default Logo;