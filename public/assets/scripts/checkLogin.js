// Verificar se o usuário está logado
$(document).ready(function() {

    const userToken = sessionStorage.getItem('currentUserToken');

    if (!userToken) {
        redirectToLogin();
    } else {
        console.log('User is logged in');
        setup();
    }
});

function redirectToLogin() {
    window.location.href = '../pages/landing.html'; // substitua por sua página de login
}