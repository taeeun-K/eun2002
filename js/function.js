// 로딩
$(function(){
	const $loading = $('.loading');
	// 로딩중
	$loading.children('p').show();
	// $loading.hide();
	$loading.delay(2000).hide(10, function(){
		$(this).remove();
	});	
	$('header').addClass('active');

	if($(window).width()<=640){
		$loading.delay(0).hide();
		$('header').addClass('active');
	}
})


//네비게이션
$(function() {
	const $header = $('header');
	const $nav = $header.find('nav');
	const $btnGnb = $header.find('.btn-gnb');


	//햄버거버튼
	$btnGnb.on('click', function() {
		$(this).toggleClass('clse');
		$nav.toggle();
	});

	$(window).on('scroll', function() {
		//현재 스크롤바의 top 값 추출
		let scrollTop = $(this).scrollTop();

		if (scrollTop > 1) {
			$header.addClass('fixed');
			//const headerH = $header.outerHeight()
			$('#aboutme').css({
				// marginTop: $header.height()
			});
			
		} else {
			$header.removeClass('fixed');
			$('#aboutme').css({
				marginTop: 0
			});
		}
	}); //end of scroll

});



//portfolio slide처리
$(function(){
    const $slides = $('.slides_box figure');
    const $indicator = $('ul.slides_pagination li a');
		const $btnNext = $('#portfolio .next');
		const $btnPrev = $('#portfolio .prev');

		const $thumbs = $('article.pofolSlide .thumb_box ul.slides_thumb li a');

    let nowIdx = 0;
    let oldIdx = nowIdx;

    function slideFn(){
        $slides.eq(oldIdx).removeClass('active');//이전 슬라이드 사라짐 처리
        $slides.eq(nowIdx).addClass('active');//이번에 나타날 슬라이드 처리
        
        //활성화표시
        $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
        $thumbs.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
    }

    // 슬라이드상단 인디케이터
    $indicator.on('click', function(evt){

        evt.preventDefault();

        oldIdx = nowIdx;
        nowIdx = $indicator.index(this);

        slideFn();
    });


		// 슬라이드하단 썸네일
		$thumbs.on('click', function(evt){

			evt.preventDefault();

			oldIdx = nowIdx;
			nowIdx = $thumbs.index(this);

			slideFn();
	});

	$btnNext.on('click', function(evt){
		evt.preventDefault();

        oldIdx = nowIdx;
		
		if(nowIdx<$indicator.length-1){
			nowIdx++
		}else{
			nowIdx=0;
		}

		slideFn();
	});

	$btnPrev.on('click', function(evt){
		evt.preventDefault();

        oldIdx = nowIdx;

		if(nowIdx<1){
			nowIdx=$indicator.length-1
		}else{
			nowIdx--;
		}

		slideFn();
    });
    
});




//오른쪽 하단 탑버튼
$(function() {
	const $aside = $('aside'); //오른쪽 하단 탑버튼

	$(window).on('scroll', function() {
		//현재 스크롤바의 top 값 추출
		let scrollTop = $(this).scrollTop();

		//스크롤바를 120px 이상 내리면 노출시킴
		if (scrollTop > 120) {
			$aside.stop().fadeIn();
		} else {
			$aside.stop().fadeOut();
		}

		//footer가 화면에 노출되는 순간부터 TOP 아이콘이 footer 바로 위에 있게 하고 싶다.
		//원리 = footer.offset().top = scrollTop + 브라우저의 높이값
		//view = (scrollTop + 브라우저의 높이값) - footer.offset().top
		//view = 0 이라면 브라우저 바로 밑에 푸터가 있는 상태(노출직전 상태)
		//view > 0 이라면 footer가 화면에 노출되었다는 것을 의미한다.
		//view > 0 상태에서 view 값이 갖는 의미는 footer가 노출되는 높이이다.

		const view = scrollTop + $(this).height() - $('footer').offset().top;

		if (view > 0) {
			$aside.css({ marginBottom: view });
		} else {
			$aside.css({ marginBottom: 0 });
		}
	}); //end of scroll

});


//원페이지 스크롤
$(function(){
	
    const $header = $("header");
    const headerH = $header.outerHeight();//헤더의 높이(보더,패딩 포함해서 측정)

	const $mnu = $('header>.container>nav>.gnb>li>a');
    let idx = 0;//현재 선택된 메뉴의 인덱스

    let arrTopVal = [];//header이후에 나타나는 section의 top값

    
    // 함수는 반복되는 코드를 많들어 놓고 사용하면 코드의 재활용 측면에서 유용하게 사용 가능
    function pageAni(topVal){
        $('html, body').stop().animate({scrollTop:topVal});
    }

    //load 이벤트는 컨텐츠가 페이지에 노출된 시점에 딱 한번 일어남
    //resize 이벤트는 브라우저의 크기가 바뀌면 일어남
    $(window).on('load resize', function(){

        // console.log("현재 메뉴의 개수 : "+$mnu.size());
        
        //어떤 요소의 top값(문서/브라우저/body로부터의 거리)를 구하는 방법 -> .offset().top
        //각 section의 top값을 자동으로 계산하는 장점
        //반복문을 이용한 처리
        for(let i=0;i<$mnu.size();i++){
            arrTopVal[i] = $("header~section").eq(i).offset().top;
        }
        
    });

	
	const $btnGnb = $header.find('.btn-gnb');

    $mnu.on('click', function(evt){
        //이번에 클릭한 요소의 index번호
        idx = $mnu.index(this);
        pageAni(arrTopVal[idx]-headerH+1);//fixed한 헤더의 높이값
        evt.preventDefault();

		if($(window).width()<=640){
			$btnGnb.trigger("click");
		}
    });


    $(window).on('scroll', function(){

        let scrollTop = $(this).scrollTop();


        //메뉴 활성화 표시
        for(let i=0;i<$mnu.size();i++){
            if(scrollTop>=arrTopVal[i]-headerH-300){//fixed한 헤더의 높이값
                $mnu.eq(i).parent().addClass('on');
                $mnu.eq(i).parent().siblings().removeClass('on');
            }else if(scrollTop<arrTopVal[0]-headerH-300){//비주얼 슬라이드 구간
                $mnu.parent().removeClass('on');
            }
        }
		
    });


    //로고에 대한 클릭이벤트 구문
    $(".logo, aside").on('click', function(evt){
        evt.preventDefault();
        pageAni(0);
    });

	
	//최초 로딩시 맨위로 이동
    $(window).on('load', function(){
        pageAni(0);
    });

});

