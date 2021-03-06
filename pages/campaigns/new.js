import React, { Component } from 'react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Form, Checkbox, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Router } from '../../routes';

class CampaignNew extends Component {

    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async () => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });
        try{
            const accounts = await web3.eth.getAccounts();

            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });
            Router.pushRoute('/');
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
    };

    render() {
        return(
            <Layout>
                    <h3>Create a Campaign</h3>
                  <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            value={this.state.minimumContribution}
                            onChange={event => this.setState({ minimumContribution: event.target.value })}
                            label="wei" 
                            labelPosition="right" />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <Message error header="Oops! A new campaign could not be created." content={this.state.errorMessage} />
                    <Button type='submit' primary loading={this.state.loading}>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;