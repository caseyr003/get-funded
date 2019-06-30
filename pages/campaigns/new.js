import React, { Component } from 'react';
import factory from '../../ethereum/factory';
import { Form, Checkbox, Button, Input } from 'semantic-ui-react';
import Layout from '../../components/Layout';

class CampaignNew extends Component {

    state = {
        minimumContribution: ''
    };

    render() {
        return(
            <Layout>
                    <h3>Create a Campaign</h3>
                  <Form>
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
                    <Button type='submit' primary>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;