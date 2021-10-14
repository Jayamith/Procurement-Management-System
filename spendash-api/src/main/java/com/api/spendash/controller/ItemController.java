package com.api.spendash.controller;

import com.api.spendash.model.Item;
import com.api.spendash.model.User;
import com.api.spendash.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class ItemController {
    private final ItemService service;

    @Autowired
    public ItemController(ItemService service) {
        this.service = service;
    }

    @PostMapping("/item")
    public ResponseEntity<?> createItem(@RequestParam("name") String name,
                                        @RequestParam(required = false, value = "qty") int qty,
                                        @RequestParam("price") float price,
                                        @RequestParam(required = false, value = "description") String description,
                                        @RequestParam("supplier") User supplier)
    {
        Item item = new Item();
        item.setName(name);
        item.setQty(qty);
        item.setPrice(price);
        item.setDescription(description);
        item.setSupplier(supplier);

        return new ResponseEntity<>(service.createItem(item), HttpStatus.CREATED);
    }

    @GetMapping("/item/{id}")
    public ResponseEntity<?> getItemById(@PathVariable int id) {
        return new ResponseEntity<>(service.getItemById(id), HttpStatus.OK);
    }

    @GetMapping("/item")
    public ResponseEntity<?> getAllItems() {
        return new ResponseEntity<>(service.getAllItems(), HttpStatus.OK);
    }

    @PutMapping("/item")
    public ResponseEntity<?> updateItem(@RequestParam("id") int id,
                                        @RequestParam("name") String name,
                                        @RequestParam(required = false, value = "qty") int qty,
                                        @RequestParam("price") float price,
                                        @RequestParam(required = false, value = "description") String description,
                                        @RequestParam(required = false, value = "supplier") User supplier)
    {
        Item item = new Item(id, name, qty, price, description, supplier);
        return new ResponseEntity<>(service.updateItem(item), HttpStatus.OK);
    }

    @DeleteMapping("/item/{id}")
    public ResponseEntity<?> deleteById(@PathVariable int id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/item/supplier/{supplier}")
    public ResponseEntity<?> getItemsBySupplier(@PathVariable User supplier) {
        return new ResponseEntity<>(service.getItemsBySupplier(supplier), HttpStatus.OK);
    }
}
