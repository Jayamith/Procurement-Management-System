package com.api.spendash.service;

import com.api.spendash.model.Payment;
import com.api.spendash.model.Receipt;
import com.api.spendash.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {
    private final PaymentRepository repository;

    @Autowired
    public PaymentService(PaymentRepository repository) {
        this.repository = repository;
    }

    public Payment createPayment(Payment payment) {
        return repository.save(payment);
    }

    public Payment getPaymentById(int id) {
        return repository.findById(id).get();
    }

    public List<Payment> getAllPayments() {
        return repository.findAll();
    }

    public Payment getPaymentByInvoice(Receipt invoice) {
        return repository.findByInvoiceRef(invoice);
    }

}
