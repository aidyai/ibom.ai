// changing keyboard characters
function keysChange(){

	$('#keyboard ul li .on').toggle();

	$('#keyboard ul li .off').toggle();
	$('#keyboard ul li .off').toggleClass('active');

	$('.keyline2, .keyline3').toggleClass('no-padding')

	$('#uppercase').toggle();

	$('.num-key').toggle();
	$('#delete').toggleClass('big-del');

};

//uppercasing characters
function uppercaser() {
	$('#keyboard').toggleClass('uppercase');

	$('#uppercase .on').toggle();
	$('#uppercase .off').toggle();
}

$('#keyboard li').on('click', function(){

	var screen = $('#screen');
	//screen.focus();

	var key = $(this).find('span');
  var keyvalue = key.html();
  
  if ($('#keyboard').hasClass('uppercase')) {
		keyvalue = keyvalue.toUpperCase();
	}

	if ($(this).hasClass('change-keys')) {

		keysChange();
	}

	//backspace function
	else if($(this).attr('id') == 'delete'){
		
		screen.html((screen.html().slice(0, -1)));
    return;
	}

	//for first faze characters
	else if (key.css("display") == "block") {

		screen.append(keyvalue);
	}

	//for second faze characters
	else{			
		screen.append($(this).find('.active').html());
	}

	//for spacing
	if ($(this).hasClass('space')) {
		screen.append(' ');
	}

});