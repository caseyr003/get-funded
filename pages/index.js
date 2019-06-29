import React, { Component } from 'react';
import factory from '../ethereum/factory';

class CampaignHome extends Component {
    async componentDidMount() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        console.log(campaigns);
    }

    render() {
        return(<h1>Campaigns</h1>);
    }
}

export default CampaignHome;