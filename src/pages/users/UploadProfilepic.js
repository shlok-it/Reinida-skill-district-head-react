import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, CardText } from 'reactstrap';
import { BaseUrl } from '../../connect/api.js';
const UploadProfilepic = (props) => {
    const values = {
        id: props.employee.id,
        image_link: '',
    };
    return (
        <Modal size={"sm"} fade={false} isOpen={true} backdrop="static" keyboard={false}>
            <ModalHeader close={<button type={'button'} className="btn-close" onClick={() => { props.model_handler(false) }}></button>}><CardText>Profile image</CardText></ModalHeader>
            <ModalBody>
                <form action="" >
                    <div className="row">
                        {(values.image_link || props.employee.image_link) && (
                            <div className="col-md-12 form-group text-center">
                                <img
                                    alt="Not found"
                                    width={"100%"}
                                    src={values.image_link || (BaseUrl.resource_url + '/' + props.employee.image_link)}
                                />
                                <br />
                            </div>
                        )}
                    </div>
                    <div className="text-center py-3">
                        <button type="button" onClick={() => { props.model_handler(false) }} className="btn btn-secondary btn-rounded">Cancel</button>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
        </Modal>
    )
};
export default UploadProfilepic