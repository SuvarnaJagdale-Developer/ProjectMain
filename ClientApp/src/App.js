import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';



import Customers from './components/CustomerInfo/Customers';
import ProductInfo from './components/Product/ProductInfo';
import StoreInfo from './components/Store/StoreInfo';
import SalesInfo from './components/Sales/SalesInfo';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
     
     /*  <Layout>
       { <Route exact path='/' component={FetchCustomer} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
       { 
       <Route exact path='/' component={FetchCustomer} />
          
       }
            </Layout>
        */      
         <Layout>     
       
              <Route exact path='/' component={Customers} />
              <Route exact path='/CustomerInfo' component={Customers} />
              <Route path='/Product' component={ProductInfo} />
              
              <Route path='/Store' component={StoreInfo} />
              <Route path='/Sale' component={SalesInfo} />


          </Layout>


    );
  }
}
