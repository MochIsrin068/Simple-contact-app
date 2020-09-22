import React, {useState} from 'react'
import Modal from 'react-modal'
import {ReactComponent as IconClose} from '../Assets/Icons/close.svg'
import {ReactComponent as IconDelete} from '../Assets/Icons/remove.svg'
import API from '../Services/API'
import {connect} from 'react-redux'
import Types from '../Models/Types/index'

const customStyles = {
    content : {
        top           : '50%',
        left          : '50%',
        right         : 'auto',
        bottom        : 'auto',
        marginRight   : '-50%',
        transform     : 'translate(-50%, -50%)',
        borderRadius  : 16
    },
    overlay: {
        background: "rgba(196, 196, 196, 0.8)"
    }
};

const ModalConfirmation = ({closeModal, isModalVisible, item, updateContact, contacts}) => {
    const [isDeleting, setIsDeleting,] = useState(false) 

    const onDelete = () => {
        setIsDeleting(true)
        API.deleteContact(item.id).then(() => {
            API.getContact().then((response => {
                updateContact({type: Types.UPDATE_CONTACT, newData: response.data})
                setIsDeleting(false)
                closeModal()
            }))
        })
    }   

    return (
        <Modal
            isOpen={isModalVisible}
            onRequestClose={closeModal}
            style={customStyles}
        >   
            <div className="modalCreate">
                <div className="modalCreate__header">
                    <label>&nbsp;&nbsp;Delete Contact {item.firstName} {item.lastName} ?</label>
                    <IconClose onClick={closeModal}/>
                </div>

                <div className="modalCreate__action">
                    <label onClick={closeModal}>No</label>
                    <div onClick={() => onDelete()}>
                        <IconDelete />
                        <span>{isDeleting ? "Deleting..." : "Yes"}</span>
                    </div>
                </div>
                
            </div>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        contacts : state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateContact : dispatch
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirmation)