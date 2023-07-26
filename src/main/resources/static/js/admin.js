'use strict';

// usersTable
const tbody = $('#tBodyAdmin');
getTableUser()

function getTableUser() {

    tbody.empty()

    fetch("http://localhost:8080/api/users")

        .then(res => res.json())
        .then(js => {
            js.forEach(item => {
                const users = `$(
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.surname}</td>
                        <td>${item.age}</td>
                        <td>${item.email}</td>
                        <td>${item.roleToString}</td>
                        <td>
                            <button type="button" class="btn btn-info btn-sm" data-toggle="modal"
                            data-target="#edit" onclick="editModal(${item.id})">
                            Edit
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger btn-sm" data-toggle="modal"
                            data-target="#delete" onclick="deleteModal(${item.id})">
                                Delete
                            </button>
                        </td>
                    </tr>)`;
                tbody.append(users)
            })
        })
}

// modal
async function getOneUser(id) {
    let url = "http://localhost:8080/api/users/" + id;
    let response = await fetch(url);
    return await response.json();
}

async function openAndFillInTheEditModal(form, modal, id) {
    modal.show();
    let user = await getOneUser(id);
    form.id.value = user.id;
    form.name.value = user.name;
    form.surname.value = user.surname;
    form.age.value = user.age;
    form.email.value = user.email;
    form.password.value = user.password;
    form.roles.value = user.roles;

    let roleCurrent = user.roleToString;

    $("#rolesEdit option").filter(function() {
        return roleCurrent.indexOf($(this).text()) !== -1;
    }).prop('selected', true);
}

async function openAndFillInTheDeleteModal(form, modal, id) {
    modal.show();
    let user = await getOneUser(id);
    form.id.value = user.id;
    form.name.value = user.name;
    form.surname.value = user.surname;
    form.age.value = user.age;
    form.email.value = user.email;
    form.roles.value = user.roles;

    let roleCurrent = user.roleToString;
    console.log(roleCurrent);

    $("#rolesDelete option").filter(function() {
        return roleCurrent.indexOf($(this).text()) !== -1;
    }).prop('selected', true);
}

//editModal
let formEdit = document.forms["formEdit"];
editUser();

async function editModal(id) {
    const modal = new bootstrap.Modal(document.querySelector('#edit'));
    await openAndFillInTheEditModal(formEdit, modal, id);
}

function editUser() {
    formEdit.addEventListener("submit", event => {
        event.preventDefault();

        let roles = $("#rolesEdit").val()

        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === 'ROLE_ADMIN') {
                roles[i] = {
                    'id': 1,
                    'role': 'ROLE_ADMIN',
                    "authority": "ROLE_ADMIN"
                }
            }
            if (roles[i] === 'ROLE_USER') {
                roles[i] = {
                    'id': 2,
                    'role': 'ROLE_USER',
                    "authority": "ROLE_USER"
                }
            }
        }

        fetch("http://localhost:8080/api/users/" + formEdit.id.value, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: formEdit.id.value,
                name: formEdit.name.value,
                surname: formEdit.surname.value,
                age: formEdit.age.value,
                email: formEdit.email.value,
                password: formEdit.password.value,
                roles: roles

            })
        }).then(() => {
            $('#closeEdit').click();
            getTableUser()
        });
    });
}

//deleteModal
let deleteForm = document.forms["formDelete"]
deleteUser()

async function deleteModal(id) {
    const modal = new bootstrap.Modal(document.querySelector('#delete'));
    await openAndFillInTheDeleteModal(deleteForm, modal, id);
}

function deleteUser() {
    deleteForm.addEventListener("submit", event => {
        event.preventDefault();
        fetch("http://localhost:8080/api/users/" + deleteForm.id.value, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            $('#closeDelete').click();
            getTableUser();
        });
    });
}

//NewUser
let form = document.forms["new"];
createNewUser()

function createNewUser() {
    form.addEventListener("submit", event => {
        event.preventDefault();
        let roles = [];
        for (let i = 0; i < form.roles.options.length; i++) {
            if (form.roles.options[i].selected) roles.push({
                id: form.roles.options[i].value,
                role: "ROLE_" + form.roles.options[i].text
            });
        }

        fetch("http://localhost:8080/api/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: form.name.value,
                surname: form.surname.value,
                age: form.age.value,
                email: form.email.value,
                password: form.password.value,
                roles: roles
            })
        }).then(() => {
            form.reset();
            $('#users_table-tab').click();
            getTableUser()
        });
    });
}