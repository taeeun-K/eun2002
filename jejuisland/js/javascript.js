const $header = document.querySelector('header');
const $mnus = document.querySelectorAll('header > .container > nav > ul.gnb > li > a');
const $topbtn = document.querySelector('aside > a.top');
const $logo = document.querySelector('header > .container > h1.logo');
const arrTopVal = [];

let nowIdx = 0;
let oldIdx = nowIdx;

// 아티클의 top값 가져옴
document.querySelectorAll('article').forEach(function($article, idx){
  var now = $article.offsetTop
  if(idx == 0) now = $article.offsetTop - 540
  if(idx == 2) now = $article.offsetTop - 540
  arrTopVal[idx] = now;
});

// console.log('arrTopVal =',arrTopVal);


// 네비게이션 메뉴 클릭이벤트
$mnus.forEach(function($mnu,idx){
  $mnu.addEventListener('click',function(evt){
    evt.preventDefault();

    window.scrollTo({top:arrTopVal[idx]-140, behavior:'smooth'});
    
  });
});


// window에대한 scroll이벤트구문
window.addEventListener('scroll',function(){

  // 현재top값
  const scrollTop = Math.ceil(window.scrollY);
  // console.log(`scrollTop= ${scrollTop}`);

  // 5개의 if구문 합치기
  for(let i=0; i<$mnus.length; i++){
    var now  = arrTopVal[i]-180;
    if(scrollTop >= now){
      oldIdx = nowIdx;
      nowIdx =i;

      $mnus[oldIdx].parentElement.classList.remove('on');
      $mnus[nowIdx].parentElement.classList.add('on');
    }else if(scrollTop < arrTopVal[0]-180){
      $mnus[nowIdx].parentElement.classList.remove('on');
    }
  }
});



// 1페이지 페이드슬라이드!!
const $btnPrev =  document.querySelector('section > div.visual1 > button.slidebtn.prev');
const $btnNext =  document.querySelector('section > div.visual1 > button.slidebtn.next');
const $slides =   document.querySelectorAll('section > div.visual1 > ul.slide1 > li');
const $pagings =  document.querySelectorAll('section > div.visual1 > ul.pagination > li > a');

// 페이드 공통함수
const fadeAction = function(nowIdx){
  for(let i=0; i<$pagings.length; i++){
    $slides[i].style.display = 'none';
    $pagings[i].parentElement.classList.remove('on');
  }

  //해당 슬라이드 노출, 인디케이터 활성화
  $slides[nowIdx].style.display = 'block';
  $pagings[nowIdx].parentElement.classList.add('on');
};

// 페이징 클릭이벤트
$pagings.forEach(function($page,idx){
  $page.addEventListener('click',function(evt){
    evt.preventDefault();
    nowIdx = idx;
    fadeAction(nowIdx);
  });
});

// 이전버튼클릭
$btnPrev.addEventListener('click', function(evt){
  evt.preventDefault();
  nowIdx>0 ? nowIdx-- : nowIdx=$pagings.length-1;
  fadeAction(nowIdx);
});
// 다음버튼클릭
$btnNext.addEventListener('click', function(evt){
  evt.preventDefault();
  (nowIdx<$pagings.length-1) ? nowIdx++ : nowIdx=0;
  fadeAction(nowIdx);
});




// 2페이지 기본형(썸네일클릭)슬라이드!!
const $slideContainer = document.querySelector('section > article.cont2 > div.visual2 > .slideContainer');
const $thumbs = document.querySelectorAll('section > article.cont2 > div.visual2 > ul.thumb > li > a');
const $thumbImg = document.querySelectorAll('section > article.cont2 > div.visual2 > .slideContainer > p > a');

let thumbIdx = 0;

// 슬라이드이미지클릭 작동방지
$thumbImg.forEach(function($tImg){
  $tImg.addEventListener('click',function(evt){
    evt.preventDefault();
  });
});
// 썸네일 클릭
$thumbs.forEach(function($thumb444,idx){
  $thumb444.addEventListener('click',function(evt){
    console.log(111)

    evt.preventDefault();
    thumbIdx = idx;

    $slideContainer.style.left = -1280*thumbIdx + 'px';

    $thumbs.forEach(function(anchor,actIdx){
      anchor.parentElement.classList.toggle('on',actIdx === thumbIdx);
    });
  });
});



/* 3페이지 -자동재생슬라이드 */
const $playContainer = document.querySelector('section > div.visual3 > div.slide3');
const $slidePagings =  document.querySelectorAll('section > div.visual3 > ul.pagination > li > a');
const $btnSlidePrev = document.querySelector('section > div.visual3 > button.slidebtn.prev3');
const $btnSlideNext = document.querySelector('section > div.visual3 > button.slidebtn.next3');
const $slideImg = document.querySelectorAll('section > div.visual3 > div.slide3 > p > a');
const $btnSlidePlay = document.querySelector('section > div.visual3 > button.playbtn.play');
const $btnSlideStop = document.querySelector('section > div.visual3 > button.playbtn.stop');

let slideIdx = 0;
let intervalKey = null;
var winWid  = document.body.offsetWidth;

// 슬라이드 이미지 클릭 작동방지
$slideImg.forEach(function($sImg,idx){
  $sImg.addEventListener('click',function(evt){
    evt.preventDefault();
    slideIdx = idx;
    $playContainer.style.left = -winWid*slideIdx + 'px';
  });
});

