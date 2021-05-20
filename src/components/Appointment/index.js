import React from "react";

import useVisualMode from "hooks/useVisualMode";
import "./style.scss";

import Confirm from "components/Appointment/Confirm";
import Empty from "components/Appointment/Empty";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";

const CONFIRM = "CONFIRM";
const CREATE = "CREATE";
const DELETING = "DELETING";
const EDIT = "EDIT";
const EMPTY = "EMPTY";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";
const SHOW = "SHOW";
const SAVING = "SAVING";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function destroy(event) {
    transition(DELETING, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));
   }


  return (
    <article data-testid="appointment" className="appointment">

                                  <Header 
                                  time={props.time} 
                                                                            />

      {mode === EMPTY &&          <Empty 
                                   onAdd={() => transition(CREATE)} 
                                                                            />}

      {mode === SHOW  && (        <Show
                                   student={props.interview.student}
                                   interviewer={props.interview.interviewer}
                                   onEdit={() => transition(EDIT)}
                                   onDelete={() => transition(CONFIRM)}
                                                                            />)}

      {mode === CREATE && (       <Form
                                   interviewers={props.interviewers}
                                   onSave={save}
                                   onCancel={() => back()}
                                                                            />)}

      {mode === EDIT   && (       <Form
                                   name={props.interview.student}
                                   interviewers={props.interviewers}
                                   interviewer={props.interview.interviewer.id}
                                   onSave={save}
                                   onCancel={() => back()}
                                                                            />)}
                                                                            
      {mode === SAVING   &&       <Status message="Saving"                   />}
      {mode === DELETING &&       <Status message="Deleting"                 />}
      {mode === CONFIRM  &&       <Confirm
                                   message="Are you sure you want to delete?"
                                   onCancel={() => back()}
                                   onConfirm={destroy}
                                                                             />}

      {mode === ERROR_SAVE &&     <Error
                                   message="Could not save appointment."
                                   onClose={() => back()}
                                                                             />}

      {mode === ERROR_DELETE &&   <Error
                                   message="Could not delete appointment."
                                   onClose={() => back()}
                                                                             />}
    </article>
  );
}