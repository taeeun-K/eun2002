//서브메뉴 구동
const $gnb = $('header .head-container nav .gnb');
const $gnbs = $('header .head-container nav .gnb li');
const $lnbs = $('header > .sub-mnu-container > ul > li');
console.log($('header > .sub-mnu-container > ul > li'));
// const $lnb_bg = $('header > .sub-mnu-container');

let gnbIdx = 0;
let lnbIdx = 0;


// 서브메뉴의 백그라운드
$gnb.on('mouseenter', function(){
  gnbIdx = $gnbs.index(this);
  $lnbs.eq(lnbIdx).css('display','block');
});

$gnb.on('mouseleave', function(){
  gnbIdx = $gnbs.index(this);
  $lnbs.eq(lnbIdx).css('display','none');   
});




// 백그라운드다운
$(window).load(function(){
  
  const $gnb = $('header .head-container nav .gnb');
  const $lnb_bg = $('header .head-container > .lnb_bg');


  
  $lnb_bg.hide()

  $gnb.on('mouseenter', function(){
    //높이가 0에 수렴후 d:n 처리됨
    // $lnb_bg.stop().slideDown(300);
    $lnb_bg.show()
  });

  $gnb.on('mouseleave', function(){
    // $lnb_bg.stop().slideUp(300);
    $lnb_bg.hide()
  });  
  $lnb_bg.on('mouseenter', function(){
    //높이가 0에 수렴후 d:n 처리됨
    // $lnb_bg.stop().slideDown(300);
    $lnb_bg.show()
  });

  $lnb_bg.on('mouseleave', function(){
    // $lnb_bg.stop().slideUp(300);
    $lnb_bg.hide()
  });  
});

// 제주 축제와 행사 슬라이드
const $fastiContainer = document.querySelector('article.cont4 > .fastival-list-container > ul.list-slide');
const $fastiBtnPrev = document.querySelector('article.cont4 > button.fastival-btn.prev');
const $fastiBtnNext = document.querySelector('article.cont4 > button.fastival-btn.next');
const $fastiImages = document.querySelectorAll('article.cont4 > .fastival-list-container > ul.list-slide > li > a');
// console.log(document.querySelectorAll('article.cont4 > .fastival-list-container > ul.list-slide > li > a'));

let nowIdx = 0;

// 이미지클릭동작방지
$fastiImages.forEach(function($fastiImg,idx){
  $fastiImg.addEventListener('click',function(evt){
    evt.preventDefault();
    nowIdx = idx;
  });
});
// console.log($fastiImages.idx);

//슬라이드이동
$fastiContainer.style.left = -(1300 * nowIdx) + 'px';

// 이전버튼 클릭
$fastiBtnPrev.addEventListener('click',function(evt){
  evt.preventDefault();

  if(nowIdx>0){
    nowIdx--;
  }else if(nowIdx==0){
    return false;
  }

  $fastiContainer.style.left = -(1300 * nowIdx) + 'px';
  console.log(this.nowIdx);
});

// 다음버튼
$fastiBtnNext.addEventListener('click',function(evt){
  evt.preventDefault();

  if(nowIdx<=2){
    nowIdx++;
  }else if(nowIdx==2){
    return false;
  }

  $fastiContainer.style.left = -(1300 * nowIdx) + 'px';
  console.log(this.nowIdx);
});




//쇼핑 탭메뉴 
const shoppingBnrTab = document.querySelectorAll('.shopping-category a');
const shoppingBnrCont = document.querySelectorAll('.list-container-wrap > div');


shoppingBnrTab.forEach(function(tab,i){

  tab.addEventListener('click',function(evt){
    evt.preventDefault();
    shoppingBnrTab.forEach(function(o,j){
      o.parentElement.classList.remove('on');
    });
    

    shoppingBnrCont.forEach(function(o,j){
      o.style.display = "none";
    });

    shoppingBnrTab[i].parentElement.classList.add('on');
    shoppingBnrCont[i].style.display = "block"

  });

})



// 스크롤 헤더고정
const $header = document.querySelector('header');

arrTopVal = [];


window.addEventListener('scroll',function(){
  const scrollTop = Math.ceil(window.scrollY);
  if(scrollTop>1){
    $header.classList.add('fixed');
  }else{
    $header.classList.remove('fixed');
  }
});




// 헤더 투명 호버
$gnb.on('mouseenter',function(){
  $('header').addClass('hovered');
});
$gnb.on('mouseleave',function(){
  $('header').removeClass('hovered');
});




// 사이드네비게이션 앵커작동방지
$sideNavis = document.querySelectorAll('.side-navigation a');

$sideNavis.forEach(function($sidenavi){
  $sidenavi.addEventListener('click',function(e){
    e.preventDefault();
  });
});



// 페이지 이동 공통함수
const pagiAni = function(topVal){
  $('html,body').stop().animate({
    scrollTop : topVal
  },400);
};

// 새로고침, 리로드이벤트
window.addEventListener('load',function(){

  // 페이지 상단으로 이동
  pagiAni(0);
});

// 로고클릭 페이지 상단으로 이동
$('.logo').on('click',function(evt){
  evt.preventDefault();
  
  pagiAni(0);
});


// 사이드네비게이션 탑버튼
$topBtn = document.querySelector('button.page-up');

$topBtn.addEventListener('click', function(){
  pagiAni(0);
});