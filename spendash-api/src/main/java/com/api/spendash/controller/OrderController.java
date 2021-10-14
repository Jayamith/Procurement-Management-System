package com.api.spendash.controller;

import com.api.spendash.model.Item;
import com.api.spendash.model.Orders;
import com.api.spendash.model.Site;
import com.api.spendash.model.User;
import com.api.spendash.service.OrderService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.spring.web.json.Json;

import java.io.DataInput;
import java.lang.reflect.Type;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class OrderController {
    private final OrderService service;
    ObjectMapper mapper = new ObjectMapper();

    @Autowired
    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping("/order")
    public ResponseEntity<?> createOrder(@RequestParam("items") String items,
                                         @RequestParam(required = false, value = "expectedDate") String expectedDate,
                                         @RequestParam("status") String status,
                                         @RequestParam("cost") double cost,
                                         @RequestParam(required = false, value = "comment") String comment,
                                         @RequestParam("lastModifiedBy") User lastModifiedBy,
                                         @RequestParam("supplier") User supplier,
                                         @RequestParam("site") Site site) throws Exception {

        Item[] itemsList = mapper.readValue(items, Item[].class);
        Orders orders = new Orders();
        orders.setId(System.currentTimeMillis());
        orders.setDate(LocalDate.now());
        orders.setExpectedDate(LocalDate.parse(expectedDate));
        orders.setStatus(status);
        orders.setCost(cost);
        orders.setComment(comment);
        orders.setLastModifiedBy(lastModifiedBy);
        orders.setSupplier(supplier);
        orders.setSite(site);
        return new ResponseEntity<>(service.createOrder(orders, itemsList), HttpStatus.CREATED);
    }

    @GetMapping("/order/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable long id) {
        return new ResponseEntity<>(service.getOrderById(id), HttpStatus.OK);
    }

    @GetMapping("/order")
    public ResponseEntity<?> getAllOrders(@RequestParam(required = false, value = "site") Site site,
                                          @RequestParam(required = false, value = "status") String status,
                                          @RequestParam(required = false, value = "supplier") User supplier)
    {
        return new ResponseEntity<>(service.getAllOrders(site, status, supplier), HttpStatus.OK);
    }

    @PutMapping("/order")
    public ResponseEntity<?> updateOrder(@RequestParam("id") String id,
                                         @RequestParam("items") String items,
                                         @RequestParam("date") String date,
                                         @RequestParam("expectedDate") String expectedDate,
                                         @RequestParam("status") String status,
                                         @RequestParam("cost") double cost,
                                         @RequestParam(required = false, value = "comment") String comment,
                                         @RequestParam("lastModifiedBy") User lastModifiedBy,
                                         @RequestParam("supplier") User supplier,
                                         @RequestParam("site") Site site) throws Exception {

        Item[] itemsList = mapper.readValue(items, Item[].class);
        Orders orders = new Orders();
        orders.setId(Long.parseLong(id));
        orders.setDate(LocalDate.parse(date));
        orders.setExpectedDate(LocalDate.parse(expectedDate));
        orders.setStatus(status);
        orders.setCost(cost);
        orders.setComment(comment);
        orders.setLastModifiedBy(lastModifiedBy);
        orders.setSupplier(supplier);
        orders.setSite(site);
        return new ResponseEntity<>(service.updateOrder(orders, itemsList), HttpStatus.CREATED);
    }

    @DeleteMapping("/order/{id}")
    public ResponseEntity<?> deleteById(@PathVariable long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/order/status")
    public ResponseEntity<?> changeStatus(@RequestParam("id") long id,
                                          @RequestParam("status") String status) {
        return new ResponseEntity<>(service.changeStatus(id, status), HttpStatus.OK);
    }
}
