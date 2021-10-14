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
public class Receipt {
    @Id
    private Long id;
    private LocalDate date;
    private ArrayList<Item> items;
    @ManyToOne
    private Orders orderRef;
    private String acceptanceStatus;
    @ManyToOne
    private User supplier;
    private String paymentStatus;
    private double cost;
    private boolean isFullDelivery;
    private String type;
    @ManyToOne
    private Site site;
}
