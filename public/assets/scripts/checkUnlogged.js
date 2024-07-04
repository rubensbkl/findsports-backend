// Verificar se o usuário está logado
$(document).ready(function() {

    const userToken = sessionStorage.getItem('currentUserToken');

    if (!userToken) {
        console.log('Welcome bro, you are not logged in');
    } else {
        redirectToDashboard();
    }
});

function redirectToDashboard() {
    window.location.href = '../index.html'; // substitua por sua página de login
}