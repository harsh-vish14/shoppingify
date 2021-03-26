import { useContext } from 'react';
import { AiOutlineGoogle } from 'react-icons/all';
import { UserContext } from '../../costext/context';
import { db } from '../../firebase';
import { googleSignIn } from '../../services/auth';
import './register.css'
const Register = () => {
    const [user, setuser] = useContext(UserContext).user;
    const google = async () => {
        const userinfo = await googleSignIn();
        if (userinfo) {
            db.collection(`users`).doc(userinfo.uid).set({}, { merge: true });
            setuser(userinfo);
        }
    };
    return (
        <div className='register-main'>
            <div style={{marginBottom:'20px'}}>
                You Can Login through your account Google Account
            </div>
            <div className='google-login-btn' onClick={google}>
                <AiOutlineGoogle className='google-logo' style={{ marginRight:'10px'}} /> Google with Login
            </div>
        </div>
    );
}

export default Register;