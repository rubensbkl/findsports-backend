// Backend URL
const serverURL = 'http://localhost:3000';


// Dropdown menu
let userMenu = document.getElementById("userMenu");
let userNotification = document.getElementById("userNotification");

function toggleUserMenu() {
    if (!userNotification.classList.contains("active")) {
        userMenu.classList.toggle("active");
    }
}

function toggleNotificationMenu() {
    if (!userMenu.classList.contains("active")) {
        userNotification.classList.toggle("active");
    }
}

// Logout
$('#logoutButton').click(function() {
    // Limpa o token de usuário armazenado
    sessionStorage.removeItem('currentUserToken');

    // Redireciona o usuário para a página de login
    window.location.href = '../pages/landing.html';
});

// Enviar notificação para o usuário
$('#sendNotification').click(function() {
    $.ajax({
        url: `${serverURL}/send-notification`,
        type: 'POST',
        data: JSON.stringify({
            id: 1,
            content: "Você recebeu uma notificação de Fu",
            sender: 1,
            receiver: 2
        }),
        contentType: 'application/json',
        success: function(response) {
            console.log('Notification sent successfully:', response);
        },
        error: function(error) {
            console.error('Error sending notification:', error);
        }
    });
});

$(document).ready(function() {
    // Assuming currentUserToken is stored in sessionStorage
    var currentUserToken = sessionStorage.getItem('currentUserToken');

    $.ajax({
        url: `${serverURL}/notifications`,
        type: 'GET',
        contentType: 'application/json',
        data: {
            token: currentUserToken
        },
        success: function(response) {
            console.log('Notifications fetched successfully:', response);
            // Process team notifications
            response.team.forEach(function(notification) {
                var notificationElement = `
                    <div class="notification">
                        <p class="content">${notification.content}</p>
                        <button class="button2">Aceitar</button>
                    </div>
                `;
                $('#notificationContainer').append(notificationElement);
            });
            // Process event notifications
            response.event.forEach(function(notification) {
                var notificationElement = `
                    <div class="notification">
                        <p class="content">${notification.content}</p>
                        <button class="button2">Aceitar</button>
                    </div>
                `;
                $('#notificationContainer').append(notificationElement);
            });
        },
        error: function(error) {
            console.error('Error fetching notifications:', error);
        }
    });
});







function setup() {
    // Define o nome de usuário na navegação
    $('#nav-username').text('@' + localStorage.getItem('currentUserUsername'));
    
    // Obtém o ID do usuário de localStorage
    var userId = parseInt(sessionStorage.getItem('currentUserToken'), 10);
    
    // Encontra o link do perfil do usuário e atualiza seu href
    var userProfileLink = document.querySelector('#myprofile');
    if (userProfileLink) {
        userProfileLink.href = `./pages/user-profile.html?id=${userId}`;
    }
}