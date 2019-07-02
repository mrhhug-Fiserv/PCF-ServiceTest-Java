//author Michael Hug
$('#environment-display-btn').click(function() {
    var url="/api/vcap_services";
    var method = 'GET';
    console.log("Calling: " + method + " " + url);
    $('#response-body-environment').html('Calling REST endpoint');
    $.ajax({
        type: method,
        url: url,
        success: function(result){
            $('#response-body-environment').html(syntaxHighlight(result));
        },
        error: function(xhr, status, error) {
            console.error("status: : " + status);
            console.error("error: " + error);
            console.error("xhr: " + xhr);
            $('#response-body-environment').html("ERROR! how could this every happen?!");
        },
        timeout: 7000,
        datatype: 'text'
    });
});
$('#datetime-display-btn').click(function() {
    var url="/api/datetime";
    var method = 'GET';
    console.log("Calling: " + method + " " + url);
    $('#response-body-datetime').html('Calling REST endpoint');
    $.ajax({
        type: method,
        url: url,
        success: function(result){
            $('#response-body-datetime').html(syntaxHighlight(result));
        },
        error: function(xhr, status, error) {
            console.error("status: : " + status);
            console.error("error: " + error);
            console.error("xhr: " + xhr);
            $('#response-body-datetime').html("ERROR! how could this every happen?!");
        },
        timeout: 7000,
        datatype: 'text'
    });
});
//https://stackoverflow.com/a/7220510
function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
var localhost = window.location.hostname;
var restexamples = '<h3>VCAP_SERVICES</h3><hr>';
restexamples += 'curl --request GET "https://' + localhost + '/api/vcap_services"<br>';
$('#response-body-rest').append(restexamples);
var restexamples = '<h3>Datetime</h3><hr>';
restexamples += 'curl --request GET "https://' + localhost + '/api/datetime"<br>';
$('#response-body-rest').append(restexamples);