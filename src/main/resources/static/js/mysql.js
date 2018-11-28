//author Michael Hug
$('#mysql-create-btn').click(function() {
    var name=$('#name').val().trim();
    var specialty=$('#specialty').val().trim();
    var method = 'POST';
    if( name === "" || specialty === "" ) {
        $('#response-body-mysql').html('Please enter something into name and specialty');
    } else {
        var singer=$('#singer').is(':checked');
        var url="api/mysql/" + name + "/" + specialty + "/" + singer;
        console.log("Calling: " + method + " " + url);
        $('#response-body-mysql').html('Calling REST endpoint');
        $.ajax({
            type: method,
            url: url,
            success: function(){
                $('#response-body-mysql').html("ok");
            },
            error: function(xhr, status, error) {
                console.error("status: : " + status);
                console.error("error: " + error);
                console.error("xhr: " + xhr);
                $('#response-body-mysql').html("ERROR! Is the mysql service bound?");
            },
            timeout: 7000
        });
    }
});

$('#mysql-update-btn').click(function() {
    var id=$('#id').val();
    var name=$('#name').val().trim();
    var specialty=$('#specialty').val();
    var method = 'PUT';
    if( name === "" || specialty === "" || id === "") {
        $('#response-body-mysql').html('Please enter something into id, name, and specialty');
    } else {
        var singer=$('#singer').is(':checked');
        var url="api/mysql/" + id + "/" + name + "/" + specialty + "/" + singer;
        console.log("Calling: " + method + " " + url);
        $('#response-body-mysql').html('Calling REST endpoint');
        if ( id === "" ) {
            $('#response-body-mysql').html('Please enter an id.');
        } else {
            $.ajax({
                type: method,
                url: url,
                success: function(){
                    $('#response-body-mysql').html("ok");
                },
                error: function(xhr, status, error) {
                    console.error("status: : " + status);
                    console.error("error: " + error);
                    console.error("xhr: " + xhr);
                    $('#response-body-mysql').html("ERROR! Is the mysql service bound?");
                },
                timeout: 7000
            });
        }
    }
});

$('#mysql-createthegreatfuldead-btn').click(function() {
    var url="/api/mysql/GodBlessTheGreatfulDead";
    var method = 'POST';
    console.log("Calling: " + method + " " + url);
    $('#response-body-mysql').html('Calling REST endpoint');
    $.ajax({
        type: method,
        url: url,
        success: function(){
            $('#response-body-mysql').html("ok");
        },
        error: function(xhr, status, error) {
            console.error("status: : " + status);
            console.error("error: " + error);
            console.error("xhr: " + xhr);
            $('#response-body-mysql').html("ERROR! Is the mysql service bound?");
        },
        timeout: 7000
    });
});

$('#mysql-readbyid-btn').click(function() {
    var id=$('#id').val();
    var url="api/mysql/" + id;
    var method = 'GET';
    if ( id === "" ) {
        $('#response-body-mysql').html('Please enter an id.');
    } else {
        console.log("Calling: " + method + " " + url);
        $('#response-body-mysql').html('Calling REST endpoint');
        $.ajax({
            type: method,
            url: url,
            success: function(result){
		var ret = "<table><tr><th>id</th><th>Name</th><th>Specialty</th><th>Singer</th></tr>";
            	if (result) {
			ret += "<tr><td>"+result["id"]+"</td><td>"+result["name"]+"</td><td>"+result["specialty"]+"</td><td><input type='checkbox' disabled ";
			ret += "checked";
			ret +="></td></tr>";
            	}
            ret += "</table>";
            $('#response-body-mysql').html(ret);
            },
            error: function(xhr, status, error) {
                console.error("status: : " + status);
                console.error("error: " + error);
                console.error("xhr: " + xhr);
                $('#response-body-mysql').html("ERROR! Is the mysql service bound?");
            },
	    datatype: 'json',
            timeout: 7000
        });
    }
});

$('#mysql-readall-btn').click(function() {
    var url="api/mysql/*";
    var method = 'GET';
    console.log("Calling: " + method + " " + url);
    $('#response-body-mysql').html('Calling REST endpoint');
        $.ajax({
        type: method,
        url: url,
        success: function(result){
            var ret = "<table><tr><th>id</th><th>Name</th><th>Specialty</th><th>Singer</th></tr>";
            for (var i in result) {
                ret += "<tr><td>"+result[i]["id"]+"</td><td>"+result[i]["name"]+"</td><td>"+result[i]["specialty"]+"</td><td><input type='checkbox' disabled ";
		if(result[i]["singer"]) {
			ret += "checked";
		}
		ret +="></td></tr>";
            }
            ret += "</table>";
            $('#response-body-mysql').html(ret);
        },
        error: function(xhr, status, error) {
            console.error("status: : " + status);
            console.error("error: " + error);
            console.error("xhr: " + xhr);
            $('#response-body-mysql').html("ERROR! Is the mysql service bound?");
        },
        datatype: 'json',
        timeout: 7000
    });
});

$('#mysql-deletebyid-btn').click(function() {
    var id=$('#id').val();
    var url="api/mysql/" + id;
    var method = 'DELETE';
    if ( id === "" ) {
        $('#response-body-mysql').html('Please enter an id.');
    } else {
        console.log("Calling: " + method + " " + url);
        $('#response-body-mysql').html('Calling REST endpoint');
        $.ajax({
            type: method,
            url: url,
            success: function(){
            	$('#response-body-mysql').html("ok");
            },
            error: function(xhr, status, error) {
                console.error("status: : " + status);
                console.error("error: " + error);
                console.error("xhr: " + xhr);
                $('#response-body-mysql').html("ERROR! Is the mysql service bound?");
            },
            timeout: 7000
        });
    }
});

$('#mysql-deleteall-btn').click(function() {
    var url="api/mysql/*/";
    var method = 'DELETE';
    console.log("Calling: " + method + " " + url);
    $('#response-body-mysql').html('Calling REST endpoint');
        $.ajax({
        type: method,
        url: url,
        timeout: 7000,
        success: function(){
            $('#response-body-mysql').html("ok");
        },
        error: function(xhr, status, error) {
            console.error("status: : " + status);
            console.error("error: " + error);
            console.error("xhr: " + xhr);
            $('#response-body-vault').html("ERROR! Is the mysql service bound?");
        }
    });
});

var localhost = window.location.hostname;
var restexamples = '<h3>MySql</h3><hr>';
restexamples += 'curl --request POST "https://' + localhost + '/api/mysql/{name}/{specialty}/{singer}"<br>';
restexamples += 'curl --request PUT "https://' + localhost + '/api/mysql/{id}/{name}/{specialty}/{isSinger}"<br>';
restexamples += 'curl --request POST "https://' + localhost + '/api/mysql/GodBlessTheGreatfulDead"<br>';
restexamples += 'curl --request GET "https://' + localhost + '/api/mysql/{id}"<br>';
restexamples += 'curl --request GET "https://' + localhost + '/api/mysql/*"<br>';
restexamples += 'curl --request DELETE "https://' + localhost + '/api/mysql/{id}"<br>';
restexamples += 'curl --request DELETE "https://' + localhost + '/api/mysql/*"<br>';
restexamples += 'curl --request GET "https://' + localhost + '/api/mysql/setgethealthcheck"<br>';
$('#response-body-rest').append(restexamples);