$('.upload-btn').on('click', function (){
    $('#upload-input').click();
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
});

$('#upload-input').on('change', function(){
	
	/*store all the files*/
	var files = $(this).get(0).files;

	/*Make sure file array isn't empty*/
	if (files.length > 0){
		/*create a FormData object that can be used much more easily*/
		var formData = new FormData();

		/*File processing*/
		for (var i = 0; i < files.length; i++){
			var file = files[i];

			/*append file and filename to the formData object*/
			formData.append('uploads[]', file, file.name);
		}

		$.ajax({
			url: '/upload',
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			success: function(data){
				console.log('Uploaded Successfully!\n' + data);
			},
			/*The actual XMLHttpRequest*/
			xhr: function(){

				var xhr = new XMLHttpRequest();

				/*listen on the "Progress event"*/
				xhr.upload.addEventListener('progress', function(evt) {
					/*Check that its computable*/
					if (evt.lengthComputable) {
						/*Gets the percentage of the event that is complete*/
						var percentComplete = parseInt(evt.loaded / evt.total * 100);

						/*Updates progress bar text and width*/
						$('.progress-bar').text(percentComplete + '%');
						$('.progress-bar').width(percentComplete + '%');

						// once the upload reaches 100%, set the progress bar text to done
						if (percentComplete === 100) {
							$('.progress-bar').html('Done');
						}

					}

				}, false);

				return xhr;
			}
		});
	}
});