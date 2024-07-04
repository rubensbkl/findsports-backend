$(document).ready(function() {
    const userToken = sessionStorage.getItem('currentUserToken');

    if (!userToken) {
        $('.disable').each(function() {
            $(this).attr('id', 'null');
            $(this).attr('href', '#');
        });
    }
});