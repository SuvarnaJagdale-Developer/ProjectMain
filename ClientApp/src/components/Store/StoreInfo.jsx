import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Pagination } from 'semantic-ui-react';
import NewStore from './NewStore';
import DeleteStore from './DeleteStore';
import StoreDisplay from './StoreDisplay';
//import CurrencyFormat from 'react-currency-format'
 
/************************************* 
 * Class to CURD the Product data
 **************************************/
export default class StoreInfo extends Component {
    static displayName = StoreInfo.name;
 
    constructor(props) {
        super(props);
        this.state = {
            Stores: [],
            loaded: false,
            openCreateModal: false,
            openDeleteModal: false,
            openUpdateModal: false,
             store: {},
             totalStoresRec: 0,
            currentPage: 1,
            totalPage: 1
        };
        this.fetchStoreData = this.fetchStoreData.bind(this);
 
    }
   
     fetchStoreData() {
       
        axios.get('/Stores/GetStore')
            .then((res) => {
              
                console.log(res.data);
                this.setState({
                    Store: res.data,
                    loaded: true,
                    totalStoresRec: res.data.length,
                    totalPage: Math.ceil(res.data.length / 4)
                })
              
                if (((res.data.length % 4) ===0) && (this.state.currentPage > Math.ceil(res.data.length / 4))) {
                    console.log("Last Page= Current Page");
                    this.setState({
                        currentPage: (this.state.currentPage === 1) ? 1 : this.state.currentPage - 1
                    })
 
                }
 
            })
            .catch((err) => {
                // handle error
                console.log(err);
                this.setState({ loaded: false })
            })
            .then(() => {
                // always executed
                console.log("Always Executed");
            });
 
    }
 
   
 
    componentDidMount() {
        console.log("Customers:componentDidMount");
 
        this.fetchStoreData();
    }
 
    
    toggleCreateModal = () => {
        this.setState({ openCreateModal: !this.state.openCreateModal })
        console.log("Customers:toggleCreateModal")
    }
 
   
    toggleDeleteModal = () => {
        this.setState({
            openDeleteModal: !this.state.openDeleteModal
        })
 
        console.log("Customers:toggleDeleteModal")
 
    }
 
  
    setStateDeleteModal = (store) => {
        this.setState({ store: store })
        console.log("Customers:setStateDeleteModal:Name: " + store.name + " address: " + store.address);
        this.toggleDeleteModal();
    }
 
    
    toggleUpdateModal = () => {
        this.setState({
            openUpdateModal: !this.state.openUpdateModal
        })
 
        console.log("Customers:toggleUpdateModal")
 
    }
 
    
    setStateUpdateModal = (store) => {
        this.setState({ store: store})
        console.log("Customers:setStateUpdateModal:storeName: " + store.name + " address: " + store.address);
        this.toggleUpdateModal();
    }

 pageChange = (e, pagData) => {
    this.setState({
        currentPage: pagData.activePage,
        totalPage: pagData.totalPages
    })
    console.log(pagData);
    console.log("Customers:pageChange:Saleid: Customer id: Store id: Sale Time: ");
}
 
   
    render() {
        console.log("Products:render");
        const Store = this.state.Store;
        const loaded = this.state.loaded;
        const openCreateModal = this.state.openCreateModal;
        const openDeleteModal = this.state.openDeleteModal;
        const openUpdateModal = this.state.openUpdateModal;
        const store = this.state.store;
        const totalStoresRec= this.state.totalStoresRec;
        const currentPage = this.state.currentPage;
 
        console.log("Product:render:Product Name: " + store.name + " address: " + store.address);
        if (loaded) {
            return (
                <div>
                    <NewStore
                        open={openCreateModal}
                        toggleCreateModal={() => this.toggleCreateModal()}
                        fetchStoreData={() => this.fetchStoreData()}
                        name={store.name} />
 
                    <DeleteStore
                        open={openDeleteModal}
                        toggleDeleteModal={() => this.toggleDeleteModal()}
                        fetchStoreData={() => this.fetchStoreData()}
                        store={store} />
 
                    <StoreDisplay
                        open={openUpdateModal}
                        toggleUpdateModal={() => this.toggleUpdateModal()}
                        fetchStoreData={() => this.fetchStoreData()}
                        store={store} />
 
                    
                    <Button color='blue' content='New Store' onClick={this.toggleCreateModal} />
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
 
                                <Table.HeaderCell> Store Name</Table.HeaderCell>
                                <Table.HeaderCell> Address</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
 
                        
                        <Table.Body>
                            {Store.map((p, index) => {
                                if ((index >= ((currentPage * 4) - 4)) && (index < (currentPage * 4))) {
                                    console.log("inside if:" + index)
 
                                    return (
                                        <Table.Row key={p.id}>
 
                                            <Table.Cell>{p.name}</Table.Cell>
                                            <Table.Cell>
                                                {p.address} 
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button color='yellow' content='Edit' icon='edit'  onClick={() => this.setStateUpdateModal(p)} /></Table.Cell>
                                                <Table.Cell>  <Button color='red' content='Delete' icon ='trash' onClick={() => this.setStateDeleteModal(p)} />
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                }
                            })}
                        </Table.Body>
                   
                          </Table>
                    <Pagination
                        boundryRange={0}
                        activePage={currentPage}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={0}
                        totalPages={Math.ceil(totalStoresRec / 4)}
                        onPageChange={(e, pageData) => this.pageChange(e, pageData)}
                    />
                    <Button color='blue' floated='right'>{currentPage}</Button>
                    
                </div>
            );
        } else {
            return (
                <div>
                    <h2> </h2>
                </div>);
        }
    }
}
                            
