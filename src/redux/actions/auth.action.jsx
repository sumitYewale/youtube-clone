import firebase from "firebase/app";
import auth from '../../firebase';
import * as Action_type from '../actionType';

export const login = () => async dispatch => {
    try {
        
        dispatch({
            type: Action_type.LOGIN_REQUEST
        })

        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl')
        const res = await auth.signInWithPopup(provider);
    
        const accessToken = res.credential.accessToken;

        const profile = {
            name: res.additionalUserInfo.profile.name,
            user_name:res.additionalUserInfo.profile.given_name,
            family_name: res.additionalUserInfo.profile.family_name,
            granted_scope: res.additionalUserInfo.profile.granted_scopes,
            id: res.additionalUserInfo.profile.id,
            picture: res.additionalUserInfo.profile.picture,
        }

        sessionStorage.setItem("yt-accessToken",accessToken);
        sessionStorage.setItem("yt-user-profile",JSON.stringify(profile));

        dispatch({
            type: Action_type.LOGIN_SUCCESS,
            payload:{
                accessToken : accessToken
            }
        })

        dispatch({
            type: Action_type.LOAD_PROFILE,
            payload:profile
        })
        
    } catch (error) {
       dispatch({
           type:Action_type.LOGIN_FAILED,
           payload:{
               error: error.message
           }
       })
    }
}

export const logout = () => async dispatch => {
    
    await auth.signOut();

    sessionStorage.removeItem('yt-accessToken');
    sessionStorage.removeItem('yt-user-profile');

    dispatch({
        type: Action_type.LOG_OUT,
        payload:null
    })
}