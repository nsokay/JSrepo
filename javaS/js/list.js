function loadUsers() {
    return fetch('http://localhost:8080/students')
        .then(function (response) {
            return response.json();
        });
}

function drawUserList() {
    loadUsers().then(function (users) {
        var userListTemplate = Handlebars.compile(document.querySelector('#user-list').innerHTML);
        var userTemplate = Handlebars.compile(document.querySelector('#user').innerHTML);

        var userList = '';
        users.forEach(function (user) {
            userList += userTemplate(user);
        });

        var userList = userListTemplate({
            body: userList
        });

        var userListContainer = document.createElement('div');
        userListContainer.innerHTML = userList;
        document.body.appendChild(userListContainer);
    });
}

function deleteUser(id) {

    fetch("http://localhost:8080/students/" + id,
        {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        .then(function () {
            var userList = document.querySelector(".user-list");
            document.body.removeChild(userList.parentNode);
            drawUserList();
        });
}

function handleSubmit(event) {

    var pp = {
        firstName: document.user.name.value,
        lastName: document.user.lastname.value
    };

    fetch("http://localhost:8080/students",
        {
            method: "POST",
            body: JSON.stringify(pp),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        .then(function () {
            var userList = document.querySelector(".user-list");
            document.body.removeChild(userList.parentNode);
            drawUserList();
        });

    event.preventDefault();
}
drawUserList();