function dialog(titre, message){

	if (!$('#dataConfirmModal').length) {
		$('body').append('<div id="dataConfirmModal" class="modal" role="dialog" aria-labelledby="dataConfirmLabel" aria-hidden="true">'+
		'<div class="modal-dialog">'+
		'<div class="modal-content">'+
		'<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h3 id="dataConfirmLabel">'+ titre +'</h3></div>'+
		'<div class="modal-body"><textarea style="width:100%; height:100px; max-width:100%;min-width:100%;">'+ message +'</textarea></div>'+
		'<div class="modal-footer"><button class="btn" data-dismiss="modal" aria-hidden="true">Fermer</button></div></div></div></div>');
	}
	$('#dataConfirmModal').find('.modal-body').text($(this).attr('data-confirm'));
	//$('#dataConfirmModal').modal({show:true});
}