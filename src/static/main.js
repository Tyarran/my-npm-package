import {bootstrap} from 'bootstrap';
import $ from 'jquery';

function showModal() {
    var $modalBtn = $('#modalBtn');
    var $modal = $('#modal').modal();   

    $modalBtn.on('click', function(event){
        $modal.modal('show');
    });
}
