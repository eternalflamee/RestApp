package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Optional;

//@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserRestController {
    private final UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Optional<User>> getCurrentUser(Principal principal) {
        return new ResponseEntity<>(userService.findByEmail(principal.getName()), HttpStatus.OK);
    }
}