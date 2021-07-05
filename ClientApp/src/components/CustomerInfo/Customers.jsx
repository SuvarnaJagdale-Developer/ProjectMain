import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Pagination } from 'semantic-ui-react';
import AddNewCustomer from './AddNewCustomer';
import DeleteCustomerModal from './DeleteCustomerModal';
import UpdateCustomerModal from './UpdateCustomerModal';
//import CurrencyFormat from 'react-currency-format'
 
/************************************* 
 * Class to CURD the Product data
 **************************************/
export default class Customers extends Component {
    static displayName = Customers.name;
 
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            loaded: false,
            openCreateModal: false,
            openDeleteModal: false,
            openUpdateModal: false,
            customer: {},
            totalProductsRec: 0,
            currentPage: 1,
            totalPage: 1
        };
        this.fetchCustomerData = this.fetchCustomerData.bind(this);
 
    }
    /************************************* 
    * Function to Add/Create the Product
    **************************************/
    fetchCustomerData() {
        console.log("Customers:fetchCustomerData")
        axios.get('/Customers/GetCustomer')
            .then((res) => {
                // handle success
                console.log(res.data);
                this.setState({
                    Customer: res.data,
                    loaded: true,
                    totalCustomersRec: res.data.length,
                    totalPage: Math.ceil(res.data.length / 4)
                })
                /* To fix the last Page Refresh on Delete to move to previous page */
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
 
    /************************************************************* 
    * Functions to Learn about the life Cycle of React components
    *************************************************************/
 
    componentDidMount() {
        console.log("Customers:componentDidMount");
 
        this.fetchCustomerData();
    }
 
    /************************************************************* 
     * Functions to  toggle the status of openCreateModal between true and false
     * to Open or notopen the Modal(Child Component AddNewProduct)
     *************************************************************/
    toggleCreateModal = () => {
        this.setState({ openCreateModal: !this.state.openCreateModal })
        console.log("Customers:toggleCreateModal")
    }
 
    /************************************************************* 
     * Functions to  toggle the status of openDeleteModal between true and false
     * to Open or notopen the Modal(Child Component DeleteProductModal)
     *************************************************************/
    toggleDeleteModal = () => {
        this.setState({
            openDeleteModal: !this.state.openDeleteModal
        })
 
        console.log("Customers:toggleDeleteModal")
 
    }
 
    /************************************************************* 
     * Functions setStateDeleteModal  copy the Product Row to customer variable which can be passed to
     *  the DeleteProductModal(Child Component )
     *************************************************************/
    setStateDeleteModal = (customer) => {
        this.setState({ customer: customer })
        console.log("Customers:setStateDeleteModal:Name: " + customer.customerName + " address: " + customer.address);
        this.toggleDeleteModal();
    }
 
    /************************************************************* 
     * Functions to  toggle the status of openUpdateModal between true and false
     * to Open or notopen the Modal(Child Component UpdateProductModal)
     *************************************************************/
    toggleUpdateModal = () => {
        this.setState({
            openUpdateModal: !this.state.openUpdateModal
        })
 
        console.log("Customers:toggleUpdateModal")
 
    }
 
    /************************************************************* 
    * Functions setStateUpdateModal copy the Product Row to customer variable which can be passed to
    *  the UpdateProductModal(Child Component )
    *************************************************************/
    setStateUpdateModal = (customer) => {
        this.setState({ customer: customer})
        console.log("Customers:setStateUpdateModal:Name: " + customer.customerName + " address: " + customer.address);
        this.toggleUpdateModal();
    }
/************************************************************* 
        * Functions pageChange set the Pagination attributes
        *************************************************************/
 pageChange = (e, pagData) => {
    this.setState({
        currentPage: pagData.activePage,
        totalPage: pagData.totalPages
    })
    console.log(pagData);
    console.log("Customers:pageChange:Saleid: Customer id: Store id: Sale Time: ");
}
 
    /************************************* 
     * Using Semantic UI Modal 
     **************************************/
    render() {
        console.log("Customers:render");
        const Customer = this.state.Customer;
        const loaded = this.state.loaded;
        const openCreateModal = this.state.openCreateModal;
        const openDeleteModal = this.state.openDeleteModal;
        const openUpdateModal = this.state.openUpdateModal;
        const customer = this.state.customer;
        const totalCustomersRec = this.state.totalCustomersRec;
        const currentPage = this.state.currentPage;
 
        console.log("Customers:render:Name: " + customer.customerName + " address: " + customer.address);
        if (loaded) {
            return (
                <div>
                    <AddNewCustomer
                        open={openCreateModal}
                        toggleCreateModal={() => this.toggleCreateModal()}
                        fetchCustomerData={() => this.fetchCustomerData()}
                        name={customer.customerName} />
 
                    <DeleteCustomerModal
                        open={openDeleteModal}
                        toggleDeleteModal={() => this.toggleDeleteModal()}
                        fetchCustomerData={() => this.fetchCustomerData()}
                        customer={customer} />
 
                    <UpdateCustomerModal
                        open={openUpdateModal}
                        toggleUpdateModal={() => this.toggleUpdateModal()}
                        fetchCustomerData={() => this.fetchCustomerData()}
                        customer={customer} />
 
                    
                    <Button color='blue' content='New Customer' onClick={this.toggleCreateModal} />
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
 
                                <Table.HeaderCell> Name</Table.HeaderCell>
                                <Table.HeaderCell> Address</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
 
                        <Table.Body>
                            {Customer.map((c, index) => {
                                if ((index >= ((currentPage * 4) - 4)) && (index < (currentPage * 4))) {
                                    console.log("inside if:" + index)
 
                                    return (
                                        <Table.Row key={c.id}>
 
                                            <Table.Cell>{c.customerName}</Table.Cell>
                                            <Table.Cell>
                                                {c.address} 
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button color='yellow' content='Edit' icon='edit'  onClick={() => this.setStateUpdateModal(c)} /></Table.Cell>
                                                <Table.Cell>  <Button color='red' content='Delete' icon ='trash' onClick={() => this.setStateDeleteModal(c)} />
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
                        totalPages={Math.ceil(totalCustomersRec / 4)}
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
                            
