


var _modScaleManager = require('scale_manager');

$('#btnUp').click(function() {
    var allText = $('textarea').val();
    var newText = _modScaleManager.changeAll(allText, 1);
    $('textarea').val(newText);
})
$('#btnDown').click(function() {
    var allText = $('textarea').val();
    var newText = _modScaleManager.changeAll(allText, -1);
    $('textarea').val(newText);
})
$('#btnNumber').click(function() {
    var allText = $('textarea').val();
    var newText = _modScaleManager.changeAll(allText, 0);
    $('textarea').val(newText);
})