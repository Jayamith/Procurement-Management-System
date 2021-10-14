package com.api.spendash.service;

import com.api.spendash.model.User;
import com.api.spendash.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User createUser(User user) {
        return repository.save(user);
    }

    public User getUserById(String id) {
        return repository.findById(id).get();
    }

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public List<User> getUsersByRole(String role) {
        return repository.findByRole(role);
    }

    public User updateUser(User user) {
        return repository.save(user);
    }

    public void deleteById(String id) {
        repository.deleteById(id);
    }

    public User login(String userName, String password) {
        User tempUser = repository.findById(userName).get();
        if (tempUser == null) {
            return null;
        } else if (!tempUser.getPassword().equals(password)) {
            return null;
        }
        return tempUser;
    }
}
