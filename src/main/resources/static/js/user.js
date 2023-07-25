'use strict';

function showCurrentUser() {
    $.get(`/api/user`, function (data) {

        let userTbody =
            "<tr><td>" + data.id + "</td>" +
            "<td>" + data.name + "</td>" +
            "<td>" + data.surname + "</td>" +
            "<td>" + data.age + "</td>" +
            "<td>" + data.email + "</td>" +
            "<td>" + data.roleToString + "</td></tr>";

        $("#tBodyUser").html(userTbody);
    })
}

function currentEmail() {
    $.get(`/api/user`, function (data) {
        let authUserEmail = data.email;
        $("#currentUserEmail").html(authUserEmail);
    })
}

function currentRoles() {
    $.get(`/api/user`, function (data) {

        let authUserRoles = data.roleToString;
        $("#currentUserRoles").html(authUserRoles);
    })
}

$(document).ready(function () {
    showCurrentUser();
    currentEmail();
    currentRoles();
})