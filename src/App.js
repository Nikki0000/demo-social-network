import logo from './logo.svg';
import './App.css';
import Header from './сomponents/Header/Header';
import Navbar from './сomponents/Navbar/Navbar';
import News from './сomponents/News/News';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import store, { updateNewPostText } from './redux/store';
import DialogsContainer from './сomponents/Dialogs/DialogsContainer';
import UsersContainer from './сomponents/Users/UsersContainer';
import ProfileContainer, { withRouter } from './сomponents/Profile/ProfileContainer';
import HeaderContainer from './сomponents/Header/HeaderContainer';
import LoginPage from './сomponents/Login/Login';
import { connect } from 'react-redux';
import {getAuthUserData} from "../src/redux/auth-reducer"
import { compose } from 'redux';
import {initializeApp} from "../src/redux/app-reducer"
import Preloader from './сomponents/common/preloader/Preloader';
import BookSection from './сomponents/Book section/BookSection';



class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {

    if(!this.props.initialized) {
      return <Preloader />
    }

    return (
    //<BrowserRouter>
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/profile' element={<ProfileContainer/>}>
              <Route path=':userId' element={<ProfileContainer />} />
            </Route>
            <Route path='/dialogs' element={<DialogsContainer />} />
            <Route path='/news' element={<News/>} />
            <Route path='/users' element={ <UsersContainer /> } />
            <Route path='/login' element={ <LoginPage/> } />
            <Route path='/sectionbook' element={ <BookSection/> } >
              <Route path=':id' element={<BookSection/>}/>
            </Route>
          </Routes>
        </div>
      </div>
    //</BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})


export default  compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);
