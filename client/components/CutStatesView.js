import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showMainView, cutStates } from '../../redux/reducer';

class CutStatesView extends Component {
  render() {
    return (
      <form onSubmit={e => {
          e.preventDefault()
          this.props.cutStates(Number(e.target.player.value), e.target.role.value)
          this.props.showMainView()
        }} onReset={e => {
          this.props.showMainView();
        }}>
        <select name="player">
          {
            this.props.state.players.map(
              player =>
                <option value={player} key={player}>
                  {this.props.state.playerNames.get(player)}
                </option>
            )
          }
        </select>

        <select name="role">
          {
            this.props.state.roles.map(
              role =>
                <option value={role} key={role}>
                  {role}
                </option>
            )
          }
        </select>

        <input type="submit" />
        <input type="reset" />
      </form>
    )
  }
}

const mapState = (x) => ({state: x})
const mapDispatch = { showMainView, cutStates }
export default connect(mapState, mapDispatch)(CutStatesView)