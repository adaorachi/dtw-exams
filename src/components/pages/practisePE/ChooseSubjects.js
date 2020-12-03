/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Notification from '../../snippets/utils/Notification';
import { subjectList } from '../../snippets/utils/Utils';

class ChooseSubjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSub: ['english'],
    };

    this.handleChecked = this.handleChecked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChecked = e => {
    const { selectedSub } = this.state;
    const val = e.target.value;
    if (e.target.checked) {
      this.setState({
        selectedSub: [...selectedSub, val],
      });
    } else {
      this.setState({
        selectedSub: selectedSub.filter(sub => sub !== val),
      });
    }
  }

  // eslint-disable-next-line consistent-return
  handleSubmit = () => {
    const { history, auth, submitSubjects } = this.props;
    const { selectedSub } = this.state;

    if (!auth.uid) {
      history.push({
        pathname: '/login',
        redirected: true,
        loginStatus: false,
      });
    } else if (selectedSub.length === 4) {
      const btn = document.getElementById('redirect-btn');
      if (btn !== null) {
        btn.textContent = 'Entering Exam Room';
        const redirectPageTransition = setInterval(() => {
          const elem = document.getElementById('form-loader');
          if (!elem) {
            const dot = document.createElement('span');
            dot.className = 'spinner-border text-light';
            dot.id = 'form-loader';
            btn.append(dot);
          }
        });
        setTimeout(() => {
          clearTimeout(redirectPageTransition);
          submitSubjects(selectedSub, 'instructions');
        }, 2000);
      }
    }

    const notificationCont = document.getElementById('select-subject-error');
    notificationCont.style.display = 'block';
    return false;
  }

  render() {
    const { selectedSub } = this.state;
    const { match } = this.props;
    const { params } = match;

    const input = sub => {
      if (sub[0] === 'english') {
        return (<input type="checkbox" className="custom-control-input" checked="checked" id={`customCheck-${sub[0]}`} value={sub[0]} onChange={this.handleChecked} />);
      }
      return (<input type="checkbox" className="custom-control-input" id={`customCheck-${sub[0]}`} value={sub[0]} onChange={this.handleChecked} />);
    };

    // eslint-disable-next-line no-nested-ternary
    const message = (selectedSub.length < 4) ? 'Please select up to four (4) subjects before you start the exam.' : (selectedSub.length > 4) ? 'Please select no more than four (4) subjects before you start the exam.' : 'You have selected the correct number of subjects.';
    const content = {
      message, alert: selectedSub.length === 4 ? 'success' : 'danger', width: 'half',
    };

    return (
      <div className={`${params.subSlug}PE-page`}>
        <div className="notification-container redirect-error-container" id="redirect-error" />
        <div className="breadcrumbs">
          <div className="container">
            <h2>
              {(params.subSlug === 'jamb') ? 'Practice Exam For Joint Admissions and Matriculation Board (JAMB)' : (params.subSlug === 'waec') ? 'Practice Exam For West African Senior School Certificate Examination (WASSCE)' : ''}
            </h2>
            <p>This practice exam platform is designed with JAMB UTME, Post UTME, WAEC SSCE and NECO SSCE past questions with the aim of helping you prepare for your exams as you embark on your quest for admission into the university. </p>
          </div>
        </div>

        <div className="container">
          <div className="card p-3 my-3 border-card">
            <div className="card-body">
              <div className="note">
                <h4>Note</h4>
                <p>Whenever you select an examination body like JAMB for instance, or a school, like UNILAG for instance, the compulsory subjects like English language for JAMB are selected for you.</p>
                <p> All you need to do is select the other subjects that the exam body or school requires you to choose. If you notice that all the available subjects for the exam body or school are already selected, that means that all the subjects available are compulsory, and in this case, you don&apos;t need to select any other subject.</p>
                <p>Also, for Post UTME Practice, after selecting the school whose post-JAMB past questions you want to practice, if you are unsure about the subjects to select, simply select your JAMB subject combination. After, making and checking subject selections, you can click on &quot;Enter Exam Room&quot; to proceed. Remember, you can always customize an examination to suit any school of choice or examination type that is not listed.</p>
              </div>
              <div className="select-subject">
                <h5>Select Subjects:</h5>
                <div className="divider" />
                <div>
                  {Object.entries(subjectList).map(sub => (
                    <div key={sub[0]} className="custom-control custom-checkbox">
                      {input(sub)}
                      <label className="custom-control-label" htmlFor={`customCheck-${sub[0]}`}>{sub[1]}</label>
                    </div>
                  ))}
                  <button type="button" className="form-button mb-2" onClick={this.handleSubmit} id="redirect-btn">Enter Exam Room </button>
                </div>
                <Notification content={content} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ChooseSubjects);
