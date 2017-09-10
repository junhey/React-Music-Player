const format = {
	getfomatTime: function(time) {
        time = Math.floor(time);
        let miniute = Math.floor(time / 60).toFixed(0);
		let seconds = Math.floor(time % 60).toFixed(0);
        return (miniute < 10 ? '0' + miniute : miniute) + ':' + (seconds < 10 ? '0' + seconds : seconds);
	}
}
export default format;