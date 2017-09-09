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
}

//初始化大小，位置
function initSize() {
    initBackSize(); //初始化背景的大小和位置
    initHeaderSize(); //初始化Header部分大小和位置
    initBigBannerSize(); //初始化大图轮播部分大小和位置
    initPhotoSize(); //初始化photo部分大小和位置
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
//初始化大图轮播部分大小和位置
function initBigBannerSize() {
    $("#bigBanner").css({
        "height": parseInt($("#bigBanner").css("width")) / 2 + "px"
    });
    $(".bigBannerUl").css({
        "width": $(".bigBannerUl>li").length * 2 + "00%"
    });
    $(".bigBannerUl>li").css({
        "width": (1 / $(".bigBannerUl>li").length / 2) * 100 + "%"
    });
    $(".bigBannerSpan").css({
        "left": ($(".bigBannerUl>li").width() - $(".bigBannerSpan").width()) / 2 + "px"
    });
    $(".bigBannerUl").animate({
        "left": -1 * $(".bigBannerUl>li").width() * (iNow) + "px"
    }, 0);
}
//初始化photo部分大小和位置
function initPhotoSize() {
    for (var i = 0; i < $(".big_photo").find("li").length; i++) {
        $(".big_photo").find("li:eq(" + i + ")").css({
            "top": parseInt(i / 3) * $(".tabPic").find("img").width()
        });
        $(".tabPic").find("img").get(i).title = "点击以查看大图";
    }
    $(".tabPic").find("img").css("height", $(".tabPic").find("img").width());
}

//初始化事件及运动
function initMove() {
    initHeaderMove(); //初始化header部分事件
    initBigBannerMove(); //初始化bigBanner部分事件
    initPhotoMove(); //初始化photo部分的事件
}
//初始化header部分事件
function initHeaderMove() {
    $(".rig_menu").click(function() {
        $(".tes").slideToggle(400);
    });
    $(".lef_menu").click(function() {
        $(".headUl").slideToggle(400);
    });
}
var iNow = 0;
//初始化bigBanner部分事件 
function initBigBannerMove() {
    $(".bigBannerSpan").html();
    for (var i = 0; i < $(".bigBannerUl>li").length; i++) {
        $(".bigBannerSpan").append("<span></span>");
    }
    $(".bigBannerSpan").find("span:eq(0)").css("opacity", "1");
    $(".bigBannerSpan").css({
        "left": ($(".bigBannerUl>li").width() - $(".bigBannerSpan").width()) / 2 + "px"
    });
    $(".banTo").fadeOut();
    $(".bigBannerUl").html($(".bigBannerUl").html() + $(".bigBannerUl").html());
    var startABX = 0;
    var way = 0;
    var timer = null;
    $("#bigBanner").bind("mouseover", function(event) {
        $(".banTo").stop();
        $(".banTo").fadeIn();
        clearInterval(timer);
    }).bind("mouseout", function(event) {
        $(".banTo").stop();
        $(".banTo").fadeOut();
        timer = setInterval(function() {
            $(".bigBannerSpan>span:eq(" + iNow + ")").fadeTo(0, 0.6);
            $(".bigBannerUl").animate({ "left": -1 * (++iNow) * $(".bigBannerUl>li").width() + "px" }, 500);
            if (iNow == $(".bigBannerUl>li").length / 2) {
                iNow = 0;
                $(".bigBannerUl").animate({ "left": 0 + "px" }, 0);
            }
            $(".bigBannerSpan>span:eq(" + iNow + ")").fadeTo(500, 1);
        }, 5000);
    });
    $(".bigBannerUl").bind("touchstart", function(event) {
        way = 0;
        event.preventDefault();
        $(this).stop(); //停止当前动画
        clearInterval(timer);
        startABX = event.changedTouches[0].pageX - this.offsetLeft; //最开始点击的横向位置差
    }).bind("touchmove", function(event) {
        way = event.touches[0].pageX - startABX - this.offsetLeft;
        $(this).css("left", event.touches[0].pageX - startABX + "px"); //bannerUl随鼠标拖动
        if (this.offsetLeft > 0) {
            $(".bigBannerUl").animate({ "left": this.offsetLeft - $(".bigBannerUl>li").width() * $(".bigBannerUl>li").length / 2 + "px" }, 0);
        }
    }).bind("touchend", function(event) {
        if (way > 0.5) {
            iNow--;
        } else if (way < -0.5) {
            iNow++;
        }
        if (iNow < 0) {
            iNow += $(".bigBannerUl>li").length / 2;
        }
        $(".bigBannerSpan>span").fadeTo(0, 0.6);
        $(".bigBannerUl").animate({ "left": -1 * iNow * $(".bigBannerUl>li").width() + "px" }, 200);
        iNow = iNow % ($(".bigBannerUl>li").length / 2);

        $(".bigBannerUl").animate({ "left": -1 * iNow * $(".bigBannerUl>li").width() + "px" }, 0);
        $(".bigBannerSpan>span:eq(" + iNow + ")").fadeTo(300, 1);
        timer = setInterval(function() {
            $(".bigBannerSpan>span:eq(" + iNow + ")").fadeTo(0, 0.6);
            $(".bigBannerUl").animate({ "left": -1 * (++iNow) * $(".bigBannerUl>li").width() + "px" }, 500);
            if (iNow == $(".bigBannerUl>li").length / 2) {
                iNow = 0;
                $(".bigBannerUl").animate({ "left": 0 + "px" }, 0);
            }
            $(".bigBannerSpan>span:eq(" + iNow + ")").fadeTo(500, 1);
        }, 5000);
    });

    $(".toR").click(function(event) {
        clearInterval(timer);
        $(".bigBannerUl").stop();
        $(".bigBannerSpan>span:eq(" + iNow + ")").fadeTo(500, 0.6);
        $(".bigBannerUl").animate({ "left": -1 * (++iNow) * $(".bigBannerUl>li").width() + "px" }, 500);
        if (iNow == $(".bigBannerUl>li").length / 2) {
            iNow = 0;
            $(".bigBannerUl").animate({ "left": 0 + "px" }, 0);
        }
        $(".bigBannerSpan>span:eq(" + iNow + ")").fadeTo(500, 1);
        timer = setInterval(function() {
            $(".bigBannerSpan>span:eq(" + iNow + ")").fadeTo(500, 0.6);
            $(".bigBannerUl").animate({ "left": -1 * (++iNow) * $(".bigBannerUl>li").width() + "px" }, 500);
            if (iNow == $(".bigBannerUl>li").length / 2) {
                iNow = 0;
                $(".bigBannerUl").animate({ "left": 0 + "px" }, 0);
            }
            $(".bigBannerSpan>span:eq(" + iNow + ")").fadeTo(500, 1);
        }, 5000);
    });
    $(".toF").click(function(event) {
        clearInterval(timer);
        $(".bigBannerUl").stop();
        $(".bigBannerSpan>span:eq(" + iNow + ")").fadeTo(500, 0.6);
        if (iNow == 0) {
            iNow = $(".bigBannerUl>li").length / 2;
            $(".bigBannerUl").animate({
                "left": -1 * $(".bigBannerUl>li").width() * (iNow) + "px"
            }, 0);
        }
        $(".bigBannerUl").animate({
            "left": -1 * $(".bigBannerUl>li").width() * (--iNow) + "px"
        }, 800);
        $(".bigBannerSpan>span:eq(" + iNow + ")").fadeTo(500, 1);
        timer = setInterval(function() {
            $(".bigBannerSpan>span:eq(" + iNow + ")").fadeTo(500, 0.6);
            $(".bigBannerUl").animate({ "left": -1 * (++iNow) * $(".bigBannerUl>li").width() + "px" }, 500);
            if (iNow == $(".bigBannerUl>li").length / 2) {
                iNow = 0;
                $(".bigBannerUl").animate({ "left": 0 + "px" }, 0);
            }
            $(".bigBannerSpan>span:eq(" + iNow + ")").fadeTo(500, 1);
        }, 5000);
    });
    $(".bigBannerSpan>span").bind("mouseover", function() {
        clearInterval(timer);
        $(".bigBannerSpan>span:eq(" + iNow + ")").fadeTo(0, 0.6);
        iNow = $(this).prevAll().length;
        $(".bigBannerUl").animate({ "left": -1 * (iNow) * $(".bigBannerUl>li").width() + "px" }, 500);
        $(".bigBannerSpan>span:eq(" + iNow + ")").fadeTo(500, 1);
    });
    timer = setInterval(function() {
        $(".bigBannerSpan>span:eq(" + iNow + ")").fadeTo(500, 0.6);
        $(".bigBannerUl").animate({ "left": -1 * (++iNow) * $(".bigBannerUl>li").width() + "px" }, 500);
        if (iNow == $(".bigBannerUl>li").length / 2) {
            iNow = 0;
            $(".bigBannerUl").animate({ "left": 0 + "px" }, 0);
        }
        $(".bigBannerSpan>span:eq(" + iNow + ")").fadeTo(500, 1);
    }, 5000);
}
//初始化photo部分的事件 
function initPhotoMove() {
    $(".tabPic").find("li").click(function() {
        $(".big_photo").find("li").css("display", "none");
        $(".big_photo").find("li:eq(" + $(this).prevAll().length + ")").css("display", "block");
        $(".shade").css("display", "block");
    });
    $(".big_photo").find("li").click(function() {
        $(this).css("display", "none");
        $(".shade").css("display", "none");
    });
}