$(document).ready(() => {
    $('#convert').click(() => {
        $.ajax({
            url: '/api/convert',
            type: 'get',
            data: $('#convertForm').serialize(),
            success: function(data){
                $('#result').html(data.string || '');
                $('#response').html('<code>' + JSON.stringify(data) + '</code>');
            }
        })
    });
});