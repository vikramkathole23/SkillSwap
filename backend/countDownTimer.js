const countDownTimer = (date) => {
  const meetingDate = new Date(date).getTime();
  console.log(meetingDate);
  
  let countDown = setInterval(() => {
    let now = new Date().getTime();
    console.log(now);
    let distance = meetingDate - now;
    // console.log(distance);
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //  console.log(days);
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    //  console.log(hours);
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //  console.log(minutes);
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //  console.log(seconds);
    const timer ={
      days:days,
      hours:hours,
      minutes:minutes,
      seconds:seconds
    }
    // console.log(timer);
    
    // return  timer;
  });
   console.log(countDown);
   
  return countDown;
}; 

export default countDownTimer;
