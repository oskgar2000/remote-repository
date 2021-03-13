    const startBtn = document.querySelector('.start');
    const nameTask = document.querySelector('.nameTask')
    const pauseBtn = document.querySelector('.pause');
    const stopBtn = document.querySelector('.stop');
    const resetBtn = document.querySelector('.reset');
    const historyBtn = document.querySelector('.history');
    const stopwatch = document.querySelector('.stopwatch');
    const time = document.querySelector('.time');
    const timeList = document.querySelector('.time-list')
    const infoBtn = document.querySelector('.fa-question');
    const modalShadow = document.querySelector('.modal-shadow');
    const closeModalBtn = document.querySelector('.close');
    const colorBtn = document.querySelector('.fa-paint-brush');
    const colors = document.querySelectorAll('.color');
    const colorField = document.querySelector('.colors');

    let countTime;
    let root = document.documentElement //for color changer
    let flag = true; //used in start clock and pause clock
    let minutes = 0;
    let seconds = 0;

    let historyArr = []; //archive arr
    let colorArr = ['rgb(250,20,6)','rgb(6,173,250)','rgb(0,255,42)','rgb(232,245,15)'] //arr width css colors

//change main color function
    const colorChanger = () => {

       colorField.classList.toggle('right')
 
       colors.forEach((color)=>{
           color.addEventListener('click',(e)=>{  
               root.style.setProperty('--first-color',colorArr[e.target.dataset.number-1])
          
           })
       })
    }
 //start clock
    const startClock = () => {
        time.style.visibility = 'hidden';
        if(nameTask.value !== '' && flag !==false) {
            
            countTime = setInterval(()=>{
              if (seconds <9) {
                  seconds++;
                  stopwatch.textContent = `${minutes}:0${seconds}`
              } else if (seconds >= 9 && seconds <59){
                  seconds++
                  stopwatch.textContent = `${minutes}:${seconds}`
              } else {
                  minutes++
                  seconds = 0;
                  stopwatch.textContent = `${minutes}:00`
              }
            },1000)
            nameTask.style.border = '1px solid var(--first-color)';
            flag=false;
        }else {
            nameTask.style.border = '1px solid yellow'
        }
      }
//pause clock
    const pauseClock = () => {
          clearInterval(countTime)
          flag=true;
      }
//end present measurement
    const stopClock = () => {

        time.innerHTML = `${nameTask.value} time: ${stopwatch.textContent}`;
        nameTask.value = '';


        if(stopwatch.textContent !== `0:00`) {
            time.style.visibility = 'visible';
            historyArr.push(time.innerHTML);
          
        }

        clearStuff();
  
    }
//reset all, event archive
    const resetClock = () => {
        nameTask.value = '';
        historyArr=[];
        time.style.visibility='hidden';
        clearStuff();
    }
//support function for resetClock() ^
    const clearStuff = () => {
        clearInterval(countTime)
        stopwatch.textContent = `0:00`
        flag=true;
        timeList.textContent = '';
        seconds=0;
        minutes=0;
    }
//show archive
    const showHistory = () =>{
        timeList.textContent = '';
        for(let i = 0; i < historyArr.length;i++) {
          const createLi = document.createElement('li');
          timeList.appendChild(createLi)
          createLi.textContent = historyArr[i]
        }
    }
//show info modal
    const showModal = () => {
        if(!(modalShadow.style.display === 'block')) {
            modalShadow.style.display = 'block';
        } else {
            modalShadow.style.display = 'none';
        };
        modalShadow.classList.toggle('modal-animation')
    }

    //listeners

    startBtn.addEventListener('click',startClock);
    pauseBtn.addEventListener('click',pauseClock);
    stopBtn.addEventListener('click',stopClock);
    resetBtn.addEventListener('click',resetClock);
    historyBtn.addEventListener('click',showHistory);
    infoBtn.addEventListener('click', showModal);
    closeModalBtn.addEventListener('click', showModal);
    window.addEventListener('click',(e)=>e.target === modalShadow ? showModal() : false);
    colorBtn.addEventListener('click',colorChanger);
    window.addEventListener('click',(e)=>e.target === colorChanger ? colorChanger() : false);
