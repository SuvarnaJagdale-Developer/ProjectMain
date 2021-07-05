import React,{useState,useEffect} from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const UpdateCustomerModal = (props) => {
  const { open, toggleUpdateModal, fetchCustomerData, customer } = props;
  const [updateNameStatus, setupdateNameStatus] = useState(false)
  const [updateAddressStatus, setupdateAddressStatus] = useState(false)
  const [customername, setcname] = useState(customer.customername);
  const [caddress, setcaddress] = useState(customer.address);
  useEffect(() => {
    console.log("UpdateCustomers:useEffect:Name: " +customername+ "address: "+caddress);
    return () =>{
      console.log("UpdateCustomer:UnMount a Component using Hook")
    }
  }, [customername, caddress])
 
  const updateName = (e) => {
    setcname(e.target.value)
    setupdateNameStatus(true)
    console.log("Comp1:updateName:" + e.target.value)
  }

  const updateAddress = (e) => {
    setcaddress(e.target.value)
    setupdateAddressStatus(true)
    console.log("Comp1:updateAddress:" + e.target.value)
  }
 


const updateCustomer = (ccid) => {
      console.log("UpdateCustomers:updateCustomer:Cid=" + ccid + " CName: " +customername +  "CAddress: " + caddress);
      var msg = " ";
     
      let customer1 = {
        id: ccid,
        customername: updateNameStatus ?customername: customer.customername,
        address: updateAddressStatus ? caddress : customer.address
      }
      console.log("UpdateCustomers:updateCustomer:customer1:Cid=" + customer1.id + " CName:"+ customer1.customername+ " CAddress: "+ customer1.address);
      if (customername!= null && caddress != null) {
        if ((customername.localeCompare(" ") !== 0 && caddress.localeCompare(" ") !== 0))
   {
          axios.put(`/Customers/PutCustomer/${ccid}`, customer1)
            .then(function (res) {
              console.log(res);
              fetchCustomerData();
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
          if (customername.localeCompare("") === 0) {
            msg = "Customer Name field is empty..\n"
          }
          if (caddress.localeCompare("") === 0) {
            msg = msg + "Customer Address field is empty"
          }
          msg = msg + "Please enter the correct Customer Details\n"
          alert(msg)
        }
      } else {
        /* Show Alert on null Sales details */
        if (customername== null) {
          msg = "Customer Name field is empty..\n"
  }

  if (caddress == null) {
            msg = msg + "Customer Address field is empty..\n"
          }
          msg = msg +"Please enter the correct Customer Details\n"
          alert(msg)
        }
      }
      return (
       <Modal
          open={open} >
          <Modal.Header>Edit Customer</Modal.Header>
        <Modal.Content>
          
                <Form>
               <Form.Field>
                  <h3> Name</h3>
                  <input  name='cname' 
                    defaultValue={customer.customerName} id='myInput'
                    onChange={(e) => updateName(e)} />
               </Form.Field>
                 <h3> Address</h3>
                <Form.Field>
                  <input  name='caddress' defaultValue={customer.address} onChange={(e) => updateAddress(e)} />
                </Form.Field>
   

    </Form>
              </Modal.Content> 
   



         <Modal.Actions>
            <Button color='black'onClick={() => toggleUpdateModal()}>
              Cancel
    </Button>
        <Button
          content="Edit"
          labelPosition='right'
          icon='checkmark'
          onClick={() => updateCustomer(customer.id)}
          positive
        />
      </Modal.Actions> 
    </Modal>

  )
}
export default UpdateCustomerModal