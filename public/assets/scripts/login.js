function loginUser(username, password) {
    $.ajax({
        url: `${serverURL}/user-login`,
        type: 'POST',
        data: JSON.stringify({
            username: username,
            password: password,
        }),
        contentType: 'application/json',
        success: function(response) {
            console.log('Login efetuado com sucesso');
            sessionStorage.setItem('currentUserToken', response.token);
            localStorage.setItem('currentUserUsername', response.username);
            window.location.href = '../index.html';
        },
        error: function(error) {
            console.error('Erro ao fazer login:', error);
        }
    });
}

// Cadastrar usuário
$('#registerForm').submit(function(event) {
    event.preventDefault();
  
    let username = $("#regUsername").val();
    let password = $("#regPassword").val();
  
    $.ajax({
        url: `${serverURL}/user-register`,
        type: 'POST',
        data: JSON.stringify({
            username: username,
            password: password,
        }),
        contentType: 'application/json',
        success: function(response) {
            console.log('Usuário Cadastrado:', response);
            // Loga o usuário automaticamente após o registro
            loginUser(username, password);
        },
        error: function(error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    });
});

// Login
$('#loginForm').submit(function(event) {
    event.preventDefault();
  
    let username = $("#logUsername").val();
    let password = $("#logPassword").val();
  
    loginUser(username, password);
});