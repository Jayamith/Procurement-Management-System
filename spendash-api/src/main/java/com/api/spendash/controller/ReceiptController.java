package com.api.spendash.controller;

import com.api.spendash.model.*;
import com.api.spendash.service.ReceiptService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class ReceiptController {
    private final ReceiptService service;
    ObjectMapper mapper = new ObjectMapper();

    public ReceiptController(ReceiptService service) {
        this.service = service;
    }

    @PostMapping("/receipt")
    public ResponseEntity<?> createReceipt(@RequestParam("items") String items,
                                         @RequestParam("order") Orders order,
                                         @RequestParam("acceptanceStatus") String acceptanceStatus,
                                         @RequestParam("supplier") User supplier,
                                         @RequestParam("paymentStatus") String paymentStatus,
                                         @RequestParam("cost") double cost,
                                         @RequestParam("isFullDelivery") boolean isFullDelivery,
                                         @RequestParam("type") String type,
                                         @RequestParam("site") Site site) throws Exception {

        Item[] itemsList = mapper.readValue(items, Item[].class);
        Receipt receipt = new Receipt();
        receipt.setId(System.currentTimeMillis());
        receipt.setDate(LocalDate.now());
        receipt.setOrderRef(order);
        receipt.setAcceptanceStatus(acceptanceStatus);
        receipt.setSupplier(supplier);
        receipt.setPaymentStatus(paymentStatus);
        receipt.setCost(cost);
        receipt.setFullDelivery(isFullDelivery);
        receipt.setType(type);
        receipt.setSite(site);
        return new ResponseEntity<>(service.createReceipt(receipt, itemsList), HttpStatus.CREATED);
    }

    @GetMapping("/receipt/{id}")
    public ResponseEntity<?> getReceiptById(@PathVariable long id) {
        return new ResponseEntity<>(service.getReceiptById(id), HttpStatus.OK);
    }

    @GetMapping("/receipt/order/{order}")
    public ResponseEntity<?> getReceiptByOrder(@PathVariable Orders order) {
        return new ResponseEntity<>(service.getReceiptByOrder(order), HttpStatus.OK);
    }

    @GetMapping("/receipt")
    public ResponseEntity<?> getAllReceipts(@RequestParam(required = false, value = "site") Site site,
                                            @RequestParam(required = false, value = "supplier") User supplier,
                                            @RequestParam(required = false, value = "type") String type)
    {
        return new ResponseEntity<>(service.getAllReceipts(site, supplier, type), HttpStatus.OK);
    }

    @PutMapping("/receipt")
    public ResponseEntity<?> updateReceipt(@RequestParam("id") String id,
                                           @RequestParam("items") String items,
                                           @RequestParam("date") String date,
                                           @RequestParam("order") Orders order,
                                           @RequestParam("acceptanceStatus") String acceptanceStatus,
                                           @RequestParam("supplier") User supplier,
                                           @RequestParam("paymentStatus") String paymentStatus,
                                           @RequestParam("cost") double cost,
                                           @RequestParam("isFullDelivery") boolean isFullDelivery,
                                           @RequestParam("type") String type,
                                           @RequestParam("site") Site site) throws JsonProcessingException {
        Item[] itemsList = mapper.readValue(items, Item[].class);
        Receipt receipt = new Receipt();
        receipt.setId(Long.parseLong(id));
        receipt.setDate(LocalDate.parse(date));
        receipt.setOrderRef(order);
        receipt.setAcceptanceStatus(acceptanceStatus);
        receipt.setSupplier(supplier);
        receipt.setPaymentStatus(paymentStatus);
        receipt.setCost(cost);
        receipt.setFullDelivery(isFullDelivery);
        receipt.setType(type);
        receipt.setSite(site);
        return new ResponseEntity<>(service.updateReceipt(receipt, itemsList), HttpStatus.OK);
    }

    @DeleteMapping("/receipt/{id}")
    public ResponseEntity<?> deleteById(@PathVariable long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/receipt/accept")
    public ResponseEntity<?> changeAcceptanceStatus(@RequestParam("id") long id,
                                                    @RequestParam("status") String status)
    {
        return new ResponseEntity<>(service.changeAcceptanceStatus(id, status), HttpStatus.OK);
    }

    @PostMapping("/receipt/payment")
    public ResponseEntity<?> changePaymentStatus(@RequestParam("id") long id,
                                                 @RequestParam("status") String status)
    {
        return new ResponseEntity<>(service.changePaymentStatus(id, status), HttpStatus.OK);
    }

    @PostMapping("/receipt/type")
    public ResponseEntity<?> changeType(@RequestParam("id") long id,
                                        @RequestParam("type") String type)
    {
        return new ResponseEntity<>(service.changeType(id, type), HttpStatus.OK);
    }

    @GetMapping("/receipt/check/{order}")
    public ResponseEntity<?> checkReceiptExistByOrder(@PathVariable Orders order) {
        return new ResponseEntity<>(service.checkReceiptExistByOrder(order), HttpStatus.OK);
    }


}
