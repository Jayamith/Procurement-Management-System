package com.api.spendash.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDate;
import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
public class Orders {
    @Id
    private Long id;
    private LocalDate date;
    private ArrayList<Item> items;
    private LocalDate expectedDate;
    private String status;
    private double cost;
    private String comment;
    @ManyToOne
    private User lastModifiedBy;
    @ManyToOne
    private User supplier;
    @ManyToOne
    private Site site;
}
