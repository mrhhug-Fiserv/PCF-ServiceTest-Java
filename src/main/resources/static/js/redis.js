//author Michael Hug
$('#redis-get-btn').click(function() {
    var key=$('#key').val();
    var url="api/redis/get/" + key;
    var method = 'GET';
    if ( key === "" ) {
        $('#response-body-redis').html('Please enter a key.');
    } else {
        console.log("Calling: " + method + " " + url);
        $('#response-body-redis').html('Calling REST endpoint');
        $.ajax({
            type: method,
            url: url,
            success: function(result){
                var ret = "<table><tr><th>Key</th><th>Value</th></tr>";
                for (var i in result) {
                    ret += "<tr><td>"+i+"</td><td>"+result[i]+"</td></tr>";
                }
                ret += "</table>";
                $('#response-body-redis').html(ret);
            },
            error: function(xhr, status, error) {
                console.error("status: : " + status);
                console.error("error: " + error);
                console.error("xhr: " + xhr);
                $('#response-body-redis').html("ERROR! Is the redis service bound?");
            },
            dataType: 'json'
        });
    }
});

$('#redis-getAllKeyValues-btn').click(function() {
    var url="api/redis/get/*";
    var method = 'GET';
    console.log("Calling: " + method + " " + url);
    $('#response-body-redis').html('Calling REST endpoint');
    $.ajax({
        type: method,
        url: url,
        success: function(result){
            var ret = "<table><tr><th>Key</th><th>Value</th></tr>";
            for (var i in result) {
                ret += "<tr><td>"+i+"</td><td>"+result[i]+"</td></tr>";
            }
            ret += "</table>";
            $('#response-body-redis').html(ret);
        },
        error: function(xhr, status, error) {
            console.error("status: : " + status);
            console.error("error: " + error);
            console.error("xhr: " + xhr);
            $('#response-body-redis').html("ERROR! Is the redis service bound?");
        },
        dataType: 'json'
    });
});

$('#redis-set-btn').click(function() {
    var key=$('#key').val();
    var value=$('#value').val();
    var url="api/redis/set/" + key +"/" + value;
    var method = 'PUT';
    if ( key === "" ) {
        $('#response-body-redis').html('Please enter a key.');
    } else if ( value === "" ) {
        $('#response-body-redis').html('Please enter a value.');
    } else {
        console.log("Calling: " + method + " " + url);
        $('#response-body-redis').html('Calling REST endpoint');
        $.ajax({
            type: method,
            url: url,
            success: function(){
                $('#response-body-redis').html("ok");
            },
            error: function(xhr, status, error) {
                console.error("status: : " + status);
                console.error("error: " + error);
                console.error("xhr: " + xhr);
                $('#response-body-redis').html("ERROR! Is the redis service bound?");
            }
        });
    }
});

$('#redis-setRandom-btn').click(function() {
    var count = 10;
    var url="api/redis/set/random/" + count;
    var method = 'PUT';
    $('#response-body-redis').html('Calling REST endpoint');
    $.ajax({
        type: method,
        url: url,
        success: function(){
            $('#response-body-redis').html("ok");
        },
        error: function(xhr, status, error) {
            console.error("status: : " + status);
            console.error("error: " + error);
            console.error("xhr: " + xhr);
            $('#response-body-redis').html("ERROR! Is the redis service bound?");
        }
    });
});

$('#redis-del-btn').click(function() {
    var key=$('#key').val();
    var url="api/redis/del/" + key;
    var method = 'DELETE';
    $('#response-body-redis').html('Calling REST endpoint');
    if ( key === "" ) {
        $('#response-body-redis').html('Please enter a key.');
    } else {
        console.log("Calling: " + method + " " + url);
        $.ajax({
            type: method,
            url: url,
            success: function(){
                $('#response-body-redis').html("ok");
            },
            error: function(xhr, status, error) {
                console.error("status: : " + status);
                console.error("error: " + error);
                console.error("xhr: " + xhr);
                $('#response-body-redis').html("ERROR! Is the redis service bound?");
            }
        });
    }
});

$('#redis-flushAll-btn').click(function() {
    var url="/api/redis/del/*";
    var method = 'DELETE';
    console.log("Calling: " + method + " " + url);
    $('#response-body-redis').html('Calling REST endpoint');
    $.ajax({
        type: 'DELETE',
        url: url,
        success: function(result){
            $('#response-body-redis').html("ok");
        },
        error: function(xhr, status, error) {
            console.error("status: : " + status);
            console.error("error: " + error);
            console.error("xhr: " + xhr);
            $('#response-body-redis').html("ERROR! Is the redis service bound?");
        },
        datatype: 'text'
    });
});

var localhost = window.location.hostname;
var restexamples = '<h3>Redis</h3><hr>';
restexamples += 'curl -k -X GET "https://' + localhost + '/api/redis/get/{key}"<br>';
restexamples += 'curl -k -X GET "https://' + localhost + '/api/redis/get/*"<br>';
restexamples += 'curl -k -X GET "https://' + localhost + '/api/redis/info"<br>';
restexamples += 'curl -k -X PUT "https://' + localhost + '/api/redis/set/{key}/{value}"<br>';
restexamples += 'curl -k -X PUT "https://' + localhost + '/api/redis/random/{count};"<br>';
restexamples += 'curl -k -X DELETE "https://' + localhost + '/api/redis/del/{key}"<br>';
restexamples += 'curl -k -X DELETE "https://' + localhost + '/api/redis/del/*"<br>';
restexamples += 'curl -k -X GET "https://' + localhost + '/api/redis/setgethealthcheck"<br>';
$('#response-body-rest').append(restexamples);
