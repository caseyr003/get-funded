import React, { Component } from 'react';
import factory from '../ethereum/factory';

class CampaignHome extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };
    }

    render() {
        return(<h1>{this.props.campaigns[0]}</h1>);
    }
}

export default CampaignHome;