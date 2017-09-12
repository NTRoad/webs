$(function() {
    init(); //加载页面时初始化
});

//加载页面时初始化
function init() {
    initSize(); //初始化大小，位置
    initMove(); //初始化事件及运动
}
window.onresize = function() {
    initSize(); //视窗大小改变时重新初始化大小，位置
};
//初始化大小，位置
function initSize() {
    initBackSize(); //初始化背景的大小和位置
    initHeaderSize(); //初始化Header部分大小和位置
    initPagesSize(); //初始化各个小页面的尺寸和位置
}
//初始化背景的大小和位置
function initBackSize() {
    $("#background").css({
        "width": $(window).width(),
        "height": $(window).height()
    });
}
//初始化Header部分大小和位置 
function initHeaderSize() {}
//初始化各个小页面的尺寸和位置
function initPagesSize() {
    var iH = $(window).height() - $("#outline").get(0).offsetTop * 2;
    $(".pages").css("height", iH + "px");
    $("#out>ul").css({
        "left": ($(".pages").width() - $("#out>ul").width()) / 2 + "px",
        "top": (parseInt($(".pages").css("height")) - $("#out>ul").height()) / 2 - 30 + "px",
    });
}


//初始化事件及运动
function initMove() {
    initHeaderMove(); //初始化header部分事件
    initPagesMove(); //初始化pages部分事件
}
//初始化header部分事件
function initHeaderMove() {
    $(".lef_menu").click(function() {
        $(".headUl").slideToggle(400);
    });
}
//初始化pages部分事件
function initPagesMove() {
    var iNow = 0;
    var way = 0;
    var startABX = 0;
    var starL = $(".pages>div").get(0).offsetLeft;
    var starT = $(".pages>div").get(0).offsetTop;
    $(".pages>div").bind("touchstart", function(event) {
        event.preventDefault();
        way = 0;
        startABX = event.changedTouches[0].pageX - this.offsetLeft; //最开始点击的横向位置差
    }).bind("touchmove", function(event) {
        event.preventDefault();
        way = event.touches[0].pageX - startABX - this.offsetLeft;
    }).bind("touchend", function(event) {
        event.preventDefault();
        if (way < -2) {
            if (iNow == $(".pages>div").length - 1) {
                iNow = 0;
            } else {
                iNow++;
            }
        } else if (way > 2) {
            if (iNow == 0) {
                iNow = $(".pages>div").length - 1;
            } else {
                iNow--;
            }
        } else {
            return;
        }
        $(this).css("display", "none");
        $(".pages>div:eq(" + iNow + ")").css({
            "opacity": 0.2,
            "display": "block"
        }).animate({
            "opacity": 0.8
        }, 300);
    });
    $(".toF").click(function() {
        $(".pages>div:eq(" + iNow + ")").css("display", "none");
        if (iNow == 0) {
            iNow = $(".pages>div").length - 1;
        } else {
            iNow--;
        }
        $(".pages>div:eq(" + iNow + ")").css({
            "opacity": 0.2,
            "display": "block"
        }).animate({
            "opacity": 0.8
        }, 300);
    });
    $(".toR").click(function() {
        $(".pages>div:eq(" + iNow + ")").css("display", "none");
        if (iNow == $(".pages>div").length - 1) {
            iNow = 0;
        } else {
            iNow++;
        }
        $(".pages>div:eq(" + iNow + ")").css({
            "opacity": 0.2,
            "display": "block"
        }).animate({
            "opacity": 0.8
        }, 300);
    });
}