var bestFriend = {
	diff: 100,
	name: "",
	image: ""
};


$('#submitBtn').on('click', function () {
    var ans1 = $('#quest1').val().trim();
    var ans2 = $('#quest2').val().trim();
    var ans3 = $('#quest3').val().trim();
    var ans4 = $('#quest4').val().trim();
    var ans5 = $('#quest5').val().trim();
    var ans6 = $('#quest6').val().trim();
    var ans7 = $('#quest7').val().trim();
    var ans8 = $('#quest8').val().trim();
    var ans9 = $('#quest9').val().trim();
    var ans10 = $('#quest10').val().trim();

    var newUser = {
        name: 'user_name',
        photo: 'no_image',
        scores: [ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10]
    };

    findFriend(newUser.scores);

    setTimeout(UserPost, 1500);
    function UserPost() {
        $.post({ url: '/api/friends', contentType: 'application/json' }, JSON.stringify(newUser));
    }
});

/*************************************************************************************************/

function findFriend(scores) {

	$.get('/api/friends', (friends) => {

		var count = 0;
		for (var i = 0; i < friends.length; i++) {
			ScoreDiff(scores, friends[i]);
			count++;		
		}		

		if (count === friends.length) {
			$('#friendName').text(bestFriend.name);
			$('#friendImg').attr('src', bestFriend.image);
			$('#myModal').modal('toggle');
		}
	});	
}


function ScoreDiff(user, friend) {

    var diff = 0;
    var count = 0;

    for (var i = 0; i < 10; i++) {
        diff += Math.abs(user[i] - friend.scores[i]);
        count++;
    }

    if (count === 10) {
        if (diff < bestFriend.diff) {
            bestFriend.diff = diff;
            bestFriend.name = friend.name;
            bestFriend.image = friend.photo;
        }
    }
}