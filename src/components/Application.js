import React from 'react';

import Appointment from 'components/Appointment';
import DayList from 'components/DayList';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors';

import useApplicationData from 'hooks/useApplicationData';

import 'components/Application.scss';

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interviewers={dailyInterviewers}
        interview={interview}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
  
  // const [state, setState] = useState({
    //   day: "Monday",
    //   days: [],
    //   appointments: {},
    //   interviewers: {}
    // });
    // const setDay = day => setState({ ...state, day });
    
  // function bookInterview(id, interview) {
    
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };

  //   const appointments = {
    //     ...state.appointments,
    //     [id]: appointment
    //   };
    
      //   return axios.put(`/api/appointments/${id}`, {interview})
      //     .then(() => setState({...state, appointments}));
  // }

  // function cancelInterview(id) {

  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //   return axios.delete(`/api/appointments/${id}`)
  //     .then(() => setState({...state, appointments}));
  // }

  // useEffect(() => {
  //   Promise.all([
  //     axios.get('/api/days'),
  //     axios.get('/api/appointments'),
  //     axios.get('/api/interviewers')
  //   ]).then((all) => {
  //     const [ daysResponse, appointmentsResponse, interviewersData ] = all;
  //     const days = daysResponse.data;
  //     const appointments = appointmentsResponse.data;
  //     const interviewers = interviewersData.data;
  //     setState(prev => ({ ...prev, days, appointments, interviewers }));
  //   }).catch((error) => {
  //     console.log("Error: ", error);
  //   });
  // }, [])
  
  // return (