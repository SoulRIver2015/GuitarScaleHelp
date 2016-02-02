

var _7Scale = ["C","D","E","F","G","A","B"];
var _scaleData = [{
        value: 1,
        name: ['C']
    }, {
        value: 2,
        name: ['#C', 'bD']
    }, {
        value: 3,
        name: ['D']
    }, {
        value: 4,
        name: ['#D', 'bE']
    }, {
        value: 5,
        name: ['E']
    }, {
        value: 6,
        name: ['F']
    }, {
        value: 7,
        name: ['#F', 'bG']
    }, {
        value: 8,
        name: ['G']
    }, {
        value: 9,
        name: ['#G', 'bA']
    }, {
        value: 10,
        name: ['A']
    }, {
        value: 11,
        name: ['bB', '#A']
    }, {
        value: 12,
        name: ['B']
}];
var _scaleNameArr = getScaleDataNameArr();


function checkRowIsScale(rowStr) {
    // 不包含 CDEFGAB 则不是
    var flagHasCDEFGAB = false;
    for (var i = 0; i < _7Scale.length; i++) {
        if(rowStr.indexOf(_7Scale[i])!=-1){
            flagHasCDEFGAB = true;
            break;
        }
    };
    if(!flagHasCDEFGAB) return false;
    // 包含汉子 则不是
    if(/[\u4E00-\u9FA5]/.test(rowStr)) return false;
    // 开头是(wd) ，则必不是
    if(/^\(wd\)/.test(rowStr)) return false;
    // 其他情况默认 是
    return true;
}

//一行文字的切换， scale_change_step:0 代表获取 数字 表达的音阶
function changeScaleRow(rowStr, scale_change_step) {
    var regStr = _scaleNameArr.join('|');
    var rowStrChanged = rowStr.replace(new RegExp(regStr, "g"), function(x){
        var value = getValueByName(x);
        value += scale_change_step;
        if(value<1){
            value = value + 12;
        } else if(value>12){
            value = value-12;
        }
        // value = value > 12 ? value - 12 : value;
        if(scale_change_step == 0){
            return value;
        } else {
            return getNameByValue(value);
        }
    })
    return rowStrChanged;
}

//切换所有文本
exports.changeAll = function(allText, scale_change_step) {
    var rows = allText.split('\n');
    for (var i = 0; i < rows.length; i++) {
        if(checkRowIsScale(rows[i]))
            rows[i] = changeScaleRow(rows[i], scale_change_step);
    };
    allTextNew = rows.join('\n');
    return allTextNew;
}

function getScaleDataNameArr() {
    var keyArr = [];
    for (var i = 0; i < _scaleData.length; i++) {
        keyArr.push(_scaleData[i].name.join('|'));
    };
    return keyArr;
}

function getValueByName(name) {
    for (var i = 0; i < _scaleData.length; i++) {
        if(_.contains(_scaleData[i].name, name)) return _scaleData[i].value;
    };
}

function getNameByValue(value) {
    for (var i = 0; i < _scaleData.length; i++) {
        if(_scaleData[i].value == value) return _scaleData[i].name[0];
    };
}