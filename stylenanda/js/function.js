// 메뉴 fixed처리
const $navi = $('nav');
console.log(document.querySelector('nav'));

$(window).on('scroll', function(){
  const scrollTop = Math.ceil($(this).scrollTop());

  if(scrollTop>196){
      $navi.addClass('fixed');
  }else{
      $navi.removeClass('fixed');
  }
});



// gnb-sub 
$gnbs = $('ul.gnb li');
$sub = $('header .subContainer');

let mnuIdx = 0;

$gnbs.on('mouseenter', function(){
  mnuIdx = $gnbs.index(this);
  $sub.eq(mnuIdx).css('display','block');
});

$gnbs.on('mouseleave', function(){
  mnuIdx = $gnbs.index(this);
  $sub.eq(mnuIdx).css('display','none');   
});




// 분문 상품 탭메뉴&슬라이드
const $tabTitle = document.querySelectorAll('ul.menuList li a');
const $titleBG = document.querySelectorAll('.productTitle .titleBG ul.background li');
const $produceLists = document.querySelectorAll('.productList');
let nowIdx = 0;

$tabTitle.forEach(function(title,idx){
  title.addEventListener('click',function(evt){
    evt.preventDefault();
    $tabTitle.forEach(function(list,j){
      list.parentElement.classList.remove('on');
    });

    $produceLists.forEach(function(list,j){
      list.style.display = 'none';
    });

    $titleBG.forEach(function(list,j){
      list.style.display = 'none';
    });

    $tabTitle[idx].parentElement.classList.add('on');
    $produceLists[idx].style.display = 'block'
    $titleBG[idx].style.display = 'block'
  });
});


