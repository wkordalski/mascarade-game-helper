import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showAddPlayer, showBranch, showCut } from '../../redux/reducer';

class ActionsBar extends Component {
  render() {
    return (
      <div>
        <button onClick={e => this.props.showAddPlayer()}>Add player</button>
        <button onClick={e => this.props.showBranch()}>Branch states</button>
        <button onClick={e => this.props.showCut()}>Cut states</button>
      </div>
    );
  }
}

const mapState = (_) => ({});
const mapDispatch = {showAddPlayer, showBranch, showCut};
export default connect(mapState, mapDispatch)(ActionsBar);