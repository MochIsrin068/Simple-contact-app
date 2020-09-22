import React, {useState} from 'react'
import Modal from 'react-modal'
import {ReactComponent as IconClose} from '../Assets/Icons/close.svg'
import Types from "../Models/Types";
import API from '../Services/API'
import {connect} from 'react-redux'

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

const ModalEdit = ({closeModal, isModalVisible, item,  updateContact, contacts}) => {
    const [data, setData] = useState({firstName : item.firstName, lastName : item.lastName, age : item.age, photo : item.photo}) 
    const [img, setImg] = useState(null) 
    const [isSubmitting, setIsSubmitting] = useState(false) 

    const reader = new FileReader()
    reader.addEventListener("load", function () {
        setImg(reader.result)
    }, false);
    if(data.photo){   
        if(typeof data.photo === "object"){
            reader.readAsDataURL(data.photo)
        }
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setIsSubmitting(true)
        
        API.updateContact(item.id,{firstName : data.firstName, lastName : data.lastName, age : data.age, photo : img === null ?  data.photo : img}).then(() => {
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
                    <label>Update Contact ( {item.firstName} {item.lastName} )</label>
                    <IconClose onClick={closeModal}/>
                </div>
                <form className="modalCreate__form" onSubmit={(event) => onSubmit(event)}>
                    <div className="modalCreate__form__input">
                        <input onChange={({target : {value}}) => setData({...data, firstName : value})} value={data.firstName} required type="text" placeholder="Firstname..."/>
                    </div>
                    <div className="modalCreate__form__input">
                        <input onChange={({target : {value}}) => setData({...data, lastName : value})} value={data.lastName} required type="text" placeholder="Lastname..."/>
                    </div>
                    <div className="modalCreate__form__input">
                        <input onChange={({target : {value}}) => setData({...data, age : value})} value={data.age} required type="number" placeholder="Age..."/>
                    </div>
                    <div className="modalCreate__form__input">
                        <input onChange={({target : {files}}) => setData({...data, photo : files[0]})} type="file" name="image-edit" id="image-edit"/>
                        <label htmlFor="image-edit">{data.photo === null ? "Photo" : typeof data.photo === "object" ? data.photo.name : data.photo}</label>
                    </div>
                    <button type="submit" disabled={isSubmitting ? true : false}>
                        {isSubmitting ? "Updating..." : "Update"}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit)