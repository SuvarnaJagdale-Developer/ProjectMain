import React,{useState,useEffect} from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';
/************************************* 
  * Function to Update the Customer
  **************************************/
const StoreDisplay= (props) => {
  const { open, toggleUpdateModal,fetchStoreData,store} = props;
  const [updateNameStatus, setupdateNameStatus] = useState(false)
  const [updateAddressStatus, setupdateAddressStatus] = useState(false)
  const [name, setstoreName] = useState(store.name);
  const [address, setaddress] = useState(store.address);
  useEffect(() => {
    console.log("UpdateCustomers:useEffect:Name: " +name+ "address: "+address);
    return () =>{
      console.log("UpdateCustomer:UnMount a Component using Hook")
    }
  }, [name,address])
  /************************************* 
    * Function to Update the Customer
    **************************************/
  const updateName = (e) => {
    setstoreName(e.target.value)
    setupdateNameStatus(true)
    console.log("Comp1:updateName:" + e.target.value)
  }
  /************************************* 
   * Function to Update the Address field
   **************************************/
  const updateAddress = (e) => {
      setaddress(e.target.value)
    setupdateAddressStatus(true)
    console.log("Comp1:updateAddress:" + e.target.value)
  }
 
  /************************************* 
   * Function to Update the Customer */

const   updateStores = (ccid) => {
      console.log("UpdateCustomers:updateCustomer:Sid=" + ccid + " SName: " +name +  "SAddress: " +address);
      var msg = " ";
      /* Based on the field update status edited Name or Props Name is coppied. 
  */
      let store1 = {
        id: ccid,
        name: updateNameStatus ?name:store.name,
        address: updateAddressStatus ?address:store.address
      }
      console.log("UpdateCustomers:updateCustomer:customer1:Sid=" +store1.id + " SName:"+store1.name+ " SAddress: "+store1.address);
      if (name!= null && address!= null) {
        if ((name.localeCompare(" ") !== 0 && address.localeCompare(" ") !== 0))
   {
          axios.put(`/Stores/PutStore/${ccid}`, store1)
            .then(function (res) {
              console.log(res);
              fetchStoreData();
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
          if (name.localeCompare("") === 0) {
            msg = "Customer Name field is empty..\n"
          }
          if (address.localeCompare("") === 0) {
            msg = msg + "Customer Address field is empty"
          }
          msg = msg + "Please enter the correct Customer Details\n"
          alert(msg)
        }
      } else {
        /* Show Alert on null Sales details */
        if (name== null) {
          msg = "Customer Name field is empty..\n"
  }

  if (address== null) {
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
          <Modal.Header>Edit Store</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              
              <Form>
                <Form.Field>
                  <label>Store Name</label>
                  <input  name='productName'
                    defaultValue={store.name} id='myInput'
                    onChange={(e) => updateName(e)} />
                </Form.Field>
                <Form.Field>
                  <label>Address</label>
                  <input  name='price' defaultValue={store.address} onChange={(e) => updateAddress(e)} />
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
          onClick={() => updateStores(store.id)}
          positive
        />
      </Modal.Actions>
    </Modal>

  )
}
export default StoreDisplay