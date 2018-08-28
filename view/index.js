const headers = {headers: {'Accept':'application/json', 'Content-Type':'application/json'}};
const apigClient = apigClientFactory.newClient();

function display_faces(faces) {
	
	for (var i = faces.length - 1; i >= 0; i--) {
		var html = "<div class='col-sm-4'><img class='guess-face' id='"+faces[i].id+"' src='https:"+faces[i].image_url+"'></div>";
		$('#bottom-display').append(html);
	}

	enable_face_guessing('guess-face');

}

function display_guessing_name(name) {

	$('#top-display').html('<h3> Who is <span id="first_name">' + name.first_name + '</span> <span id="last_name">' + name.last_name + '</span>?</h3>');
}

function enable_face_guessing(class_name) {
	$('.' + class_name).click(function(){
		let name_to_guess = {first_name:$('#first_name').html(), last_name: $('#last_name').html()};
		let id = this.id;
		let body = JSON.stringify({id: id, name: name_to_guess});
		apigClient.gameSixFacesPost({}, body, headers)
			.then(function (result) {				
				guess(id, result.data);				
			})
	});
}


function enable_job_title_guessing(class_name) {
	$('.' + class_name).click(function(){
		let job_title_to_guess = $('#job_title').html();
		let id = this.id;
		let body = JSON.stringify({id: id, job_title: job_title_to_guess});
		$.ajax({
			url: 'https://me2ock8fdc.execute-api.us-east-1.amazonaws.com/dev/game/job-title'
			, type: "POST"
			, method: "POST"
			, contentType: "application/json"
			, dataType: "json"
			, crossDomain: true
			, data: body
			, success: function(result){
				console.log(result)
				guess(id, result);
			}
		});
		// apigClient.gameJobTitlePost({}, body, headers)
		// 	.then(function (result) {
		// 		console.log(result.data);
		// 		guess(id, result.data);
				
		// 	})

	});
}


function guess(id, is_correct) {
	if (is_correct) {
		$('#'+id).parent().append('<img class="right-guess" src="green-check.png">')
	} else {
		$('#'+id).parent().append('<img class="wrong-guess" src="red-x.png">')
	}
	
}


function face_game(){
	clear_displays();
	apigClient.gameSixFacesGet({}, {}, headers)
		.then(function (result) {
			display_guessing_name(result.data.name_to_guess);
			display_faces(result.data.faces);
		})
		.catch(function(error){
			console.log(error);
		});
}

function display_job_title(job_title){
	$('#top-display').html('<h3> Who is a <span id="job_title">' + job_title + '</span>?</h3>');
}

function display_people(people) {
	
	for (var i = people.length - 1; i >= 0; i--) {
		var html = "<div class='col-sm-4'><img class='guess-face' id='"+people[i].id+"' src='https:"+people[i].image_url+"'><p><i>"+people[i].first_name+" " +people[i].last_name+ "</i></p></div>";
		$('#bottom-display').append(html);
	}

	enable_job_title_guessing('guess-face');

}

function job_title_game(){
	clear_displays();
	apigClient.gameJobTitleGet({}, {}, headers)
	.then(function(result){
		// console.l
		display_job_title(result.data.job_title_to_guess);
		display_people(result.data.people);
	}).catch(function (error) {
		console.log(error);
	})
}

function clear_displays() {
	$('#top-display').html("");
	$('#bottom-display').html("");
}


$('#face_game').click(function () {
	face_game();
});


$('#job_title_game').click(function(){
	job_title_game();
});

