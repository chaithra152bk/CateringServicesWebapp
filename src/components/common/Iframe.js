import React from 'react';
import Iframe from 'react-iframe';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const IframeModal = (props) => {
    const url = () => {
        return ( 
            <Iframe url = {props.url!=undefined?props.url:''}
            width = "100%"
            height = {`${window.innerHeight-150}px`}
            id = "myId"
            className = "myClassname"
            display = "initial"
            position = "relative"
            allowFullScreen />
        );
    }

    return (
        <div>
        <Modal isOpen={props.iframeModal} toggle={()=>props.toggle()} className={props.className}>
          <ModalHeader toggle={()=>props.toggle()}></ModalHeader>
          <ModalBody>
              {url()}
          </ModalBody>
          {/* <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter> */}
        </Modal>
        </div>
    );
}