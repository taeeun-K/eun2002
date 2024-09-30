
// 풀페이지
$(document).ready(function() {
	$('#fullpage').fullpage({
		// options here
		autoScrolling:true,
		scrollHorizontally: true
	});

	methods
});



// 메뉴버튼활성화
const $gnbOpen = $('.mainHeader .openBtn a');
const $gnbClose = $('.gnbContainer .clseBtn a.btnClse');
const $gnb = $('.gnbContainer');

$gnbOpen.on('click',function(evt){
  evt.preventDefault();

  $gnb.addClass('on');
});

$gnbClose.on('click',function(evt){
  evt.preventDefault();

  $gnb.removeClass('on');
});

// 서브메뉴 아코디언
const $gnbMnu = $('.gnbContainer .gnbBody ul.gnb li button');
const $lnbMnu = $('.lnbBox');

$lnbMnu.hide();

$gnbMnu.on('click', function(){
  $(this).parent().toggleClass('on').siblings().removeClass('on');
  ($lnbMnu).not($(this).next($lnbMnu).slideToggle(300)).slideUp();
});




// 뉴스 슬라이드 탭처리
const $tabTit = document.querySelectorAll('.slideTab ul.tabName li a');
const $slides = document.querySelectorAll('.newsroomBox>div');

let nowIdx = 0;

$tabTit.forEach(function(tit,idx){
  tit.addEventListener('click', function(evt){
    evt.preventDefault();

    $tabTit.forEach(function(list,j){
      list.parentElement.classList.remove('on');
    });

    $slides.forEach(function(list,j){
      list.style.display = 'none';
    });

    $tabTit[idx].parentElement.classList.add('on');
    $slides[idx].style.display = 'block';
  });
});





// 푸터패밀리사이트 버튼 활성화
const $famBtn = $('button.famSite');
const $famMnu = $('.footerMenus');
const $famClse = $('.footerMenus .ftMnuHeader button.close');

$famBtn.on('click',function(){
  $famMnu.addClass('on')
});
// 푸터패밀리 닫기활성화
$famClse.on('click',function(){
  $famMnu.removeClass('on')
});




// 푸터메뉴 아코디언
const $ftMnu = $('.footerMenus .ftMnuBody ul.ftMnu li button');
console.log(11111);
const $ftLnbMnu = $('.subBox');
console.log(4444);

$ftLnbMnu.hide();

$ftMnu.on('click', function(){
  console.log('클릭');
  $(this).parent().toggleClass('on').siblings().removeClass('on');
  ($ftLnbMnu).not($(this).next($ftLnbMnu).slideToggle(300)).slideUp();
});