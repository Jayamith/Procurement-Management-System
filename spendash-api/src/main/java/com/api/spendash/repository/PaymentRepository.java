package com.api.spendash.repository;

import com.api.spendash.model.Payment;
import com.api.spendash.model.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    Payment findByInvoiceRef(Receipt invoiceRef);
}
