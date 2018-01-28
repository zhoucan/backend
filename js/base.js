$(function(){
	Wrapframe();//内容框架高度js
	SideHandle();//左侧展开关闭js
	//moreOrLite();//右侧搜索项 展开关闭js
	DataTableStyle();//table默认状态样式
})
$(window).resize(function(){
	Wrapframe();//内容框架高度js
	DataTableStyle();//table默认状态样式

});

//重置日期选择默认字体
jQuery(function ($) {
    $.datepicker.regional['zh-CN'] = {
        closeText: '关闭',
        prevText: '<上月',
        nextText: '下月>',
        currentText: '今天',
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['一', '二', '三', '四', '五', '六',
            '七', '八', '九', '十', '十一', '十二'],
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        weekHeader: '周',
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: '年'
    };
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
});



/********************************
/*2.2后台管理界面js方法
/********************************/
//内容框架高度js
function Wrapframe(){
	$('.main-left').css({height:'auto'});
	$('.main-right').css({height:'auto'});
	var WindowH = $(window).height(),
		HeightC = WindowH-145,
		wrapH = $('.wrap').height();
	    console.log(HeightC)
	if( wrapH > HeightC ){
		$('.main-left').css({height:wrapH+'px'});
		$('.main-right').css({height:wrapH+'px'});
	}else{
		$('.main-left').css({height:HeightC+'px'});
		$('.main-right').css({height:HeightC+'px'});
	}
}


//单个table高度js
function DataTableScroll(obj,arr){
	//table高度设置
	var WindowH = $(window).height(),
		HeightC = WindowH-145,
		featurebarH = $('.featurebar').outerHeight(),
		formH= $('.form-condensed').outerHeight(),
		datatableFH = $('.datatable-footer').outerHeight(),
		wrapH = $('.wrap').height();
		$(obj).find('.table-scroll').show();
	if( wrapH > HeightC ){
		var DataTableScrollH =wrapH-featurebarH-formH-datatableFH-40-40;
		$(obj).find('.table-scroll').css({'max-height':DataTableScrollH+'px','_height':DataTableScrollH+'px'});
	}else{
		var DataTableScrollH =HeightC-featurebarH-formH-datatableFH-40-40;
		$(obj).find('.table-scroll').css({'max-height':DataTableScrollH+'px','_height':DataTableScrollH+'px'});
	}
	//单元格宽度设置
	var DataTableW=0;
	for(var i=0; i<arr.length;i++){
		var SingleCellW=arr[i];
		$(obj).find('.scroll_t'+i).width(SingleCellW);
		DataTableW = DataTableW + (parseInt(arr[i])+16);
	}
	//设置table宽度设置
	var bodyRightW =$(obj).outerWidth();
	if(DataTableW>bodyRightW){
		$(obj).find('.data-table').width(DataTableW);
	}else{
		$(obj).find('.data-table').width('100%');
	}
	
	//table内容滚动设置
	var scrollLeftW=0;
	$(".table-scroll").scroll(function() {
		//console.log($(this).scrollLeft());
		var SrollLeftW = $(this).scrollLeft();
		$(this).parents('.data-table-scroll').find('.table-head').find('.data-table').css({'margin-left':'-'+SrollLeftW+'px'});
	});
	
}


/*左侧展开关闭js*/
function SideHandle(){
	var SideHandlecache = false;
	$('.SideHandle').click(function(){
		if(SideHandlecache == false){
			$('.wrap').addClass('wrap2');
			$(this).attr("title","展开二级菜单");
			SideHandlecache = true;
		}else{
			$('.wrap').removeClass('wrap2');
			$(this).attr("title","关闭二级菜单");
			SideHandlecache = false;
		}
		
	});
}

//右侧搜索项 展开关闭js
function moreOrLite(){
	var onecache = true;
	var searchH = $('.form-condensed').height();
	if( searchH >50 ){
		//$('.form-condensed').css({height:'46px'});
		$('.moreOrLite').show();
		$('.searchmore').hide();
		$('.searchlite').show();
	}else{
		//$('.moreOrLite').hide();
	}
	
	
	$('.moreOrLite').click(function(){
		if(onecache == false){
			$(this).find('.searchlite').show();
			$(this).find('.searchmore').hide();
			$('.form-condensed').css({height:'auto'});
			onecache = true;
		}else{
			$(this).find('.searchlite').hide();
			$(this).find('.searchmore').show();	
			$('.form-condensed').css({height:'46px'});
			onecache = false;
		}
		
	});
}

/*table默认状态样式*/
function DataTableStyle(){
	//根据table最大宽度设置body
	//	var sum2=0;
	//	$('table').each(function(){
	//		var tableW =$(this).width();
	//		if(tableW > sum2){
	//		sum2=tableW;//得到table中最大的宽度
	//		}
	//	});
	//	var bodyW =sum2+22+40+210;
	//	if(bodyW>$(window).width()){
	//		$('body').css({width:bodyW+'px'});
	//	}else{
	//		$('body').css({width:'100%'});
	//	}
	//END 根据table最大宽度设置body
	
    $('table tr:odd').addClass('tr_odd');//偶数行 
	$('table tr').hover(function(){
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover');
	});
	$('table tr').click(function(){
		$('tr').removeClass('active');
		$(this).addClass('active');
	});
}

