import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (

      <Menu>
        
        <Menu.Item>
       
        <Link to='/CustomerInfo'>Customers</Link>
        
      </Menu.Item>

      <Menu.Item>
      <Link to='/Product'>Products</Link>
      </Menu.Item>

      <Menu.Item >
      <Link to='/Store'>Store</Link>
      </Menu.Item>
  

    <Menu.Item >
    <Link to='/Sale'>Sale</Link>
    </Menu.Item>
     </Menu>

    
    );
  }
}
