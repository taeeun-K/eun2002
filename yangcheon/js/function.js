// 탑바 주요사이트 구동
$(window).load(function(){

  const $majorBtn = $('.top-menu .login-menu ul.menu-list li.util-one.major > a');
  const $majorList = $('.top-menu .login-menu ul li .site-list-container');

  $majorList.hide()

  $majorBtn.on('mouseenter', function(){
    $majorList.stop().slideDown(300);
  });

  $majorBtn.on('mouseleave', function(){
    $majorList.stop().slideUp(300);
  });  

  $majorList.on('mouseenter', function(){
    $majorList.stop().slideDown(300);
  });

  $majorList.on('mouseleave', function(){
    $majorList.stop().slideUp(300);
  });  
});





//주요서비스보기 서브메뉴 구동
$(window).load(function(){

  const $surviceBtn = $('.main-navigation-bar .survice-view a');
  const $surviceList = $('.main-navigation-bar .survice-list-container');

  $surviceList.hide()

  $surviceBtn.on('mouseenter', function(){
    $surviceList.stop().slideDown(300);
  });

  $surviceBtn.on('mouseleave', function(){
    $surviceList.stop().slideUp(300);
  });  

  $surviceList.on('mouseenter', function(){
    $surviceList.stop().slideDown(300);
  });

  $surviceList.on('mouseleave', function(){
    $surviceList.stop().slideUp(300);
  });  
});






// 본문상단 슬라이드
const $container = document.querySelector('.main-slide .slide-box ul.slides');
const $pagination = document.querySelectorAll('.main-slide .pagination ul.paging li a');
const $slides = document.querySelectorAll('.main-slide .slide-box ul.slides li');
const $oneBtn = document.querySelector('.main-slide .btnBox button.slideBtnOne');
const $btnPrev = document.querySelector('.main-slide .btnBox button.slideBtnPrev');
const $btnNext = document.querySelector('.main-slide .btnBox button.slideBtnNext');

let nowIdx = 0;
let intervalKey = null;


$pagination.forEach(function($page,idx){
  $page.addEventListener('click',function(evt){
    evt.preventDefault();
    
    nowIdx = idx;

    $container.style.left = -(754*nowIdx)+'px';

    $pagination.forEach(function(anchor, actIdx){
      anchor.parentElement.classList.toggle('on',actIdx===nowIdx);
    });

    if(innerWidth="1024"){
      $container.style.left = -(100*nowIdx)+'%';
    }
  });
});



// 자동재생 함수
const autoPlay = {
  width: 1280,
  intervalTime : 2000,
  init : function (){
    autoPlay.btnEvt()
    autoPlay.start()
  },
  btnEvt : function(){
    $oneBtn.addEventListener('click',function(evt){
       evt.preventDefault();  
       if(this.classList.contains('pause')){
           //현재 멈춰있음
           autoPlay.start()
           this.classList.remove('pause');
       }else{
          //현재 자동재생중
          autoPlay.stop()
          this.classList.add('pause');
       }
    });
  },
  timer : null,
  start : function(){
    autoPlay.timer = setInterval(function(){
      autoPlay.action();
    },autoPlay.intervalTime)
  },
  stop : function(){
    clearInterval(autoPlay.timer); //인터벌중지
  },
  action : function(){
    nowIdx++
    nowIdx = nowIdx%$slides.length


    $container.style.left = -(754*nowIdx)+'px';
    $pagination.forEach(function(anchor, actIdx){
      anchor.parentElement.classList.toggle('on',actIdx===nowIdx);
    });

    if(innerWidth="1024"){
      $container.style.left = -(100*nowIdx)+'%';
    }
  }
}

//  원버튼 자동재생
autoPlay.init(); //처음엔 무조건 한번 실행

// 다음버튼
$btnNext.addEventListener('click', function(){
  autoPlay.stop()
  if(nowIdx<9){
    nowIdx++;
  }else{
    nowIdx=9
  }

  $container.style.left = -(754*nowIdx)+'px';

  $pagination.forEach(function(anchor, actIdx){
    anchor.parentElement.classList.toggle('on',actIdx===nowIdx);
  });
  autoPlay.start()

  if(innerWidth="1024"){
    $container.style.left = -(100*nowIdx)+'%';
  }
});

