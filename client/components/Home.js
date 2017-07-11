import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mode } from '../../redux/reducer';
import MainView from './MainView';
import AddPlayerView from './AddPlayerView';
import BranchStatesView from './BranchStatesView';
import CutStatesView from './CutStatesView';

class Home extends Component {
  constructor(props){
    super(props);
  }
  render() {
    if(this.props.state.mode == mode.VIEW) {
      return <MainView />
    } else if(this.props.state.mode == mode.BRANCH) {
      return <BranchStatesView />
    } else if(this.props.state.mode == mode.CUT) {
      return <CutStatesView />
    } else if(this.props.state.mode == mode.ADD_PLAYER) {
      return <AddPlayerView />
    } else {
      return (<p>Error: Unknown view...</p>)
    }
  }
}

const mapState = (x) => ({state: x});
const mapDispatch = {};
export default connect(mapState, mapDispatch)(Home);