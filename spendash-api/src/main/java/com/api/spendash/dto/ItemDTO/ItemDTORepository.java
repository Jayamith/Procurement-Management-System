package com.api.spendash.dto.ItemDTO;

import com.api.spendash.model.CreditNote;
import com.api.spendash.model.Orders;
import com.api.spendash.model.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemDTORepository extends JpaRepository<ItemDTO, Integer> {
    List<ItemDTO> findByOrder(Orders orders);
    List<ItemDTO> findByReceipt(Receipt receipt);
    List<ItemDTO> findByCreditNote(CreditNote creditNote);
}
