import React from 'react';
import '../styles/questionCard.css';
import Profile from './Profile';

function QuestionCard(props) {
  return (
    <div className="question-card">
      <h2 className="question-title">{props.title}</h2>
      <p className="question-body">{props.description}
      </p>
      <hr/>
      <div className="asked-by">
        <p>Asked by:</p>
        <Profile email={props.user}/>
      </div>
    </div>
  );
}

export default QuestionCard;
