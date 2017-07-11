import React, {Component} from 'react';
import { connect } from 'react-redux';
import './ProbabilityTable.scss';

class ProbabilityTable extends Component {
  prob2color(prob) {
    if(prob >= 0.95) {
      return '#000000';
    }
    if(prob <= 0.05) {
      return '#ffffff';
    }
    if(prob > 0.66) {
      return '#444444';
    }
    if(prob < 0.33) {
      return '#cccccc';
    }
    return '#888888'
  }
  render() {
    let table = this.props.state.table();
    return (
      <table className="probabilities__table">
        <thead>
          <tr className="probabilities__header_row">
            <th></th>
            {
              this.props.state.roles.map(
                role => <th key={role} className="probabilities__header_cell">{role}</th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            this.props.state.players.map(
              player =>
                <tr key={player} className="probabilities__row">
                  <td className="probabilities__user_name_cell">{this.props.state.playerNames.get(player)}</td>
                  {
                    this.props.state.roles.map(
                      role =>
                        <td key={role} className="probabilities__probability_cell" style={{color: this.prob2color(table.getIn([player, role]))}}>
                          {(table.getIn([player, role]) * 100).toFixed(1)} %
                        </td>
                    )
                  }
                </tr>
            ).toIndexedSeq()
          }
        </tbody>
      </table>
    )
  }
}

const mapState = (x) => ({state: x})
const mapDispatch = {};
export default connect(mapState, mapDispatch)(ProbabilityTable);