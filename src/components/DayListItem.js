import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames"


export default function DayListItem(props) {
  
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  const formatSpots = (props) => {
    console.log("Props from DayListItem: ", props)
    return props.spots > 1 ? `${props.spots} spots remaining` : 
    props.spots < 1 ? "no spots remaining" : "1 spot remaining";
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{formatSpots(props)}</h3>
    </li>
  );
}