// 페이징 클릭이벤트
$slidePagings.forEach(function($oPage,idx){
  $oPage.addEventListener('click',function(evt){
    evt.preventDefault();
    slideIdx = idx;

    $playContainer.style.left = -winWid*slideIdx + 'px';

    $slidePagings.forEach(function(anchor,actIdx){
      anchor.parentElement.classList.toggle('on',actIdx === slideIdx);
    });
  });
});

// 자동스크롤(재생)버튼
$btnSlidePlay.addEventListener('click',function(evt){
  evt.preventDefault();
  winWid  = document.body.offsetWidth;
  
  clearInterval(intervalKey);

  intervalKey = setInterval(function(){

    if(slideIdx<4){
      slideIdx++;
    }else{
      slideIdx=0;
    }

    $playContainer.style.left = -winWid*slideIdx +'px';

    $slidePagings.forEach(function(anchor,actIdx){
      anchor.parentElement.classList.toggle('on',actIdx === slideIdx);
    });
  },2000);
});

// 정지버튼
$btnSlideStop.addEventListener('click',function(evt){
  evt.preventDefault();
  clearInterval(intervalKey);
});

// 3페이지 이전버튼
$btnSlidePrev.addEventListener('click',function(evt){
  evt.preventDefault();
  winWid  = document.body.offsetWidth;

  if(slideIdx>0){
    slideIdx--;
  }else{
    slideIdx=4;
  }

  $playContainer.style.left = -winWid*slideIdx +'px';

  $slidePagings.forEach(function(anchor,actIdx){
    anchor.parentElement.classList.toggle('on',actIdx === slideIdx);
  });
});

// 3페이지 다음버튼
$btnSlideNext.addEventListener('click',function(evt){
  evt.preventDefault();
  winWid  = document.body.offsetWidth;

  if(slideIdx<4){
    slideIdx++;
  }else{
    slideIdx=0;
  }

  $playContainer.style.left = -winWid*slideIdx +'px';

  $slidePagings.forEach(function(anchor,actIdx){
    anchor.parentElement.classList.toggle('on',actIdx === slideIdx);
  });
});



/* 4페이지 -원버튼슬라이드 -안되네.. */
const $oneContainer = document.querySelector('section > article.cont4 > div.visual4 > div.slide4');
const $oneImgs = document.querySelectorAll('section > article.cont4 > div.visual4 > div.slide4 > p > a');
const $onePagings =  document.querySelectorAll('section > article.cont4 > div.visual4 > ul.pagination li > a');
const $btnOne = document.querySelector('section > article.cont4 > div.visual4 > button.onebtn');

let oneIdx = 0;
let IntervalKey = null;

$oneImgs.forEach(function($oneImg){
  $oneImg.addEventListener('click',function(evt){
    evt.preventDefault();
  });
});

//인디케이터에 대한 클릭이벤트 구문
$onePagings.forEach(function($onepage, idx){
    $onepage.addEventListener('click', function(evt){
        evt.preventDefault();
        IntervalKey = idx
        
        //컨테이너 이동
        $oneContainer.style.left = -1280*IntervalKey +'px';

        //활성화표시
        $onePagings.forEach(function(anchor, actIdx){
            anchor.parentElement.classList.toggle('on',actIdx===IntervalKey);
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
    $btnOne.addEventListener('click',function(evt){
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
    var num = IntervalKey++
    num = num%$oneImgs.length
    //컨테이너 이동
    $oneContainer.style.left = -autoPlay.width*num +'px';

    //활성화표시
    $onePagings.forEach(function(anchor, actIdx){
        anchor.parentElement.classList.toggle('on',actIdx===num);
    });
  }
}

//  원버튼 자동재생
autoPlay.init(); //처음엔 무조건 한번 실행



/* 5페이지 -기본형슬라이드 */
const $normalContainer = document.querySelector('section > article.cont5 > div.visual5 > div.slide5');
const $normalPaging = document.querySelectorAll('section > article.cont5 > div.visual5 > ul.pagination li > a');
const $normalPrev = document.querySelector('section > article.cont5 > div.visual5 > button.slidebtn.prev5');
const $normalNext = document.querySelector('section > article.cont5 > div.visual5 > button.slidebtn.next5');

let normalIdx = 0;

// 인디케이터 클릭
$normalPaging.forEach(function($nomalP,idx){
  $nomalP.addEventListener('click',function(evt){
    evt.preventDefault();

    normalIdx = idx;
    $normalContainer.style.left = -1280*normalIdx + 'px';

    $normalPaging.forEach(function(anchor,actIdx){
      anchor.parentElement.classList.toggle('on',actIdx === normalIdx);
    });
  });
});

// 이전버튼
$normalPrev.addEventListener('click',function(evt){
  evt.preventDefault();

  if(normalIdx>0){
    normalIdx--;
  }else{
    normalIdx=3;
  }

  $normalContainer.style.left = -1280*normalIdx + 'px';

  $normalPaging.forEach(function(anchor,actIdx){
    anchor.parentElement.classList.toggle('on',actIdx === normalIdx);
  });  
});

// 다음버튼
$normalNext.addEventListener('click',function(evt){
  evt.preventDefault();

  if(normalIdx<3){
    normalIdx++;
  }else{
    normalIdx=0;
  }

  $normalContainer.style.left = -1280*normalIdx + 'px';

  $normalPaging.forEach(function(anchor,actIdx){
    anchor.parentElement.classList.toggle('on',actIdx === normalIdx);
  });  
});




// top버튼 클릭
$topbtn.addEventListener('click',function(evt){
  evt.preventDefault();
  window.scrollTo({top:0, behavior:'smooth'});
});


// 로고클릭
$logo.addEventListener('click',function(evt){
  evt.preventDefault();
  $topbtn.click();
});


