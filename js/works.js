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
//初始化事件及运动
function initMove() {
    initHeaderMove(); //初始化header部分事件
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