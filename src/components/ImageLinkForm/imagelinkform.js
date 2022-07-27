import React from 'react';
import './imagelinkform.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {

	return(

			<div className= "">
				<p className='f3'>
					{'The hottest Face Recognition App in town. Powered by React.'}
				</p>
				<div className= 'center'>
					<div className = 'form center pa4 br3 shadow-5'>
						<input formMethod="get|post" className= 'f4 pa2 w-70 center' type= 'text' onChange = {onInputChange}/>
						<button className= 'bg_custom w-30 grow f4 link ph3 pv2 dib white' onClick ={onButtonSubmit}>Detect</button>
					</div>
				</div>
			</div>
		);
}

export default ImageLinkForm;