define(['jquery/jquery.min'], function() {
	var exportObj = {},        // export接口
	    position = [],         // 确定各页的位置关系
		windowWidth = window.innerWidth,
		windowHeight = window.innerHeight,
		prevWidth = windowWidth,
		prevHeight = windowWidth;   
		      
	/* 位置关系如图    ***
	                   **
					    ****
	*/

	// 初始化页面位置
	position[0] = [0, 0];	
	position[1] = [1, 0];	
	position[2] = [2, 0];	
	position[3] = [1, 1];	
	position[4] = [2, 1];	
	position[5] = [2, 2];	
	position[6] = [3, 2];	
	position[7] = [4, 2];	
	position[8] = [5, 2];
	var initPosition = function() {
		
		if ( windowWidth <= 1200 ) {
			$('div.page').each( function(index) {
			    $(this).css('left', position[index][0] * 1200); 						     			
			});			
		} else if ( windowWidth > 1200 ) {
			$('div.page').each( function(index) {
			    $(this).css('left', position[index][0] * windowWidth); 						     			
			});
		}
		if ( windowHeight <= 640 ) {
			$('div.page').each( function(index) {
			    $(this).css('top', position[index][1] * 640); 						     			
			});
		} else if ( windowHeight > 640 ) {
			$('div.page').each( function(index) {
			    $(this).css('top', position[index][1] * windowHeight); 						     			
			});
		}
		
	};
	
	// 监听窗口大小变化
	(function() {
		initPosition();
		var currentIndex = 0,
		    xChange = 0,
			yChange = 0;
	    window.onresize = function() {
			windowWidth = window.innerWidth,
			windowHeight = window.innerHeight;
		    // 改变每页的left和top指，该值是在原有的基础上进行计算
			if ( windowWidth > 1200 ) {
				$('div.page').each( function() {
				    $(this).css('width', windowWidth + 'px');
			    });				
			} else {
				$('div.page').each( function() {
				    $(this).css('width', 1200 + 'px');					
			    });
			}
			if ( windowHeight > 640 ) {
				$('div.page').each( function() {
				    $(this).css('height', windowHeight + 'px');				
			    });
			} else {
				$('div.page').each( function() {
				    $(this).css('height', 640 + 'px');				
			    });
			}
			currentIndex = $('div.select li.checked').attr('data-index');
		    xChange = -position[currentIndex][0];
		    yChange = -position[currentIndex][1];
			// 更新位置数组
			for ( var index in position ) {
				position[index][0] = position[index][0] + xChange;
				position[index][1] = position[index][1] + yChange;
			}
			if ( !$($('div.page')[currentIndex]).hasClass('right') ) {
				$('div.select').animate({
					left: windowWidth - 116 + 'px'
				}, 200);
			} else {
				$('div.select').animate({
					left: 0 + 'px'
				}, 200);				
			}
			initPosition();
		};
	}())
	
	// 初始化导航
	var initPagenation = function() {
		$('div.select li').on('click', function(event){
		    $('div.select li').off('click');
			var index = $(this).attr('data-index'),
			    prevIndex = $('div.select li.checked').attr('data-index'),
				xChange = position[prevIndex][0] - position[index][0],
				yChange = position[prevIndex][1] - position[index][1];
			if ( windowWidth > 1200 ) {
				x = (position[prevIndex][0] - position[index][0]) * windowWidth;					
			} else {
				x = (position[prevIndex][0] - position[index][0]) * 1200;								
			}
			if ( windowHeight > 640 ) {
				y = (position[prevIndex][1] - position[index][1]) * windowHeight;	
			} else {
				y = (position[prevIndex][1] - position[index][1]) * 640;	
			}
			// 改变导航状态
			$('div.select li')[prevIndex].className = '';
			$('div.select li')[index].className = 'checked';			
			if ( !$($('div.page')[index]).hasClass('right') ) {
				$('div.select').animate({
					left: windowWidth - 116 + 'px'
				}, 800);
			} else {
				$('div.select').animate({
					left: 0 + 'px'
				}, 800);				
			}
			// 滚动屏幕
			$('div.page').each( function() {
				$(this).animate( {
					left: $(this).position().left + x + 'px',
					top: $(this).position().top + y + 'px'
				}, 1800);
			});
			
			setTimeout(initPagenation, 1800);
			// 添加文字进入的效果
					
		});
	};		
	
	exportObj.initPagenation = initPagenation;
	return exportObj;
});