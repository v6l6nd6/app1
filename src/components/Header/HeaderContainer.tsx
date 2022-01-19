import React from 'react';
import Header from './Header';
import h from './Header.module.scss'
import axios from 'axios';
import { connect } from 'react-redux';
import { actions, setUserDataThunkCreate } from '../../redux/auth-reducer';
import { logOutThunkCreator } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';

class HeaderContainer extends React.Component<MapStateToPropsType&MapDispatchToPropsType> {

  componentDidMount() {
    this.props.setUserDataThunkCreate()
    
  }

  render() {
    return <Header {...this.props} logOutThunkCreator={this.props.logOutThunkCreator}  />
  }
}

const mapStateToProps = (state:AppStateType) => ({
 isAuth:state.authReducer.isAuth,
 login:state.authReducer.login
})

type MapStateToPropsType = {
  login: string | null,
  isAuth: boolean
}

type MapDispatchToPropsType = {
  setUserData : (email:string | null, login:string | null, userId:number | null, isAuth:boolean) =>void,
  setUserDataThunkCreate:()=>void,
  logOutThunkCreator:()=>void
}

export default connect(mapStateToProps, { setUserData:actions.setUserData,setUserDataThunkCreate, logOutThunkCreator })(HeaderContainer)