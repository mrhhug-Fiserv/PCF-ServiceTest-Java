//author Michael Hug
$('#rabbit-produce-btn').click(function() {
    var mes=$('#message').val();
    var url="api/rabbit/produce/" + mes;
    var method = 'POST';
    if ( mes === "" ) {
        $('#response-body-rabbit').html('Please enter a message');
    } else {
        console.log("Calling: " + method + " " + url);
        $('#response-body-rabbit').html('Calling REST endpoint');
        $.ajax({
            type: method,
            url: url,
            success: function(){
                $('#response-body-rabbit').html("ok");
            },
            error: function(xhr, status, error) {
                console.error("status: : " + status);
                console.error("error: " + error);
                console.error("xhr: " + xhr);
                $('#response-body-rabbit').html("ERROR! Is the rabbit service bound?");
            }
        });
    }
});

$('#rabbit-produceRandom-btn').click(function() {
    var url="api/rabbit/produce/random/" + 10;
    var method = 'POST';
    console.log("Calling: " + method + " " + url);
    $('#response-body-rabbit').html('Calling REST endpoint');
    $.ajax({
        type: method,
        url: url,
        success: function(){
            $('#response-body-rabbit').html("ok");
        },
        error: function(xhr, status, error) {
            console.error("status: : " + status);
            console.error("error: " + error);
            console.error("xhr: " + xhr);
            $('#response-body-rabbit').html("ERROR! Is the rabbit service bound?");
        }
    });
});

$('#rabbit-consume-btn').click(function() {
    var url="api/rabbit/consume";
    var method = 'POST';
    console.log("Calling: " + method + " " + url);
    $('#response-body-rabbit').html('Calling REST endpoint');
    $.ajax({
        type: method,
        url: url,
        success: function(result){
            var ret = "<table><tr><th>Message</th></tr>";
            ret += "<tr><td>"+result['message']+"</td></tr>";
            ret += "</table>";
            $('#response-body-rabbit').html(ret);
        },
        error: function(xhr, status, error) {
            console.error("status: : " + status);
            console.error("error: " + error);
            console.error("xhr: " + xhr);
            $('#response-body-rabbit').html("ERROR! Is the rabbit service bound? Are any messages left in the queue?");
        },
        dataType: 'json'
    });
});

$('#rabbit-consumeAll-btn').click(function() {
    var url="api/rabbit/consume/*";
    var method = 'POST';
    console.log("Calling: " + method + " " + url);
    $('#response-body-rabbit').html('Calling REST endpoint');
    $.ajax({
        type: method,
        url: url,
        success: function(result){
            var ret = "<table><tr><th>Message</th></tr>";
            if(0 === result.length) {
                ret += "<tr><td></td></tr>";
            } else {
                for (var i in result) {
                ret += "<tr><td>"+result[i]['message']+"</td></tr>";
                }
            }
            ret += "</table>";
            $('#response-body-rabbit').html(ret);
        },
        error: function(xhr, status, error) {
            console.error("status: : " + status);
            console.error("error: " + error);
            console.error("xhr: " + xhr);
            $('#response-body-rabbit').html("ERROR! Is the rabbit service bound?");
        },
        dataType: 'json'
    });
});

$('#rabbit-count-btn').click(function() {
    var url="api/rabbit/count";
    var method = 'GET';
    console.log("Calling: " + method + " " + url);
    $('#response-body-rabbit').html('Calling REST endpoint');
    $.ajax({
        type: method,
        url: url,
        success: function(result){
            $('#response-body-rabbit').html(result);
        },
        error: function(xhr, status, error) {
            console.error("status: : " + status);
            console.error("error: " + error);
            console.error("xhr: " + xhr);
            $('#response-body-rabbit').html("ERROR! Is the rabbit service bound?");
        },
        dataType: 'json'
    });
});

var localhost = window.location.hostname;
var restexamples = '<h3>Rabbit</h3><hr>';
restexamples += 'curl --request POST "https://' + localhost + '/api/rabbit/produce/{message}"<br>';
restexamples += 'curl --request POST "https://' + localhost + '/api/rabbit/produce/random/{int}"<br>';
restexamples += 'curl --request POST "https://' + localhost + '/api/rabbit/consume"<br>';
restexamples += 'curl --request POST "https://' + localhost + '/api/rabbit/consume/*"<br>';
restexamples += 'curl --request GET "https://' + localhost + '/api/rabbit/count"<br>';
restexamples += 'curl --request GET "https://' + localhost + '/api/rabbit/healthcheck"<br>';
$('#response-body-rest').append(restexamples);
