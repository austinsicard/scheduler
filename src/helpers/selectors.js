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

export function getInterview(state, interview) {

  if (!interview) return null;

  const interviewerId = interview.interviewer;
  
  const interviewerData = state.interviewers[interviewerId];

  const interviewData = {...interview, interviewer: interviewerData}

  
  return interviewData;
}

export function getInterviewersForDay(state, day) {
  
  const { days, interviewers } = state;

  const dayObjectFound = days.find((dayData) => dayData.name === day);

  if (!dayObjectFound || dayObjectFound.interviewers.length === 0) return [];

  const interviewerIds = dayObjectFound.interviewers;
  const dailyInterviewers = interviewerIds.map((interviewerId) => interviewers[interviewerId]);

  return dailyInterviewers;
}