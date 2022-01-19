// import logo from './logo.svg';
import './App.scss';
import Header from './components/Header/Header';
import NavBar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
// import UsersContainer from './components/Users/UsersContainer';
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
// import DialogsContainer from './components/Dialogs/DialogsContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import React, { Suspense } from 'react';
import Preloader from './components/common/Preloader/Preloader';
import ProfileContainer from './components/Profile/ProfileContainer';
import { LoginPresentationContainer } from './components/Login/Login';
import { ChatPage } from './pages/Chat/ChatPage';
import { TrainingComponent } from './components/Dialogs/TrainingComponent';
// {<Dialogs dial={props.dialogs} messa={props.messages} />}
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer')); // Lazy-loaded
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
// const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

export const App:React.FC = (props:any) => {


  return (

    <div className="app-wrapper">
      <HeaderContainer />
      <NavBar />

      <div className="app-wrapper-content">
        <Suspense fallback={<Preloader  />}>
          <Routes>
            <Route path='/profile' element={<ProfileContainer store={props.store}  />}>
            <Route path=':userId' element={<ProfileContainer />} />
            </Route>
            <Route path='/dialogs/' element={<DialogsContainer  />} />
            <Route path='/users/' element={<UsersContainer />} />
            <Route path='/login/' element={<LoginPresentationContainer />} />
            <Route path='/training/' element={<TrainingComponent />} />
            <Route path='/chat' element={<ChatPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>

  )
}

