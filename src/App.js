import React, {useEffect, useState} from 'react'
import './Styles/main.scss'
import Home from './Pages/Home'
import API from './Services/API'
import {connect} from 'react-redux'
import Types from './Models/Types'
import {Helmet} from 'react-helmet'

const App  = ({updateContact, contacts}) => {
  useEffect(() => {
    API.getContact().then((response) => {
      if(contacts.length < 1){
        updateContact({type: Types.UPDATE_CONTACT, newData: response.data})
      }else{
        
      }
    })
  })

  return (
    <> 
        <Helmet>
          <meta charSet="utf-8" />
          <title>Contact App</title>
        </Helmet>
      <Home />
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(App)