package com.api.spendash.dto.ItemDTO;

import com.api.spendash.model.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class ItemDTOController {
    private final ItemDTORepository repository;

    @Autowired
    public ItemDTOController(ItemDTORepository repository) {
        this.repository = repository;
    }

    @GetMapping("/test-orderedItems")
    public ResponseEntity<?> testGetAllOrderedItems() {
        return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/test-orderedItedmsByOrder/{orders}")
    public ResponseEntity<?> testGetOrderedItemsByOrder(@PathVariable Orders orders) {
        return new ResponseEntity<>(repository.findByOrder(orders), HttpStatus.OK);
    }
}
