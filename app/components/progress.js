import React from 'react'
import './progress.less'

class Progress extends React.Component {
	constructor(props) {
        super(props);
        //tip:方法要绑定bind(this)才可以使用,与es5的React.createClass不同,es5的方式是自动绑定到this上的
		this.changeProgress=this.changeProgress.bind(this)
	}
	changeProgress(e){
		let progressBar = this.progressBar;
		let progressP =(e.clientX - progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
		this.props.onProgressChange && this.props.onProgressChange(progressP)
	}
	render(){
		return (
			<div className="components-progress" ref={ (progressBar) => {this.progressBar = progressBar} } onClick={this.changeProgress}>
				<div className="progress" style={{width:`${this.props.progress}%`, background:this.props.barColor}}></div>
			</div>
		)
	}
}
export default Progress;