import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default class Header extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render(){
        const { activeItem } = this.state
        return (
            <Menu>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick} >
                    GET FUNDED
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item 
                        name='campaigns' 
                        active={activeItem === 'campaigns'} 
                        onClick={this.handleItemClick}>
                        Campaigns
                    </Menu.Item>

                    <Menu.Item
                        name='new'
                        active={activeItem === 'new'}
                        onClick={this.handleItemClick}>
                        +
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
};