import React, {useState} from 'react'
import Modal from 'react-modal'
import {ReactComponent as IconClose} from '../Assets/Icons/close.svg'
import API from '../Services/API'
import {connect} from 'react-redux'
import Types from "../Models/Types";

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

const ModalCreate = ({closeModal, isModalVisible, updateContact, contacts}) => {
    const [data, setData] = useState({firstName : null, lastName : null, age : null, photo : null}) 
    const [img, setImg] = useState(null) 
    const [isSubmitting, setIsSubmitting] = useState(false) 

    const reader = new FileReader()
    reader.addEventListener("load", function () {
        setImg(reader.result)
    }, false);
    if(data.photo){   
        reader.readAsDataURL(data.photo)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setIsSubmitting(true)
        
        API.addContact({firstName : data.firstName, lastName : data.lastName, age : data.age, photo : img}).then(() => {
            API.getContact().then(response => {
                updateContact({type: Types.UPDATE_CONTACT, newData: response.data})
                closeModal()
                setIsSubmitting(false)
            })
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
                    <label>Add a new Contact</label>
                    <IconClose onClick={closeModal}/>
                </div>
                <form className="modalCreate__form" onSubmit={(event) => onSubmit(event)}>
                    <div className="modalCreate__form__input">
                        <input onChange={({target : {value}}) => setData({...data, firstName : value})}  required type="text" placeholder="Firstname..."/>
                    </div>
                    <div className="modalCreate__form__input">
                        <input onChange={({target : {value}}) => setData({...data, lastName : value})}  required type="text" placeholder="Lastname..."/>
                    </div>
                    <div className="modalCreate__form__input">
                        <input onChange={({target : {value}}) => setData({...data, age : value})}  required type="number" placeholder="Age..."/>
                    </div>
                    <div className="modalCreate__form__input">
                        <input type="file" required name="image" id="image" onChange={({target : {files}}) => setData({...data, photo : files[0]})} />
                        <label htmlFor="image">Photo</label>
                    </div>
                    <button type="submit" disabled={isSubmitting ? true : false}>
                        {isSubmitting ? "Saving..." : "Save"}
                    </button>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreate)