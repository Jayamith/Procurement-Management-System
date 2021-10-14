package com.api.spendash.controller;

import com.api.spendash.model.Payment;
import com.api.spendash.model.Receipt;
import com.api.spendash.model.Site;
import com.api.spendash.model.User;
import com.api.spendash.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class PaymentController {
    private final PaymentService service;

    @Autowired
    public PaymentController(PaymentService service) {
        this.service = service;
    }

    @PostMapping("/payment")
    public ResponseEntity<?> createPayment(@RequestParam("method") String method,
                                           @RequestParam("invoice") Receipt invoiceRef,
                                           @RequestParam("amount") double amount,
                                           @RequestParam("paidBy") User paidBy,
                                           @RequestParam("site") Site site)
    {
        Payment payment = new Payment();
        payment.setDate(LocalDate.now());
        payment.setAmount(amount);
        payment.setSite(site);
        payment.setMethod(method);
        payment.setPaidBy(paidBy);
        payment.setInvoiceRef(invoiceRef);
        return new ResponseEntity<>(service.createPayment(payment), HttpStatus.CREATED);
    }

    @GetMapping("/payment/{id}")
    public ResponseEntity<?> getPaymentById(@PathVariable int id) {
        return new ResponseEntity<>(service.getPaymentById(id), HttpStatus.OK);
    }

    @GetMapping("/payment")
    public ResponseEntity<?> getALlPayments() {
        return new ResponseEntity<>(service.getAllPayments(), HttpStatus.OK);
    }

    @PostMapping("/payment/invoice")
    public ResponseEntity<?> getPaymentByInvoice(@RequestParam("invoiceRef") Receipt invoiceRef) {
        return new ResponseEntity<>(service.getPaymentByInvoice(invoiceRef), HttpStatus.OK);
    }
}
