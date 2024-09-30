// all메뉴 활성화
const $allbtn = document.querySelector('header > .head-container > .right-mnu-wrap > .all-btn-container > .all-menu-icon > a.btn-style-bar ');
const $allmnu = document.querySelector('header > .all-menu-container');

$allbtn.addEventListener('click',function(evt){
  evt.preventDefault();
  $header.toggleClass("open");
});


// 스크롤 메뉴 픽스&백그라운드컬러
const $header = $('header');
const headerHeight = $header.outerHeight();
const arrTopVal = [];
const $lis = $('header > .head-container > ul.gnb > li');
const $gnbColor = $('header > .head-container > ul.gnb > li > a');
const $barColor = $('header > .head-container > .right-mnu-wrap > .all-btn-container > .all-menu-icon > a.btn-style-bar > span.bar-deco');
const $insta = $('header > .head-container > .right-mnu-wrap > .icon-container > .icon-pack > li.instagram');
const $android = $('header > .head-container > .right-mnu-wrap > .icon-container > .icon-pack > li.android');
const $apps = $('header > .head-container > .right-mnu-wrap > .icon-container > .icon-pack > li.appstore');
const $resource = $('header > .head-container > .right-mnu-wrap > .icon-container > .icon-pack > li.resource');

let liIdx = 0;
let lastIdx = liIdx;

$(window).on('scroll',function(){
  let scrollTop = Math.ceil($(this).scrollTop());

  if(scrollTop>1){
    $header.addClass('h-fixe');
    $insta.addClass('active');
    $android.addClass('active');
    $apps.addClass('active');
    $resource.addClass('active');
  }else{
    $header.removeClass('h-fixe');
    $insta.removeClass('active');
    $android.removeClass('active');
    $apps.removeClass('active');
    $resource.removeClass('active');
  }
});


//서브메뉴 구동
$(window).load(function(){

  const $gnb = $('header > .head-container > ul.gnb');
  const $lnb_bg = $('header > .gnb-sub-wrap');

  $lnb_bg.hide()

  $gnb.on('mouseenter', function(){
    //높이가 0에 수렴후 d:n 처리됨
    $lnb_bg.stop().slideDown(300);
  });

  $gnb.on('mouseleave', function(){
    $lnb_bg.stop().slideUp(300);
  });  
  $lnb_bg.on('mouseenter', function(){
    //높이가 0에 수렴후 d:n 처리됨
    $lnb_bg.stop().slideDown(300);
  });

  $lnb_bg.on('mouseleave', function(){
    $lnb_bg.stop().slideUp(300);
  });  
});



//메인슬라이드 자동재생이벤트
const $container = document.querySelector('ul.slides-wrap');
const $slides = document.querySelectorAll('ul.slides-wrap>li');

let intervalKey = null;
let nowIdx = 1;
let oldIdx = nowIdx;
// let interval = 1000;

$container.style.transition = 'all 0.5s ease-in-out';

// 슬라이드이동함수
const slideTop = {
  timer : 0,
  status : true,
  action : function(){
    // 컨테이너이동
    slideTop.stop()
    $container.style.left = -1903 * nowIdx +'px';
    slideTop.start()
    slideTop.status = false;

    $slides.forEach(function(o,i){
      if(nowIdx == i) o.classList.add('on');
      else o.classList.remove('on');
    })

    setTimeout(function(){
      slideTop.status = true;
    },600);

    // 빈 화면이 나올때 제일 처음 슬라이드를 가져다가 뒤에 복붙시킴
    if(nowIdx===0){
      setTimeout(function(){
        // 오른쪽 끝에있는 슬라이드 이미지가 보이도록 이동
        $container.style.transition = 'none';
        $container.style.left = (-1903 * 5) + 'px';
        setTimeout(function(){
            $container.style.transition = 'all 0.5s ease-in-out';
        },100);
      },400);
      nowIdx = 5;
    }else if(nowIdx===5){
      setTimeout(function(){
        // 오른쪽 끝에있는 슬라이드 이미지가 보이도록 이동
        $container.style.transition = 'none';
        $container.style.left = 0;
        setTimeout(function(){
            $container.style.transition = 'all 0.5s ease-in-out';
        },100);
      },400);
      nowIdx = 0;
    }
  },
  start : function (){
    slideTop.timer = setInterval(function(){
      // return(false);
      oldIdx = nowIdx-1;
      nowIdx++;
      slideTop.action()
      // 빈 화면이 나올때 제일 처음 슬라이드를 가져다가 뒤에 복붙시킴
    },1000);
  },
  stop : function(){
    clearInterval(slideTop.timer)
  }
}

// 페이지 이동 공통함수
const pagiAni = function(topVal){
  $('html,body').stop().animate({
    scrollTop : topVal
  },400);
};

// 새로고침, 리로드이벤트
window.addEventListener('load',function(){
  slideTop.start()
  new WOW().init();

  // 페이지 상단으로 이동
  pagiAni(0);
});

const $btnPrev = document.querySelector('button.btn-prev');
// 이전버튼 클릭
$btnPrev.addEventListener('click',function(evt){
  if(!slideTop.status ) return false;
  evt.preventDefault();
  oldIdx = nowIdx-1;
  nowIdx--;
  slideTop.action()
});


const $btnNext = document.querySelector('button.btn-next');
// 다음버튼 클릭
$btnNext.addEventListener('click',function(evt){
  if(!slideTop.status ) return false;
  evt.preventDefault();

  oldIdx = nowIdx-1;
  nowIdx++;
  slideTop.action()
});

// 로고클릭 페이지 상단으로 이동
$('.logo').on('click',function(evt){
  evt.preventDefault();
  
  pagiAni(0);
});