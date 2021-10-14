package com.api.spendash.controller;

import com.api.spendash.model.User;
import com.api.spendash.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/user")
    public ResponseEntity<?> createUser(@RequestParam("userName") String userName,
                                        @RequestParam("name") String name,
                                        @RequestParam("address") String address,
                                        @RequestParam("contact") int contact,
                                        @RequestParam("role") String role,
                                        @RequestParam("password") String password)
    {
        User user = new User(userName, name, address, contact, role, password);
        return new ResponseEntity<>(service.createUser(user), HttpStatus.CREATED);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        return new ResponseEntity<>(service.getUserById(id), HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(service.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/user/role/{role}")
    public ResponseEntity<?> getUsersByRole(@PathVariable String role) {
        return new ResponseEntity<>(service.getUsersByRole(role), HttpStatus.OK);
    }

    @PutMapping("/user")
    public ResponseEntity<?> updateUser(@RequestParam("userName") String userName,
                                        @RequestParam("name") String name,
                                        @RequestParam("address") String address,
                                        @RequestParam("contact") int contact,
                                        @RequestParam("role") String role,
                                        @RequestParam("password") String password)
    {
        User user = new User(userName, name, address, contact, role, password);
        return new ResponseEntity<>(service.updateUser(user), HttpStatus.OK);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteById(@PathVariable String id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> login(@RequestParam("userName") String userName,
                                   @RequestParam("password") String password)
    {
        return new ResponseEntity<>(service.login(userName, password), HttpStatus.OK);
    }
}
