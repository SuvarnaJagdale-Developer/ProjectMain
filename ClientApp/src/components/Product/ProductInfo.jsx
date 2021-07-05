import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Pagination } from 'semantic-ui-react';
import NewProduct from './NewProduct';
import DeleteProduct from './DeleteProduct';
import ProductDisplay from './ProductDisplay';
//import CurrencyFormat from 'react-currency-format'
 
/************************************* 
 * Class to CURD the Product data
 **************************************/
export default class ProductInfo extends Component {
    static displayName = ProductInfo.name;
 
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loaded: false,
            openCreateModal: false,
            openDeleteModal: false,
            openUpdateModal: false,
             product: {},
             totalProductsRec: 0,
            currentPage: 1,
            totalPage: 1
        };
        this.fetchProductData = this.fetchProductData.bind(this);
 
    }
    /************************************* 
    * Function to Add/Create the Product
    **************************************/
     fetchProductData() {
        console.log("Customers:fetchCustomerData")
        axios.get('/Products/GetProduct')
            .then((res) => {
                // handle success
                console.log(res.data);
                this.setState({
                    Product: res.data,
                    loaded: true,
                    totalProductsRec: res.data.length,
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
 
        this.fetchProductData();
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
    setStateDeleteModal = (product) => {
        this.setState({ product: product })
        console.log("Customers:setStateDeleteModal:Name: " + product.productName + " address: " + product.price);
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
    setStateUpdateModal = (product) => {
        this.setState({ product: product})
        console.log("Customers:setStateUpdateModal:Name: " + product.productName + " address: " + product.price);
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
        console.log("Products:render");
        const Product = this.state.Product;
        const loaded = this.state.loaded;
        const openCreateModal = this.state.openCreateModal;
        const openDeleteModal = this.state.openDeleteModal;
        const openUpdateModal = this.state.openUpdateModal;
        const product = this.state.product;
        const totalProductsRec= this.state.totalProductsRec;
        const currentPage = this.state.currentPage;
 
        console.log("Product:render:Product Name: " + product.productName + " Price: " + product.price);
        if (loaded) {
            return (
                <div>
                    <NewProduct
                        open={openCreateModal}
                        toggleCreateModal={() => this.toggleCreateModal()}
                        fetchProductData={() => this.fetchProductData()}
                        name={product.productName} />
 
                    <DeleteProduct
                        open={openDeleteModal}
                        toggleDeleteModal={() => this.toggleDeleteModal()}
                        fetchProductData={() => this.fetchProductData()}
                        product={product} />
 
                    <ProductDisplay
                        open={openUpdateModal}
                        toggleUpdateModal={() => this.toggleUpdateModal()}
                        fetchProductData={() => this.fetchProductData()}
                        product={product} />
 
                    
                    <Button color='blue' content='New Product' onClick={this.toggleCreateModal} />
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
 
                                <Table.HeaderCell> Product Name</Table.HeaderCell>
                                <Table.HeaderCell> Price</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
 
                        <Table.Body>
                            {Product.map((p, index) => {
                                if ((index >= ((currentPage * 4) - 4)) && (index < (currentPage * 4))) {
                                    console.log("inside if:" + index)
 
                                    return (
                                        <Table.Row key={p.id}>
 
                                            <Table.Cell>{p.productName}</Table.Cell>
                                            <Table.Cell>
                                                {p.price} 
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
                        totalPages={Math.ceil(totalProductsRec / 4)}
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
                            
