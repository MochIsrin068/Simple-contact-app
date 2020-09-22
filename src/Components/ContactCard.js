import React, {useState} from 'react'
import {ReactComponent as IconDelete} from '../Assets/Icons/remove.svg'
import {ReactComponent as IconEdit} from '../Assets/Icons/edit.svg'
import ModalEdit from './ModalEdit'
import ModalConfirmation from './ModalConfirmation'

const ContactCard = ({item}) => {
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false)
    const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false)
    return (
        <>
            <div className="contact">
                <div className="contact__profile">
                    <img className="contact__profile__photo" src={`${item.photo}`} alt=" " onError={(event) => event.target.src = require('../Assets/Images/user.png')}/>
                    <div className="contact__profile__name">
                        <label>{item.firstName} {item.lastName}</label>
                        <p>{item.age} Years Old</p>
                    </div>
                </div>
                <div className="contact__action">
                    <div className="contact__action__edit" onClick={() => setIsModalVisibleEdit(true)}>
                        <IconEdit/>
                    </div>
                    <div className="contact__action__remove" onClick={() => setIsModalVisibleDelete(true)}>
                        <IconDelete />
                    </div>
                </div>
            </div>
            <ModalEdit closeModal={() => setIsModalVisibleEdit(false)} isModalVisible={isModalVisibleEdit} item={item}/>
            <ModalConfirmation closeModal={() => setIsModalVisibleDelete(false)} isModalVisible={isModalVisibleDelete} item={item}/>
        </>
    )
}

export default ContactCard