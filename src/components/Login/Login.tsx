import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { Field, Formik } from "formik";
import * as Yup from 'yup';
import { loginThunkCreator } from "../../redux/auth-reducer";
import { Navigate } from "react-router";
import log from "./Login.module.scss";
import { Link, NavLink } from "react-router-dom";


type LoginFormType = {
    loginThunkCreatorr: (login: string, password: string, checkbox: boolean) => void
}


const LoginForm: React.FC<LoginFormType> = (props) => {



    const validateSchema: any = Yup.object().shape({
        login: Yup.string().email('Введите верный email').required()

    })
    const submit = (values: any) => {
        props.loginThunkCreatorr(values.login, values.password, values.checkbox);
    }

    return <div>
        <Formik
            initialValues={{ login: '', password: '', rememberMe: '' }}
            onSubmit={submit}
            validationSchema={validateSchema}
        >
            {props => (
                <form onSubmit={props.handleSubmit} className={log.form}>
                    <div className={log.Login}>Email<Field component="input" name="login" placeholder='your email,please' /></div>
                    {props.errors.login && props.errors.login}
                    <div className={log.Pass}>Pass<Field component="input" name="password" placeholder='your password,please'/></div>
                    <div ><span className={log.Subm}>Submit</span ><Field component="input" type="checkbox" name="rememberMe" /></div>
                    <button type="submit" className={log.btn}>send</button>
                </form>
            )}
        </Formik>
    </div>

}


// class LoginPresentationContainer extends React.Component<AllTypesLogPresent & any>{
//     render() {
//         // const Submit =(FormData:any)=>{
//         //     this.props.loginThunkCreator(FormData.login,FormData.password,FormData.checkbox,FormData.captcha);

//         // }
//         if (this.props.isAuth) {
//             return <Navigate to="/dialogs/" />
//         }


//         return <div>
//             <h1><LoginForm {...this.props} /></h1>
//         </div>
//     }
// }


export const LoginPresentationContainer: React.FC<any> = (props) => {


    // const captchaUrl = useSelector((state:AppStateType)=>state.authReducer.captchaUrl);
    const isAuth = useSelector((state: AppStateType) => state.authReducer.isAuth);
    const dispatch = useDispatch();
    const loginThunkCreatorr: any = (login: string, password: string, checkbox: boolean) => {
        dispatch(loginThunkCreator(login, password, checkbox))
    }

    if (isAuth) {
        return <Navigate to="/profile" />
    }
    return <div>
        <h1><LoginForm loginThunkCreatorr={loginThunkCreatorr} /></h1>
        <div className={log.regInfo}>
            <span>If you are not registered, please go to <div><a href="https://social-network.samuraijs.com/">https://social-network.samuraijs.com/</a></div>for further registration.</span>
            <div><span>Unfortunately, at the moment the server does not register on any ready-made project, entrusting this procedure only to the source site.</span></div>
        </div>
    </div>
}


// const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
//     isAuth: state.authReducer.isAuth,
//     captchaUrl: state.authReducer.captchaUrl
// })

// type mapStateToPropsType = {
//     captchaUrl: string | null,
//     isAuth: boolean

// };


// type mapDispatchToPropsType = {
//     loginThunkCreator: (login: string, password: string, checkbox: boolean, captcha: string | null,setStatus:any) => void
// }

// type AllTypesLogPresent = mapStateToPropsType & mapDispatchToPropsType

// export default connect(mapStateToProps, { loginThunkCreator })(LoginPresentationContainer)