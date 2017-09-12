function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}

function startBufferMove(obj, json, fun) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bPd = 0;
        for (attr in json) {
            var iCur = (attr == 'opacity') ? parseFloat(getStyle(obj, attr)) * 100 : parseInt(getStyle(obj, attr));
            var iSpeed = (json[attr] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (iSpeed != 0) {
                bPd++;
            }
            obj.style[attr] = attr == 'opacity' ?
                parseInt(iCur + iSpeed) / 100 : iCur + iSpeed + "px";
        }
        if (bPd == 0) {
            clearInterval(obj.timer);
            if (fun) {
                fun();
            }
        }
    }, 30);
}