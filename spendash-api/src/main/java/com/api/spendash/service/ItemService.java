package com.api.spendash.service;

import com.api.spendash.model.Item;
import com.api.spendash.model.User;
import com.api.spendash.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    private final ItemRepository repository;

    @Autowired
    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    public Item createItem(Item item) {
        return repository.save(item);
    }

    public Item getItemById(int id) {
        return repository.findById(id).get();
    }

    public List<Item> getAllItems() {
        return repository.findAll();
    }

    public Item updateItem(Item item) {
        return repository.save(item);
    }

    public void deleteById(int id) {
        repository.deleteById(id);
    }

    public List<Item> getItemsBySupplier(User supplier) {
        return repository.findBySupplier(supplier);
    }
}
