//author Michael Hug
$('#vault-create-btn').click(function() {
    var huntName=$('#huntName').val();
    var startingCity=$('#startingCity').val();
    var numPaces=$('#numPaces').val();
    var url="api/vault/" + huntName + "/" + startingCity +"/" + numPaces;
    var method = 'PUT';
    if ( huntName === "" || startingCity === "" || numPaces === "") {
        $('#response-body-vault').html('Please enter a "Hunt Name", "Starting City", and a "Number of Paces".');
    } else {
        console.log("Calling: " + method + " " + url);
        $('#response-body-vault').html('Calling REST endpoint');
        $.ajax({
            type: method,
            url: url,
            success: function(){
                $('#response-body-vault').html("ok");
            },
            error: function(xhr, status, error) {
                console.error("status: : " + status);
                console.error("error: " + error);
                console.error("xhr: " + xhr);
                $('#response-body-vault').html("ERROR! Is the vault service bound?");
            },
            timeout: 7000
        });
    }
});

$('#vault-get-btn').click(function() {
    var huntName=$('#huntName').val();
    var url="api/vault/" + huntName;
    var method = 'GET';
    if ( huntName === "" ) {
        $('#response-body-vault').html('Please enter a "Hunt Name".');
    } else {
        console.log("Calling: " + method + " " + url);
        $('#response-body-vault').html('Calling REST endpoint');
        $.ajax({
            type: method,
            url: url,
            success: function(result){
                var ret = "<table><tr><th>Vault Response</th></tr>";
                ret += "<tr><td>"+syntaxHighlight(result)+"</td></tr>";
                ret += "</table>";
                $('#response-body-vault').html(ret);
            },
            error: function(xhr, status, error) {
                console.error("status: : " + status);
                console.error("error: " + error);
                console.error("xhr: " + xhr);
                $('#response-body-vault').html("ERROR! Is the vault service bound?");
            },
            timeout: 7000,
            dataType: 'json'
        });
    }
});

$('#vault-create-wing-hunt').click(function() {
    var url="api/vault/createwinghunt";
    var method = 'PUT';
    console.log("Calling: " + method + " " + url);
    $('#response-body-vault').html('Calling REST endpoint');
    $.ajax({
        type: method,
        url: url,
        success: function(){
            $('#response-body-vault').html("ok");
        },
        error: function(xhr, status, error) {
                console.error("status: : " + status);
                console.error("error: " + error);
                console.error("xhr: " + xhr);
                $('#response-body-vault').html("ERROR! Is the vault service bound?");
        },
        timeout: 7000,
    });
});

$('#vault-list-btn').click(function() {
    var url="api/vault/list";
    var method = 'GET';
    console.log("Calling: " + method + " " + url);
    $('#response-body-vault').html('Calling REST endpoint');
    $.ajax({
        type: method,
        url: url,
        success: function(result){
            var ret = "<table><tr><th>Hunt Names</th></tr>";
            for (var i in result) {
                ret += "<tr><td>"+result[i]+"</td></tr>";
            }
            ret += "</table>";
            $('#response-body-vault').html(ret);
        },
        error: function(xhr, status, error) {
                console.error("status: : " + status);
                console.error("error: " + error);
                console.error("xhr: " + xhr);
                $('#response-body-vault').html("ERROR! Is the vault service bound?");
        },
        timeout: 7000,
        dataType: 'json'
    });
});

$('#vault-delete-btn').click(function() {
    var huntName=$('#huntName').val();
    var url="api/vault/" + huntName;
    var method = 'DELETE';
    if ( huntName === "" ) {
        $('#response-body-vault').html('Please enter a "Hunt Name".');
    } else {
        console.log("Calling: " + method + " " + url);
        $('#response-body-vault').html('Calling REST endpoint');
        $.ajax({
            type: method,
            url: url,
            success: function(){
                $('#response-body-vault').html("ok");
            },
            error: function(xhr, status, error) {
                console.error("status: : " + status);
                console.error("error: " + error);
                console.error("xhr: " + xhr);
                $('#response-body-vault').html("ERROR! Is the vault service bound?");
            },
            timeout: 7000
        });
    }
});

//https://stackoverflow.com/a/7220510
function syntaxHighlight(json) {
    if (typeof json !== 'string') {
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
        } //else if ('"'.test(match)) {
          //  cls = syntaxHighlight(match)
        //}
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
var localhost = window.location.hostname;
var restexamples = '<h3>Vault</h3><hr>';
restexamples += 'curl --request PUT "https://' + localhost + '/api/vault/{huntName}/{startingCity}/{numberOfPaces}'+'<br>';
restexamples += 'curl --request GET "https://' + localhost + '/api/vault/{huntName}"<br>';
restexamples += 'curl --request DELETE "https://' + localhost + '/api/vault/{huntName}"<br>';
restexamples += 'curl --request GET "https://' + localhost + '/api/vault/list"<br>';
restexamples += 'curl --request GET "https://' + localhost + '/api/vault/setgethealthcheck"<br>';
$('#response-body-rest').append(restexamples);
