$(document).ready(function() {
    $.ajax({
        url: `${serverURL}/events`,
        type: 'GET',
        success: function(events) {
            events.forEach(function(event) {
                var eventElement = `
                    <div class="list-container" data-id="${event.id}">
                        <h2 class="arena-name">${event.name}</h2>
                        <div class="sport">${event.sport}</div>
                        <div>${event.arena}</div>
                        <div class="column">
                            <div class="primary black">Começa</div>
                            <div>${event.datetime}</div>
                        </div>
                        <div>${event.subs.length}/${event.maxSubs}</div>
                    </div>
                `;
                $('#events').append(eventElement);

                
            });

            // Adicione um evento de clique a cada elemento de usuário
            $('.list-container').click(function() {
                var eventId = $(this).data('id');
                window.location.href = `/pages/event-profile.html?id=${eventId}`;
            });
        },
        error: function(error) {
            console.error('Erro ao buscar events:', error);
        }
    });
});

document.querySelector('#search-input').addEventListener('input', filterList);

function filterList() {
    const searchInput = document.querySelector('#search-input').value.toLowerCase();
    const listItems = document.querySelectorAll('.list-container');

    listItems.forEach(item => {
        // Assuming you want to compare the text content of the item
        let text = item.textContent || item.innerText; // This gets the text content of the item

        if (text.toLowerCase().includes(searchInput)) { // Use searchInput directly
            item.style.display = ''; // Consider using 'block' or 'flex' depending on your layout
        } else {
            item.style.display = 'none';
        }
    });
}