import React,{useState,useEffect} from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';
/************************************* 
  * Function to Update the Customer
  **************************************/
const ProductDisplay= (props) => {
  const { open, toggleUpdateModal,fetchProductData,product} = props;
  const [updateNameStatus, setupdateNameStatus] = useState(false)
  const [updateAddressStatus, setupdateAddressStatus] = useState(false)
  const [productName, setproductName] = useState(product.productname);
  const [price, setprice] = useState(product.price);
  useEffect(() => {
    console.log("UpdateCustomers:useEffect:Name: " +productName+ "address: "+price);
    return () =>{
      console.log("UpdateCustomer:UnMount a Component using Hook")
    }
  }, [productName,price])
  /************************************* 
    * Function to Update the Customer
    **************************************/
  const updateName = (e) => {
   setproductName(e.target.value)
    setupdateNameStatus(true)
    console.log("Comp1:updateName:" + e.target.value)
  }
  /************************************* 
   * Function to Update the Address field
   **************************************/
  const updateAddress = (e) => {
     setprice(e.target.value)
    setupdateAddressStatus(true)
    console.log("Comp1:updateAddress:" + e.target.value)
  }
 
  /************************************* 
   * Function to Update the Customer */

const  updateProducts = (ccid) => {
      console.log("UpdateCustomers:updateCustomer:Cid=" + ccid + " CName: " +productName +  "CAddress: " +price);
      var msg = " ";
      /* Based on the field update status edited Name or Props Name is coppied. 
  */
      let product1 = {
        id: ccid,
       productName: updateNameStatus ?productName: product.productName,
        price: updateAddressStatus ?price: product.price
      }
      console.log("UpdateCustomers:updateCustomer:customer1:Cid=" +product1.id + " CName:"+product1.productName+ " CAddress: "+ product1.price);
      if (productName!= null && price!= null) {
        if ((productName.localeCompare(" ") !== 0 && price.localeCompare(" ") !== 0))
   {
          axios.put(`/Products/PutProduct/${ccid}`, product1)
            .then(function (res) {
              console.log(res);
               fetchProductData();
              setupdateNameStatus(false)
              setupdateAddressStatus(false)
              toggleUpdateModal();
            })
            .catch(function (err) {
              console.log(err);
              setupdateNameStatus(false)
              setupdateAddressStatus(false)
              toggleUpdateModal();
            });
        } else {
          /* Show Alert on blank Sales details */
          if (productName.localeCompare("") === 0) {
            msg = "Customer Name field is empty..\n"
          }
          if (price.localeCompare("") === 0) {
            msg = msg + "Customer Address field is empty"
          }
          msg = msg + "Please enter the correct Customer Details\n"
          alert(msg)
        }
      } else {
        /* Show Alert on null Sales details */
        if (productName== null) {
          msg = "Customer Name field is empty..\n"
  }

  if (price== null) {
            msg = msg + "Customer Address field is empty..\n"
          }
          msg = msg +"Please enter the correct Customer Details\n"
          alert(msg)
        }
      }
      /************************************* 
       * Using Semantic UI Modal 
       **************************************/
      return (
       <Modal
          open={open}
      >
          <Modal.Header>Edit Product</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              
              <Form>
                <Form.Field>
                  <label>Product Name</label>
                  <input  name='productName'
                    defaultValue={product.productName} id='myInput'
                    onChange={(e) => updateName(e)} />
                </Form.Field>
                <Form.Field>
                  <label>Price</label>
                  <input  name='price' defaultValue={product.price} onChange={(e) => updateAddress(e)} />
                </Form.Field>
              </Form></Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black'onClick={() => toggleUpdateModal()}>
              Cancel
    </Button>
        <Button
          content="Edit"
          labelPosition='right'
          icon='checkmark'
          onClick={() => updateProducts(product.id)}
          positive
        />
      </Modal.Actions>
    </Modal>

  )
}
export default ProductDisplay