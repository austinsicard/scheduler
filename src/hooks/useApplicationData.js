import { useState, useEffect } from "react";
import axios from "axios";


const useApplicationData = function() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function updateDays(days, updatedAppointments, updatedAppointmentId) {
    const getSpotsRemaining = (day) => {
      const spotsRemaining = day.appointments.reduce((emptySpots, appointmentId) => {
        if (updatedAppointments[appointmentId].interview === null) emptySpots++;
        return emptySpots;
      }, 0);

      return spotsRemaining;
    }

    const newDays = days.map((day) => {
      return day.appointments.includes(updatedAppointmentId) ? {...day, spots: getSpotsRemaining(day)} : day
    })

    return newDays;
  }

  function bookInterview(id, interview) {
    const appointment = { ...state.appointments[id], interview: { ...interview }};
    const appointments = { ...state.appointments, [id]: appointment };
    
    const days = updateDays(state.days, appointments, id);

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => setState({...state, appointments, days}));
  }
  
  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };

    const days = updateDays(state.days, appointments, id);

    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({...state, appointments, days}));
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      const [ daysResponse, appointmentsResponse, interviewersData ] = all;
      const days = daysResponse.data;
      const appointments = appointmentsResponse.data;
      const interviewers = interviewersData.data;

      setState(prev => ({ ...prev, days, appointments, interviewers }));
    }).catch((error) => {
      console.log("Error: ", error);
    });
  }, [])

  return { state, setDay, bookInterview, cancelInterview }
}

export default useApplicationData;
