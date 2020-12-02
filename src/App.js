import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
// import StudyPQ from './components/singleComponent/studyPQ';
import JambPE from './components/pages/practisePE/JambPE';
import ScrollTop from './ScrollTop';
import './assets/styles/style.scss';

function App() {
  setTimeout(() => {
    document.getElementById('preloader').style.display = 'none';
  }, 1000);
  return (
    <BrowserRouter>
      <ScrollTop>
        <div className="content-wrapper">
          <Navbar />
          <div className="app-container">
            <Switch>
              <Route exact path="/register" component={SignUp} />
              <Route exact path="/login" component={SignIn} />
              <Route exact path="/" component={Home} />
              {/* <Route exact path="/practise-exam/jamb" component={JambPE} /> */}
              <Route exact path="/practise-exam/:subSlug" component={JambPE} />
              {/* <Route exact path="/past-questions/:subSlug" component={StudyPQ} />
             */}
            </Switch>
          </div>
          <Footer />
          {/* <a href="#" className="back-to-top"><i className="bx bx-up-arrow-alt"></i></a> */}
          <div id="preloader" />
        </div>
      </ScrollTop>
    </BrowserRouter>
  );
}

export default App;
