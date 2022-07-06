export const timeFormatter = (time: number) => {

  let myTime = String(time);
  
  if(myTime.length === 1) {
    return `0${myTime}`;
  } else {
    return time;
  }
}

export const dateFormatter = (date: Date) => {

  if(date) {
    const myDate = new Date(date);
    const formattedDate = `${myDate.toLocaleDateString()}-${timeFormatter(myDate.getHours())}:${timeFormatter(myDate.getMinutes())}`;
    return formattedDate;
  } else {
    return "-";
  }
}