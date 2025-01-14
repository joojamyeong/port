document.addEventListener("DOMContentLoaded", function () {
  let count = 4;
  let recallSeconds = 0;
  let recallTimer;
  let backgroundChangeTimer;
  let topRectangles = document.querySelectorAll('.top-bar .rectangle'); 
  let bottomRectangles = document.querySelectorAll('.bottom-bar .rectangle'); 
  const recallDisplay = document.getElementById("recall-timer");
  const recallSection = document.querySelector(".recall");
  const videoSection = document.querySelector(".video");
  const introduceSection = document.querySelector(".introduce");
  const sections = [introduceSection, recallSection, videoSection]; 

  const backgroundImages = [
    "url('../images/timerbg02.png')",
    "url('../images/timerbg03.png')",
    "url('../images/timerbg04.png')",
    "url('../images/timerbg05.png')",
    "url('../images/timerbg06.png')",
    "url('../images/timerbg07.png')",
  ];

  let currentSectionIndex = 0; 

  const counter = setInterval(timer, 1000);

  function timer() {
    count--;
    const countElement = document.getElementById("num");
    const countWrapper = document.getElementById("count");

    if (count <= 0) {
      clearInterval(counter);
      countWrapper.className = count;
      countElement.innerHTML = "";
      flashScreen();
      return;
    }

    countElement.innerHTML = count;
  }

  function flashScreen() {
    const introWrap = document.querySelector(".intro-wrap");

    introWrap.classList.add("flash");

    introWrap.addEventListener(
      "transitionend",
      function () {
        introWrap.style.display = "none";
        introduceSection.style.display = "block";
        introduceSection.classList.add("show");
      },
      { once: true }
    );
  }

  function moveToSection(index) {
    if (index < 0 || index >= sections.length) return; 
    currentSectionIndex = index;
    sections[currentSectionIndex].scrollIntoView({ behavior: "smooth" });
  }

  let currentState = 0;  

  introduceSection.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) { 
      event.preventDefault();
      currentState = (currentState + 1) % 4;  
      changeIntroduceContent(currentState);

      if (currentState === 3) {
        introduceSection.addEventListener("wheel", handleScrollDownToRecall);
      }
    } else if (event.deltaY < 0) { 
      event.preventDefault();
      currentState = (currentState - 1 + 4) % 4;  
      changeIntroduceContent(currentState);
    }
  });

  changeIntroduceContent(0);

  function changeIntroduceContent(state) {
    const leftContent = document.querySelector('.introduce-left');
    const rightContent = document.querySelector('.introduce-right');
    const introduceTop = document.querySelector('.introduce-top')
    const introduceBottom = document.querySelector('.introduce-bottom')

    leftContent.classList.remove('animate');

    if (state === 0) {
      introduceTop.innerHTML = ' <div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div>'
      introduceBottom.innerHTML = '   <div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div>'
      leftContent.innerHTML = '<img src="../images/test01.png" alt="">'; 
      rightContent.innerHTML = '<p class="who">WHO AM I</p><p class="iam">저는</p><span class="textchange">카멜레온 같은 <br> 사람입니다.</span><div class="page"><em>1</em><span class="num">ST</span><span class="slash">/</span>4</div>';
    } else if (state === 1) {
      introduceTop.innerHTML = ' <div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div>'
      introduceBottom.innerHTML = ' <div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div>'
      leftContent.innerHTML = '<img src="../images/test01.png" alt="">';
      rightContent.innerHTML = '<p class="who">WHO AM I</p><p class="iam">저는</p><span class="textchange1">상황에 따라 유연하게 변화를 <br> 수용하고 원활한 소통을 통해 <br> 다양한 사람들과 쉽게 친해져<br> 협업에 강점을 지니고 있습니다.</span><div class="page1"><em>2</em><span class="num">ND</span><span class="slash">/</span>4</div>';
    } else if (state === 2) {
      introduceTop.innerHTML = ' <div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div>'
      introduceBottom.innerHTML = ' <div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div><div class="whiterect"></div>'
      leftContent.innerHTML = '<img src="../images/test01.png" alt="">'; 
      rightContent.innerHTML = '<p class="who">WHO AM I</p><p class="iam">저는</p><span class="textchange2">다양한 관점에서 문제를 분석하고<br>창의적인 해결책을 융합하여<br>혁신적인 접근 방식을<br> 제시하는 데 강점이 있습니다.</span><div class="page1"><em>3</em><span class="num">RD</span><span class="slash">/</span>4</div>';
    } else if (state === 3) {
      introduceTop.innerHTML = ' <div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div>'
      introduceBottom.innerHTML = ' <div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div><div class="blackrect"></div>'
      leftContent.innerHTML = '<img src="../images/test01.png" alt="">'; 
      rightContent.innerHTML = '<p class="who">WHO AM I</p><p class="iam">저는</p><span class="textchange3">SKILL</span><div class="page1"><em>4</em><span class="num">TH</span><span class="slash">/</span>4</div>';
    }

    const img = leftContent.querySelector('img');
    img.onload = () => {
      leftContent.classList.add('animate');
    };
  }

  function handleScrollDownToRecall(event) {
    if (event.deltaY > 0) { 
      event.preventDefault();
      moveToSection(1);  
      introduceSection.removeEventListener("wheel", handleScrollDownToRecall); 
    }
  }

  recallSection.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) { 
      event.preventDefault();
      moveToSection(2); 
    } else if (event.deltaY < 0) { 
      event.preventDefault();
      moveToSection(0); 
    }
  });

  videoSection.addEventListener("wheel", (event) => {
    if (event.deltaY < 0) { 
      event.preventDefault();
      moveToSection(1); 
    }
  });

  function startRecallTimer() {
    if (recallTimer) return;

    recallTimer = setInterval(() => {
      recallSeconds += 1;
      const minutes = String(Math.floor(recallSeconds / 60)).padStart(2, "0");
      const seconds = String(recallSeconds % 60).padStart(2, "0");
      recallDisplay.textContent = `${minutes}:${seconds}`;

      if (recallSeconds >= 45) {
        clearInterval(recallTimer);
        clearInterval(backgroundChangeTimer); 
        moveToSection(2); 
      }

      fillRectanglesSequentially(recallSeconds);
    }, 100);

    startBackgroundChange();
  }

  function startBackgroundChange() {
    let imageIndex = 0;

    backgroundChangeTimer = setInterval(() => {
      recallSection.style.backgroundImage = backgroundImages[imageIndex];
      imageIndex = (imageIndex + 1) % backgroundImages.length;
    }, 100);
  }

  function fillRectanglesSequentially(seconds) {
    let indexToFill = Math.floor(seconds / 1.8);

    topRectangles.forEach((rectangle, index) => {
      if (index < indexToFill) {
        rectangle.style.backgroundColor = 'black'; 
      } else {
        rectangle.style.backgroundColor = ''; 
      }
    });

    bottomRectangles.forEach((rectangle, index) => {
      if (index < indexToFill) {
        rectangle.style.backgroundColor = 'black'; 
      } else {
        rectangle.style.backgroundColor = ''; 
      }
    });
  }

  document.body.addEventListener("wheel", (event) => {
    event.preventDefault();
  });

  recallSection.addEventListener('mouseenter', startRecallTimer);
});
