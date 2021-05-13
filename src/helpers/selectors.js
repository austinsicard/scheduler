export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(apptDay => apptDay.name === day);
  console.log('Day Matching: ', filteredDay)

  const result = [];

  if (!filteredDay || filteredDay.appointments.length === 0) {
    return result;
  }

  for(let id of filteredDay.appointments) {
    result.push(state.appointments[id])
  }

  return result;
}
