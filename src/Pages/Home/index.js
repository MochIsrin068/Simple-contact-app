import React, {useState} from 'react'
import SearchCard from '../../Components/SearchCard'
import ContactCard from '../../Components/ContactCard'
import {ReactComponent as IconAdd} from '../../Assets/Icons/user_plus.svg'
import {ReactComponent as Wave} from '../../Assets/Images/wave.svg'
import {connect} from 'react-redux';
import ModalCreate from '../../Components/ModalCreate'

const Home = ({contacts}) =>{
    const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [key, setKey] = useState('')

    setTimeout(() => {
        setIsLoading(false)
    }, 2000)


    const contactByKey = contacts.filter(item => item.id.toUpperCase() === key || item.firstName.toUpperCase() === key || item.lastName.toUpperCase() === key || item.age.toString().toUpperCase() === key)

    const changeKey = (value) => {
        setKey(value.toUpperCase())
    }

    return (
        <>  
            <Wave className="wave"/>
            <div className="home">
                <div className="home__header">
                    <SearchCard keyWord={key} setKey={changeKey}/>
                </div>
                {isLoading ? <center><img src={require("../../Assets/Images/loading.gif")} style={{marginTop : 100}}/></center> : 
                    contactByKey.length > 0 ? 
                    <div className="home__content">
                        {contactByKey.map(item => {
                            return <ContactCard item={item}/>
                        })}
                    </div> : 
                    contacts.length < 1 ?
                    <div className="home__emptyState">
                        <img src={require('../../Assets/Images/empty.png')}/>
                        <p>Data is Empty</p>
                    </div> :
                    <div className="home__content">
                        {contacts.map(item => {
                            return <ContactCard item={item}/>
                        })}
                    </div>
                }
                <div className="home__add" onClick={() => setIsModalVisibleCreate(true)}>
                    <IconAdd />
                </div>
            </div>
            <ModalCreate closeModal={() => setIsModalVisibleCreate(false)} isModalVisible={isModalVisibleCreate}/>
        </>
    )
} 

const mapStateToProps = (state) => {
    return {
        contacts : state
    }
}

export default connect(mapStateToProps)(Home)