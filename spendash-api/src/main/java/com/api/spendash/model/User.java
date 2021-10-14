package com.api.spendash.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
public class User {
    @Id
    private String userName;
    private String name;
    private String address;
    private int contact;
    private String role;
    private String password;
}
