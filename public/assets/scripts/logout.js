$('#logoutButton').click(function() {
    // Limpa o token de usuário armazenado
    sessionStorage.removeItem('currentUserToken');

    // Redireciona o usuário para a página de login
    window.location.href = '../pages/landing.html';
});