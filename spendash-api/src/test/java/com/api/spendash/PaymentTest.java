package com.api.spendash;

import com.api.spendash.model.*;
import com.api.spendash.repository.PaymentRepository;
import com.api.spendash.service.PaymentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class PaymentTest {
    @Autowired
    private PaymentService service;

    @MockBean
    private PaymentRepository repository;

    /**
     * temporary objects related to test cases
     */
    User supplier = new User("john", "John Doe", "Colombo", 723456654, "supplier", "1234");
    User manager = new User("jack", "Jack Ma", "Colombo", 723456764, "supplier", "1234");
    Site site = new Site(1, "City Tower", "Colombo", 745654456);
    Orders order = new Orders(1223L, LocalDate.now(), null, LocalDate.now(), "pending", 12000, "comment", supplier, supplier, site);
    Receipt invoice1 = new Receipt(System.currentTimeMillis(), LocalDate.now(), null, order, "accepted", supplier, "pending", 12000, false, "invoice", site);
    Receipt invoice2 = new Receipt(System.currentTimeMillis(), LocalDate.now(), null, order, "accepted", supplier, "pending", 14500, false, "invoice", site);
    Payment payment1 = new Payment(1, "Visa", invoice1, LocalDate.now(), 12000, manager, site);
    Payment payment2 = new Payment(2, "Master Card", invoice2, LocalDate.now(), 34888, manager, site);

    @Test
    public void createPaymentTest() {
        when(repository.save(payment1)).thenReturn(payment1);
        assertEquals(payment1, service.createPayment(payment1));
    }

    @Test
    public void getPaymentByIdTest() {
        when(repository.findById(1)).thenReturn(java.util.Optional.of(payment1));
        assertEquals(payment1, service.getPaymentById(1));
    }

    @Test
    public void getAllPaymentsTest() {
        when(repository.findAll()).thenReturn(Stream.of(payment1, payment2).collect(Collectors.toList()));
        assertEquals(2, service.getAllPayments().size());
    }

    @Test
    public void getPaymentByInvoiceTest() {
        when(repository.findByInvoiceRef(invoice2)).thenReturn(payment1);
        assertEquals(payment1, service.getPaymentByInvoice(invoice2));
    }
}
