import React, {useState, useEffect} from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import axios from 'axios'
 
/************************************* 
 * Function to Add/Create the Customer
 **************************************/
const AddNewCustomer = (props) => {
  const {open, toggleCreateModal, fetchCustomerData} = props;
  const [customername, setcustomername] = useState(null);
  const [address, setaddress] = useState(null);
  useEffect(() => {
    console.log("check", customername+address)
return() => {
  console.log("UnMount a Component using Hook")
 
}
  },[customername,address])
 
/************************************* 
 * Function to Add/Create Customer using axios
 **************************************/
 const createCustomer = () => {  var msg =""
 if(customername != null && address != null ) {
   if((customername.localeCompare("") !== 0 && address.localeCompare("")!== 0) ) {
  axios.post('/Customers/PostCustomer', {
    customername: customername,
    address: address
  })
  .then(function (res) {
    console.log(res);
    fetchCustomerData();
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

  const resetNewSalesData = () =>{
    setcustomername(null)
    setaddress(null)
    console.log("AddNewSale:resetNewSalesData:Customer Name: "+customername+" Customer Address: "+address)
     }
 
  
  return (
    <Modal
     open={open}
     >
      <Modal.Header>Create Customer</Modal.Header>
      <Modal.Content>
      <Modal.Description>
      <Form>
     <Form.Field>
      <label> Name</label>
      <input   onChange={(e) => setcustomername(e.target.value)} />
    </Form.Field>
    <Form.Field>
      <label> Address</label>
      <input  onChange={(e) => setaddress(e.target.value)} />
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
          onClick={() => createCustomer()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default AddNewCustomer