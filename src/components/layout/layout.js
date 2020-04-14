import React from 'react';
import Canvas from '../utils/canvas/canvas';
import GithubIcon from '../../assets/images/github.png';
const Layout = () => {
	return (
		<div className="main-layout">
			<div className="text-top">
				<p className="txt-md"> नयाँ वर्ष </p>
				<p className="txt-lg">२०७७ को</p>
				<p className="txt-md">हार्दिक मंगलमय शुभकामना</p>
			</div>
			<div className="text-bottom">
				<p className="txt-md">Happy New Year</p>
				<p className="txt-lg">2077</p>
			</div>
			<div className="github">
				<p className="github-text">
					<a href="https://github.com/ashiishme" target="_blank" rel="noopener noreferrer">
						<span>Follow me</span> 
						<img className="github-icon" src={ GithubIcon }/>
					</a>
				</p>
			</div>
			<Canvas></Canvas>
		</div>
	);
}

export default Layout;