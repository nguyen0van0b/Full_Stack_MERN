import { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const LoginForm = () => {
    //Context
    const {loginUser} = useContext(AuthContext)

    // Router
    const history = useHistory()

    // local state
    const [loginForm, setLoginFrom] = useState({username:'',password:''})

    const {username, password} = loginForm

    const onChangeLoginForm = event => setLoginFrom({...loginForm, [event.target.name]: event.target.value})
    
    const login = async event => {
        event.preventDefault()
        try{
            const loginData = await loginUser(loginForm)
            console.log(loginData)
            if(loginData.success){
                history.push('/dashboard')
            }else{

            }
        }catch(error){
            console.log(error);
        }
        
    }
    
    return (
    <>
        <Form className='my-4' onSubmit={login}>
            <Form.Group className="mb-3">
                <Form.Control type='text' placeholder='Username' name='username' value={username} onChange={onChangeLoginForm} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control type='password' placeholder='Password' name='password' value={password} onChange={onChangeLoginForm} required />
            </Form.Group>
            <Button variant='success' type='submit'>Login</Button>
        </Form>
        <p>Don't have an account? 
            <Link to='/register'>
                <button variant='info' size='sm' className='ml-2 btn btn-info btn-sm'>register</button>
            </Link>
        </p>
    </>
    )
}

export default LoginForm