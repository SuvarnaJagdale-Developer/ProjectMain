import React, {  useState,useEffect } from 'react'
import {  Button, Header, Modal } from 'semantic-ui-react'
import axios from 'axios'
 
/************************************* 
 * Function to get approval to Delete the Customer
 **************************************/
 
const DeleteStore = (props) => {
  const { open, toggleDeleteModal, fetchStoreData, store } = props;
 useEffect(() => {
    console.log("UnMount a Component using Hook")
    return () => {
      console.log("UnMount a Component using Hook1")
    }
  }, [])
 
  /************************************* 
  * Function to Delete the Customer
  **************************************/
  const deleteStore= (id) => {
    console.log("Customers:deleteCustomer")
    axios.delete(`/Stores/DeleteStore/${id}`)
      .then(function (res) {
        console.log(res);
        fetchStoreData();
        toggleDeleteModal();
      })
      .catch(function (err) {
        // handle error
 
        console.log(err);
        toggleDeleteModal();
      })
 
  }
 
  /************************************* 
   * Using Semantic UI Modal & ribbon Labels as UI
   **************************************/
  return (
    <Modal
      open={open}
    ><Header>Delete Store </Header>
      <Modal.Content>
        
          <Header>Are you sure ?</Header>
          
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleDeleteModal()}>
          Cancel
        </Button>
        <Button
          content="Delete"
          color='red'
          icon='remove'
          onClick={() => deleteStore(store.id)}
          negative
        />
      </Modal.Actions>
    </Modal>
  )
}
 
export default DeleteStore
