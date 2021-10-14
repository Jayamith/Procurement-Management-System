package com.api.spendash.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
public class Site {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private String address;
    private int contact;
}
