import React, {useState, useEffect} from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import axios from 'axios'
 
/************************************* 
 * Function to Add/Create the Customer
 **************************************/
const NewStore= (props) => {
  const {open, toggleCreateModal, fetchStoreData} = props;
  const [name, setstoreName]  = useState(null);
  const [address, setaddress] = useState(null);
  useEffect(() => {
    console.log("check", name+address)
return() => {
  console.log("UnMount a Component using Hook")
 
}
  },[name,address])
 
/************************************* 
 * Function to Add/Create Customer using axios
 **************************************/
 const createStore = () => {  var msg =""
 if(name != null && address != null ) {
   if((name.localeCompare("") !== 0 && address.localeCompare("")!== 0) ) {
  axios.post('/Stores/PostStore', {
    name: name,
    address: address
  })
  .then(function (res) {
    console.log(res);
    fetchStoreData();
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
     setstoreName(null)
    setaddress(null)
    console.log("AddNewSale:resetNewSalesData:Product Name: "+name+" product address: "+address)
     }
 
  
  return (
    <Modal
     open={open}
     >
      <Modal.Header>Create Store</Modal.Header>
      <Modal.Content>
        
        <Modal.Description>
          
          <Form>
    <Form.Field>
      <label>Store Name</label>
      <input   onChange={(e) => setstoreName(e.target.value)} />
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
          onClick={() => createStore()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default NewStore