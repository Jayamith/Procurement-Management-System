package com.api.spendash.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
public class Payment {
    @Id
    @GeneratedValue
    private Integer id;
    private String method;
    @ManyToOne
    private Receipt invoiceRef;
    private LocalDate date;
    private double amount;
    @ManyToOne
    private User paidBy;
    @ManyToOne
    private Site site;
}
