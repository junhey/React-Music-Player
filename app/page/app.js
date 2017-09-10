import React from 'react';
import Header from '../components/header'
import { MUSIC_LIST } from '../../config/musiclist';
import Pubsub from 'pubsub-js'
//tip:class写法 如果使用es6的class类继承react的component组件，constructor中必须调用super，因为子类需要用super继承component的this，否则实例化的时候会报错
class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            musiclist : MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0],
            isPlay:null,
            repeatType: 'cycle'
        };
    }
    playMusic(musicItem){
        $('#player').jPlayer('setMedia',{
            mp3 : musicItem.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem:musicItem
        })
    }
    playNext(type= 'next'){
        let index = this.findMusicIndex(this.state.currentMusicItem);
        let newIndex=null;
        let length=this.state.musiclist.length;
        if(type==='next'){
            newIndex=(index+1)%length;
        }else{
            newIndex=(index-1+length)%length;
        }
        this.playMusic(this.state.musiclist[newIndex])
    }
    playWhenEnd(){
        if(this.state.repeatType==='random'){
            let index=this.findMusicIndex(this.state.currentMusicItem);
            let randomIndex=randomRange(0, this.state.musicList.length - 1);
            while(index===randomIndex){
                randomIndex = randomRange(0, this.state.musicList.length - 1);
            }
            this.playMusic(this.state.musiclist[randomIndex]);
        }else if(this.state.repeatType==='once'){
            this.playMusic(this.state.currentMusicItem);
        }else{
            this.playNext();
        }
    }
    findMusicIndex(musicItem){
        return  this.state.musiclist.indexOf(musicItem);
    }
    componentDidMount(){
        $('#player').jPlayer({
            supplied : 'mp3',
            wmode : 'window'
        });
        this.playMusic(this.state.currentMusicItem);
        $("#player").bind($.jPlayer.event.ended, (e) => {
			this.playWhenEnd();
		});
        Pubsub.subscribe('DELETE_MUSIC' , (msg , musicItem) =>{
            if(this.state.currentMusicItem === musicItem){
                this.playNext('next');
            }
            this.setState({
                musiclist : this.state.musiclist.filter(item=>{
                    return item !== musicItem
                })
            });
            
        })
        Pubsub.subscribe('PLAY_MUSIC' , (msg , musicItem) =>{
            this.playMusic(musicItem)
        })
        Pubsub.subscribe('IS_PLAY' , (msg , isPlay) =>{
            this.setState({
                isPlay:true
            })
        })
        Pubsub.subscribe('PLAY_PREV' , (msg ) =>{
            this.playNext('prev')
        })
        Pubsub.subscribe('PLAY_NEXT' , (msg) =>{
            this.playNext('next')
        })
        let repeatList = [
			'cycle',
			'once',
			'random'
		];
        Pubsub.subscribe('CHANAGE_REPEAT',(msg)=>{
            let index=repeatList.indexOf(this.state.repeatType);
            index=(index+1)%repeatList.length;
            this.setState({
                repeatType:repeatList[index]
            });
        })
    }
    componentWillUnMount(){
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('PLAY_PREV');
        Pubsub.unsubscribe('PLAY_NEXT');
        Pubsub.unsubscribe('IS_PLAY');
        $('#player').unbind($.jPlayer.event.ended)
    }
    render(){
        return (
            <div>
                <Header />
                { React.cloneElement(this.props.children , this.state) }
            </div>
        )
    }
}
export default App
