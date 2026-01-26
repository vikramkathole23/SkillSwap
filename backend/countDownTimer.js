const countDownTimer = (date) => {
  const meetingDate = new Date(date).getTime();
  let countDown = setInterval(() => {
    let now = new Date().getTime();
    let distance = meetingDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const timer ={
      days:days,
      hours:hours,
      minutes:minutes,
      seconds:seconds
    }
    console.log(days);
    
    // return  timer;
  });
}; 

export default countDownTimer;
