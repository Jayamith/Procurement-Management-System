package com.api.spendash;

import com.api.spendash.model.User;
import com.api.spendash.repository.UserRepository;
import com.api.spendash.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class UserTest {

    @Autowired
    private UserService service;

    @MockBean
    private UserRepository repository;

    @Test
    public void getUsersTest() {
        when(repository.findAll()).thenReturn(Stream
        .of(new User("john", "John Doe", "Colombo", 743243876, "supplier", "1234"),
                new User("jack", "Jack Ma", "Kandy", 743765876, "site-manager", "4321")).collect(Collectors.toList()));
        assertEquals(2, service.getAllUsers().size());
    }

    @Test
    public void getUsersByRoleTest() {
        when(repository.findByRole("supplier")).thenReturn(Stream
                .of(new User("john", "John Doe", "Colombo", 743243876, "supplier", "1234")).collect(Collectors.toList()));
        assertEquals(1, service.getUsersByRole("supplier").size());
    }

    @Test
    public void createUserTest() {
        User user = new User("john", "John Doe", "Colombo", 743243876, "supplier", "1234");
        when(repository.save(user)).thenReturn(user);
        assertEquals(user, service.createUser(user));
    }

}
