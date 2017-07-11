import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProbabilityTable from './ProbabilityTable';
import ActionsBar from './ActionsBar';

class MainView extends Component {
    render() {
        return (
            <div>
                <ActionsBar />
                <ProbabilityTable />
            </div>
        )
    }
}

export default connect()(MainView)