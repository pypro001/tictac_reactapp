import React,{Component} from 'react';
import {Route, Routes} from 'react-router-dom'

import HomeScreen from './HomeScreen/HomeScreen.js';
import GameScreen from './GameScreen/GameScreen.js';
import Auxilary from '../../hoc/auxilary.js'

class Layout extends Component {
  

    render() {
        return (
            <Auxilary>
                <Routes>   
                <Route path="/" exact element={<HomeScreen/>}/>
                <Route path="/game-screen" exact element={<GameScreen/>}/>
                </Routes>  
            </Auxilary>
        )
    }

}
export default Layout;