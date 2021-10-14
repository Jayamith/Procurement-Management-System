package com.api.spendash.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
public class Item {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private int qty;
    private float price;
    private String description;

    @ManyToOne
    private User supplier;
}