/*tab选项卡*/
function tabs(tabli,current,obj,obj2){
	$(tabli).eq(0).addClass(current);
	$(obj).eq(0).show().siblings(obj).hide();
	$(obj2).eq(0).show().siblings(obj2).hide();
	$(tabli).on('click',function(){
		$(this).addClass(current).siblings().removeClass(current);
	    $(obj).eq($(this).index()).show().siblings(obj).hide();
	    $(obj2).eq($(this).index()).show().siblings(obj2).hide();
	    Wrapframe();//内容框架高度js
	})
}


//加减js调用
function detailJS(){
	//加减js调用
	$('.d-increase').click(function(){
		var obj =$(this).siblings('.detail_numtk').find('.d-text');
		var inputvalue =obj.val();
		var totleValue = parseInt(inputvalue) +1;
		if(totleValue > 9999){
			obj.val(9999).trigger("change");
		}else{
			obj.val(totleValue).trigger("change");
		}
	
	});
	$('.d-reduce').click(function(){
		var obj =$(this).siblings('.detail_numtk').find('.d-text');
		var inputvalue =obj.val();
		var totleValue = parseInt(inputvalue) -1;	
		if(totleValue < 0 ){
			obj.val(0).trigger("change");
		}else{
			obj.val(totleValue).trigger("change");
		}
	});
	
}


//弹窗- 容器,标题信息，文本信息，函数，状态（0:纯文字信息  1：单按钮信息 提交  2：双按钮信息：确认 取消，3，）
var settimemsg;
function alertDiv(container,title,msg,buttonNum,buttontext,callback){
	$('body').append('<div class="mask"></div>')
	clearTimeout(settimemsg);
	if(buttonNum == 0){//纯文字信息提示-无按钮-3秒关闭
		$('body').append('<div class="popbox ' + container +'"><div class="popcontent"><div class="proinf_t">信息提示<span class="close" onclick="removeDiv(\'' + container+ '\')">关闭</span></div><div class="proinf_cont msg">'+msg+'</div></div></div>');
		settimemsg = setTimeout( function(){ $('.'+container).remove();$('.mask').remove(); },3000);
	}else if(buttonNum == 1){//单个按钮-标题&按钮文字可修改
		$('body').append('<div class="popbox ' + container +'"><div class="popcontent"><div class="proinf_t">' + title +'<span class="close" onclick="removeDiv(\'' + container+ '\')">关闭</span></div><div class="proinf_cont">'+msg+'</div><div class="proinf_b"><button type="submit" class="btn-submit" onclick="removeDiv(\'' + container+ '\')">' + buttontext +'</button></div></div></div>');
	}
	else if(buttonNum == 2){//双按钮 确定取消 无标题
		$('body').append('<div class="popbox ' + container +'"><div class="popcontent"><div class="proinf_cont msg">'+msg+'</div><div class="proinf_b mt-20"><button type="submit" class="btn-submit" onclick="removeDiv(\'' + container+ '\')">确定</button>&nbsp;<button type="submit" class="btn-submit btn-hui" onclick="removeDiv(\'' + container+ '\')">取消</button></div></div></div>');
	}else if(buttonNum == 3){//标题自定义、内容自定义、无按钮（按钮可放在自定义内容中）
		$('body').append('<div class="popbox ' + container +'"><div class="popcontent"><div class="proinf_t">' + title +'<span class="close" onclick="removeDiv(\'' + container+ '\')">关闭</span></div><div class="proinf_cont proinf_box">'+msg+'</div></div></div>');
	}

	$('body').css({'overflow':'hidden'});
	$('.'+container).show();
	$('.mask').css({'height':$(document).height(),'width':$(document).width()});
	
	//判断容器高度
	var containerH = $('.'+container).height();
	if((containerH-16)>$(window).height()){
		var aH=($(window).height()-$('.'+container).outerHeight(true))/2,
			aW=($(window).width()-$('.'+container).outerWidth(true))/2;
		$('.'+container).css({'left':aW,'top':'10px','z-index':9990});
		$('.'+container).find('.proinf_cont').height($(window).height()-16-47-20);
		$('.'+container).find('.proinf_cont').css({'overflow-y':'auto','overflow-x':'hidden'});
	}else{
		
		var aH=($(window).height()-$('.'+container).outerHeight(true))/2,
			aW=($(window).width()-$('.'+container).outerWidth(true))/2;
		$('.'+container).css({'left':aW,'top':aH,'z-index':9990});
	}
	
	$('.'+container).on('click',function(){
		//return false;
	})
	$('.'+container).find('.touch').focus();
	$('.mask').on('click',function(){
		$('.'+container).hide();
		$('.mask').remove();
	})
	$('.'+container).find('.touch').on('click',function(){
		closeDiv('ccs_pop');
		$('body').css({'overflow':'auto'});
		if(callback){
		callback();
		}
	})
}


function closeDiv(obj){
	$('.'+obj).hide();
	$('body').css({'overflow':'auto'});
	if($('.mask')){
		$('.mask').remove()
	}
}
function removeDiv(obj){
	clearTimeout();
	$('.'+obj).remove();
	$('body').css({'overflow':'auto'});
	if($('.mask')){
		$('.mask').remove()
	}

}

//换肤功能
function ChangeStyle(obj){
$("link[title='"+obj+"']").removeAttr("disabled"); 
}


