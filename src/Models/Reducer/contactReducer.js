import Types from '../Types'

const contactReducer = (state = [], actions) => {
    switch(actions.type){
        case Types.UPDATE_CONTACT :
            return actions.newData
        default : 
            return state
    }
}

export default contactReducer