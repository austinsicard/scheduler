import React from 'react';
import PropTypes from 'prop-types';

import InterviewerListItem from 'components/InterviewerListItem';

import 'components/InterviewerList.scss';

export default function InterviewerList(props) {
  const interviewersData = props.interviewers;
  const interviewersList = interviewersData.map((interviewer) => {
    const { id, name, avatar } = interviewer;

    return (
      <InterviewerListItem
        key={id}
        name={name}
        avatar={avatar}
        selected={id === props.value}
        setInterviewer={(event) => props.onChange(id)}
        />);
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersList}</ul>
    </section> 
    );}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
