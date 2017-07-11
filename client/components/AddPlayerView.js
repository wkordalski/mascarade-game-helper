import React, { Component } from 'react';
import { connect } from 'react-redux';
import { roles, showMainView, addPlayer } from '../../redux/reducer';

class AddPlayerView extends Component {
  render() {
    // TODO: do it better
    let roles_array = Array()
    for(let v in roles) {
      roles_array.push(roles[v])
    }
    return (
      <form onSubmit={e => {
        e.preventDefault();
        this.props.addPlayer(e.target.playerName.value, e.target.playerRole.value)
        this.props.showMainView()
        }} onReset={e => this.props.showMainView()}>
        <input name="playerName" type="text" placeholder="Player name" />
        <select name="playerRole">
            {
                roles_array.map(v => <option key={v} value={v}>{v}</option>)
            }
        </select>
        <input type="submit" value="Add" />
        <input type="reset" value="Cancel" />
      </form>
    )
  }
}

const mapState = (x) => ({state: x})
const mapDispatch = {showMainView, addPlayer}
export default connect(mapState, mapDispatch)(AddPlayerView)