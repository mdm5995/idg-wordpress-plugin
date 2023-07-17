jQuery(document).ready(function($) {
	// instantiate Media Uploader variable
	let mediaUploaderFrame;

	$('#upload-image-button').click((event) => {
		event.preventDefault();

		if (mediaUploaderFrame) {
			mediaUploaderFrame.open();
			return;
		};

		mediaUploaderFrame = wp.media({
			title: 'Change Category Image',
			button: {
				text: 'Set Category Image'
			},
			multiple: false
		});

		mediaUploaderFrame.on('select', () => {
			let attachmentImage = mediaUploaderFrame.state().get('selection').first().toJSON();

			console.log(attachmentImage);
			$('#txt_upload_image').val(attachmentImage.url);
		});

		mediaUploaderFrame.open();
	});
});
