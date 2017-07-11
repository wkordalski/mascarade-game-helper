import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showMainView, branchStates } from '../../redux/reducer';

class BranchStatesView extends Component {
  render() {
    return (
      <form onSubmit={e => {
          e.preventDefault()
          this.props.branchStates(
            [Number(e.target.player1.value), Number(e.target.player2.value)],
            Number(e.target.probability.value) / 100
          )
          this.props.showMainView()
        }} onReset={e => {
          this.props.showMainView()
        }}>
        <select name="player1">
          {
            this.props.state.players.map(
              player =>
                <option value={player} key={player}>
                  {this.props.state.playerNames.get(player)}
                </option>
            )
          }
        </select>

        <select name="player2">
          {
            this.props.state.players.map(
              player =>
                <option value={player} key={player}>
                  {this.props.state.playerNames.get(player)}
                </option>
            )
          }
        </select>

        <input type="number" name="probability" min="0" max="100" />

        <input type="submit" />
        <input type="reset" />
      </form>
    )
  }
}

const mapState = (x) => ({state: x})
const mapDispatch = { showMainView, branchStates }
export default connect(mapState, mapDispatch)(BranchStatesView)