// 이전버튼
$btnPrev.addEventListener('click', function(){

  autoPlay.stop()
  if(nowIdx>0){
    nowIdx--;
  }else{
    nowIdx=0
  }

  $container.style.left = -(754*nowIdx)+'px';

  $pagination.forEach(function(anchor, actIdx){
    anchor.parentElement.classList.toggle('on',actIdx===nowIdx);
  });
  autoPlay.start()
  
  if(innerWidth="1024"){
    $container.style.left = -(100*nowIdx)+'%';
  }
});




//공지사항 탭메뉴 
const noticeTab = document.querySelectorAll('.notice-tab-box ul.notice-title>li>a');
const noticeCont = document.querySelectorAll('.notice-tab-box .notice-list-box .notice-list');


noticeTab.forEach(function(tab,i){

  tab.addEventListener('click',function(evt){
    evt.preventDefault();
    noticeTab.forEach(function(o,j){
      o.parentElement.classList.remove('on');
    });
    

    noticeCont.forEach(function(o,j){
      o.style.display = "none";
    });

    noticeTab[i].parentElement.classList.add('on');
    noticeCont[i].style.display = "block"

  });

})




// 팝업존 슬라이드
const $popContainer = document.querySelector('.popupSlideBox ul.slide-box');
const $popIndicator = document.querySelectorAll('.indicatorBox ul.indicator li a');
const $popUps = document.querySelectorAll('.popupSlideBox ul.slide-box li a img');
const $popAuto = document.querySelector('.popSlideControl button.popOne');
const $popPrev = document.querySelector('.popSlideControl button.popPrev');
const $popNext = document.querySelector('.popSlideControl button.popNext');

let popIdx = 0;
let popIntervalKey = null;

$popIndicator.forEach(function($paging,idx){
  $paging.addEventListener('click',function(evt){
    evt.preventDefault();
    
    popIdx = idx;

    $popContainer.style.left = -(342*popIdx)+'px';

    $popIndicator.forEach(function(anchor, actIdx){
      anchor.parentElement.classList.toggle('on',actIdx===popIdx);
    });
  });
});

// 자동재생 함수
const popAutoPlay = {
  width: 342,
  intervalTime : 3000,
  init : function (){
    popAutoPlay.btnEvt()
    popAutoPlay.start()
  },
  btnEvt : function(){
    $popAuto.addEventListener('click',function(evt){
       evt.preventDefault();  
       if(this.classList.contains('pause')){
           //현재 멈춰있음
           popAutoPlay.start()
           this.classList.remove('pause');
       }else{
          //현재 자동재생중
          popAutoPlay.stop()
          this.classList.add('pause');
       }
    });
  },
  timer : null,
  start : function(){
    popAutoPlay.timer = setInterval(function(){
      popAutoPlay.action();
    },popAutoPlay.intervalTime)
  },
  stop : function(){
    clearInterval(popAutoPlay.timer); //인터벌중지
  },
  action : function(){
    popIdx++
    popIdx = popIdx%$popUps.length
    // console.log("---" +popIdx)

    $popContainer.style.left = -(342*popIdx)+'px';
    $popIndicator.forEach(function(anchor, actIdx){
      anchor.parentElement.classList.toggle('on',actIdx===popIdx);
    });
  }
}

//  원버튼 자동재생
popAutoPlay.init(); //처음엔 무조건 한번 실행

// 다음버튼
$popNext.addEventListener('click', function(){
  popAutoPlay.stop()
  console.log(popIdx)
  if(popIdx<6){
    popIdx++;
  }else{
    popIdx=6
  }

  $popContainer.style.left = -(342*popIdx)+'px';

  $popIndicator.forEach(function(anchor, actIdx){
    anchor.parentElement.classList.toggle('on',actIdx===popIdx);
  });
  popAutoPlay.start()
});

// 이전버튼
$popPrev.addEventListener('click', function(){

  popAutoPlay.stop()
  if(popIdx>0){
    popIdx--;
  }else{
    popIdx=0
  }

  $popContainer.style.left = -(342*popIdx)+'px';

  $popIndicator.forEach(function(anchor, actIdx){
    anchor.parentElement.classList.toggle('on',actIdx===popIdx);
  });
  popAutoPlay.start()
  
});