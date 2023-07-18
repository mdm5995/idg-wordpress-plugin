jQuery(function($) {
	// upload button onClick
	$('body').on('click', '.idg-upload', function(event) {
		event.preventDefault();

		const button = $(this);

		// assumes html of two buttons and then hidden input
		// input => input => get val of hidden input
		const imageId = button.next().next().val();

		const customUploader = wp.media({
			title: 'Category Image',
			library: {
				type: 'image'
			},
			button: {
				text: 'Set category image'
			},
			multiple: false
		}).on('select', () => {
			const attachment = customUploader.state().get('selection').first().toJSON();
			button.removeClass('button').html('<img src="' + attachment.url + '">');
			button.next().show();
			button.next().next().val(attachment.id);
		});

		customUploader.on('open', () => {
			if (imageId) {
				const selection = customUploader.state().get('selection');
				attachment = wp.media.attachment(imageId);
				attachment.fetch();
				selection.add(attachment ? [attachment] : []);
			};
		});

		customUploader.open();

	});

	$('body').on('click', '.idg-remove', (event) => {
		event.preventDefault();
		const button = $(this);
		button.next().val(''); // empty hidden field
		button.hide().prev().addClass('button').html('Upload image');
	});

});
