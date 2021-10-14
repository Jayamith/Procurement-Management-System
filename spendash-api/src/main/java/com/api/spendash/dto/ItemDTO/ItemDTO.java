package com.api.spendash.dto.ItemDTO;

import com.api.spendash.model.CreditNote;
import com.api.spendash.model.Orders;
import com.api.spendash.model.Receipt;
import com.api.spendash.model.User;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
public class ItemDTO {
    @Id
    @GeneratedValue
    private Integer id;
    private Integer idRef;
    @ManyToOne
    private Orders order;
    @ManyToOne
    private Receipt receipt;
    @ManyToOne
    private CreditNote creditNote;
    private String name;
    private int qty;
    private float price;
    private String description;

    @ManyToOne
    private User supplier;
}
