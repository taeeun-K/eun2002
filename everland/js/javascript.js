//서브메뉴 구동
const $gnb = document.querySelector('header > .head-container > .nav-wrap > nav > ul.gnb');
const $lnbs = document.querySelectorAll('header > .head-container > .nav-wrap > nav > ul.gnb > li > ul.lnb');
const $lnb_bg = document.querySelector('header > .lnb_background');

// 메뉴 보여지게 공통함수
const navFadeIn = function(){
  $lnb_bg.style.display = 'block';
  $lnbs.forEach(function($lnb){
      $lnb.style.display = 'block';
  });
};

// 메뉴 사라지게 공통함수
const navFadeOut = function(){
  $lnb_bg.style.display = 'none';
    $lnbs.forEach(function($lnb){
        $lnb.style.display = 'none';
    });   
};

// 서브메뉴의 백그라운드
$gnb.addEventListener('mouseenter', function(){
    navFadeIn();
});

$gnb.addEventListener('mouseleave', function(){
    navFadeOut();      
});

$lnb_bg.addEventListener('mouseenter', function(){
    navFadeIn();
});

$lnb_bg.addEventListener('mouseleave', function(){
    navFadeOut();      
});


// 비주얼 슬라이드 구동
const $container = document.querySelector('section > .visual-slide-container > ul.slide-container');
const $slides = document.querySelectorAll('section > .visual-slide-container > ul.slide-container > a > li.slide-bg');
const $pagination = document.querySelectorAll('section > .visual-slide-container > .slide-pagination > ul.paging-dot li > a');
const $slideController = document.querySelector('section > .visual-slide-container > button.slide-control-button');

let nowIdx = 0;
let intervalKey = 0;

$pagination.forEach(function($page,idx){
  $page.addEventListener('click', function(evt){
    evt.preventDefault();

    nowIdx = idx;

    $container.style.left = -(100 * nowIdx) +'%';

    $pagination.forEach(function(anchor, actIdx){
      anchor.parentElement.classList.toggle('on',actIdx===nowIdx);
    });
    $slides.forEach(function(anchor, actIdx){
      anchor.parentElement.classList.toggle('on',actIdx===nowIdx);
    });
  });
});

// 자동재생 함수
const autoPlay = {
  width: 1280,
  intervalTime : 3000,
  init : function (){
    autoPlay.btnEvt()
    autoPlay.start()
  },
  btnEvt : function(){
    $slideController.addEventListener('click',function(evt){
       evt.preventDefault();  
       if(this.classList.contains('pause')){
           //현재 멈춰있음
           autoPlay.start()
           this.classList.remove('pause'); //.pause 클래스 제거
       }else{
          //현재 자동재생중
          autoPlay.stop()
  
          this.classList.add('pause'); //.pause 클래스 추가
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
    var num = intervalKey++
    nowIdx = num%$slides.length

    $container.style.left = -(100 * nowIdx) +'%';
    $pagination.forEach(function(anchor, actIdx){
      anchor.parentElement.classList.toggle('on',actIdx===nowIdx);
    });
    $slides.forEach(function(anchor, actIdx){
      anchor.parentElement.classList.toggle('on',actIdx===nowIdx);
    });
  }
}

//  원버튼 자동재생
autoPlay.init(); //처음엔 무조건 한번 실행



// 스크롤&사이드메뉴 클릭 이벤트
const $sideMnus = document.querySelectorAll('section > .main-contents-wrap > .side-navigator > ul.side > li > a');

const arrTopVal = [];

let pageIdx = 0;
let oldIdx = pageIdx;

// 아티클의 탑값 
document.querySelectorAll('article').forEach(function($article,idx){
  let now = $article.offsetTop+719
  arrTopVal[idx] = now;
});


// 사이드 네비게이션 위치고정
const $sideNavi = document.querySelector('.side-navigator');

// 현재 스크롤바의 top값
window.addEventListener('scroll', function(){
  const scrollTop = Math.ceil(window.scrollY-50);

  // top값에 따른 s-fixed처리
  if(scrollTop>700){
    $sideNavi.classList.add('s-fixed'); 
    $sideNavi.style.marginTop = '50px';
  }else{
    $sideNavi.classList.remove('s-fixed');
    $sideNavi.style.marginTop = 0;
  }

  // 첫번째 메인본문영역 노출시점
  const mainGallery = document.querySelector('.thumb-gallery-wrap').offsetTop;
  const view = (scrollTop + window.innerHeight) - mainGallery;
  // console.log(view);

  //메뉴활성화
  // 5개의 if구문 합치기
  for(let i=0; i<$sideMnus.length; i++){
    var now  = arrTopVal[i];
    if(scrollTop >= now){
      oldIdx = pageIdx;
      pageIdx =i;

      $sideMnus[oldIdx].parentElement.classList.remove('on');
      $sideMnus[pageIdx].parentElement.classList.add('on');
    }else if(scrollTop < arrTopVal[0]){
      $sideMnus[pageIdx].parentElement.classList.remove('on');
    }
  }

  // 사이드메뉴 클릭
$sideMnus.forEach(function($page,idx){
  $page.addEventListener('click',function(evt){
    evt.preventDefault();

    window.scrollTo({top:arrTopVal[idx]+50, behavior:'smooth'});

    // 5개의 if구문 합치기
    for(let i=0; i<$sideMnus.length; i++){
      var now  = arrTopVal[i];
      if(scrollTop >= now){
        oldIdx = pageIdx;
        pageIdx =i;

        $sideMnus[oldIdx].parentElement.classList.remove('on');
        $sideMnus[pageIdx].parentElement.classList.add('on');
      }else if(scrollTop < arrTopVal[0]){
        $sideMnus[pageIdx].parentElement.classList.remove('on');
      }
    }
  });
});
// console.log($sideMnus);
});



// 새로고침 최초로딩 리로드
window.addEventListener('load', function(){
  window.scrollTo({top:0, behavior:'smooth'});
});

