import { createContext, useReducer, useEffect } from "react";
import {authReducer,LOCAL_STORAGE_TOKEN_NAME} from '../reducers/authReducer'
import {apiURL} from './constants'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) =>{
    const [authState, dispatch] = useReducer(authReducer,{
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    // Authenticate user
    const loadUser = async () =>{
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try{
            const response = await axios.get(`${apiURL}/auth`)
            if(response.data.success){
                dispatch({type: 'SET_AUTH', payload:{isAuthenticated:true, user: response.data.user}})
            }
        }catch (error){
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({type:'SET_AUTH',payload:{isAuthenticated:false, user:null}})
        }
    }

    useEffect(()=> loadUser(), [])

    // Login
    const loginUser = async userFrom => {
        try {
            // console.log(apiURL);
            const response = await axios.post(`${apiURL}/auth/login`,userFrom)
            if (response.data.success)
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,response.data.accessToken)
            
            await loadUser()

            return response.data
        }catch(error){
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }
    // context data
    const authContextData = {loginUser,authState}

    return(
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider