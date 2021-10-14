package com.api.spendash.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
public class CreditNote {
    @Id
    private Long id;
    private ArrayList<Item> items;
    private double amount;
    @ManyToOne
    private Receipt invoiceRef;
    private String status;
    private String comment;
    @ManyToOne
    private Site site;
}
