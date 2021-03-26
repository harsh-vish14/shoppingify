import { auth, GoogleProvider } from "../firebase";

const googleSignIn = async () => {
    var user;
    await auth.signInWithPopup(GoogleProvider)
        .then((res) => {
            user = res.user
        })
        .catch((err) => {
        })
    return user
}

const logOut = async () => {
    let success;
    await auth.signOut()
        .then(() => {
            success = true;
        })
        .catch((err) => {
            success = false;
        })
    return success
}

export {googleSignIn,logOut}