import React, {useState, useEffect} from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import axios from 'axios'
 
/************************************* 
 * Function to Add/Create the Customer
 **************************************/
const NewProduct= (props) => {
  const {open, toggleCreateModal, fetchProductData} = props;
  const [productName, setproductname] = useState(null);
  const [price, setprice] = useState(null);
  useEffect(() => {
    console.log("check", productName+price)
return() => {
  console.log("UnMount a Component using Hook")
 
}
  },[productName,price])
 
/************************************* 
 * Function to Add/Create Customer using axios
 **************************************/
 const createProduct = () => {  var msg =""
 if(productName != null && price != null ) {
   if((productName.localeCompare("") !== 0 && price.localeCompare("")!== 0) ) {
  axios.post('/Products/PostProduct', {
    productName: productName,
    price: price
  })
  .then(function (res) {
    console.log(res);
    fetchProductData();
    resetNewSalesData();
    toggleCreateModal();
  })
  .catch(function (err) {
    console.log(err);
    resetNewSalesData();
    toggleCreateModal();
  });
 }
}
 
}
 /*********************************************************************************** 
   * Function to Update the local state fields to null before exiting the AddNewSale
   ***********************************************************************************/
  const resetNewSalesData = () =>{
    setproductname(null)
    setprice(null)
    console.log("AddNewSale:resetNewSalesData:Product Name: "+productName+" product price: "+price)
     }
 
  /*********************************************************************************** 
   * on Cancel, Function to Update the local state fields to null before exiting the AddNewSale
   ***********************************************************************************/
 // const resetNewCustomersDataOnCancel = () =>{
   // resetNewSalesData();
    //toggleCreateModal();
   // console.log("AddNewSale:resetNewSalesData:Customer Name: "+name+" Customer Address: "+address)
     //}
 /************************************* 
 * Using Semantic UI Modal & Form as UI
 **************************************/
  return (
    <Modal
     open={open}
     >
      <Modal.Header>Create Product</Modal.Header>
      <Modal.Content>
        
        <Modal.Description>
          
          <Form>
    <Form.Field>
      <label> Product Name</label>
      <input   onChange={(e) => setproductname(e.target.value)} />
    </Form.Field>
    <Form.Field>
      <label> Price</label>
      <input  onChange={(e) => setprice(e.target.value)} />
    </Form.Field>
  </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleCreateModal()}>
          Cancel
        </Button>
        <Button
          content="Create"
          labelPosition='right'
          icon='checkmark'
          onClick={() => createProduct()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default NewProduct