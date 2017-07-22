$('#states').change(function(){
	$.getJSON(
		'fetch.php',
		'state='+$('#states').val(),
		function(result){
			$('#districts').empty();
			$('#court').empty();
			$('#cases').empty();
			$('#districts').append('<option>'+'Districts'+'</option>');
			$('#court').append('<option>'+'Court'+'</option>');
			$('#cases').append('<option>'+'Cases'+'</option>');
			$.each(result.result, function(){
				$('#districts').append('<option>'+this['item']+'</option>');
			});
		}
	);
});
$('#districts').change(function(){
	$.getJSON(
		'fetch.php',
		'state='+$('#states').val()+'&'+'district='+$('#districts').val(),
		function(result){
			$('#court').empty();
			$('#court').append('<option>'+'courts'+'</option>');
			$('#cases').empty();
			$('#cases').append('<option>'+'Cases'+'</option>');
			$.each(result.result, function(){
				$('#court').append('<option>'+this['item']+'</option>');
			});
		}
	);
});
$('#court').change(function(){
	$.getJSON(
		'fetch.php',
		'state='+$('#states').val()+'&'+'district='+$('#districts').val()+'&'+'court='+$('#court').val(),
		function(result){
			$('#cases').empty();
			$('#cases').append('<option>'+'Cases'+'</option>');
			$.each(result.result, function(){
				$('#cases').append('<option>'+this['item']+'</option>');
			});
		}
	);
});