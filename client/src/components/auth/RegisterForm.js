import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

const RegisterForm = () => {
    return (
    <>
        <Form className='my-4'>
            <Form.Group className="mb-3">
                <Form.Control type='text' placeholder='Username' name='username' required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control type='password' placeholder='Password' name='password' required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control type='password' placeholder='confirm password' name='confirm password' required />
            </Form.Group>
            <Button variant='success' type='submit'>register</Button>
        </Form>
        <p>Already have an account? 
            <Link to='/login'>
                <button variant='info' size='sm' className='ml-2 btn btn-info btn-sm'>Login</button>
            </Link>
        </p>
    </>
    )
}

export default RegisterForm