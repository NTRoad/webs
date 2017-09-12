function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}

function startElasticMove(obj, json, fun) {
    clearInterval(obj.timer);
    var arrSpeed = {};
    var arrNum = {};
    for (att in json) {
        arrSpeed[att] = 0;
        arrNum[att] = (att == 'opacity') ? parseFloat(getStyle(obj, att)) * 100 : parseInt(getStyle(obj, att));;
    }
    //var iSpeed = 0;
    obj.timer = setInterval(function() {
        var bPd = 0;
        for (attr in json) {
            arrSpeed[attr] += (json[attr] - arrNum[attr]) / 5;
            arrSpeed[attr] *= 0.7;
            //iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (Math.round(arrNum[attr]) - json[attr] != 0 || Math.round(arrSpeed[attr])) {
                bPd++;
            }
            arrNum[attr] += arrSpeed[attr];
            obj.style[attr] = attr == 'opacity' ?
                Math.round(arrNum[attr]) / 100 : Math.round(arrNum[attr]) + "px";
        }
        if (bPd == 0) {
            clearInterval(obj.timer);
            if (fun) {
                fun();
            }
        }
    }, 30);
}