package com.api.spendash;

import com.api.spendash.model.Item;
import com.api.spendash.model.User;
import com.api.spendash.repository.ItemRepository;
import com.api.spendash.service.ItemService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ItemTest {

    @Autowired
    private ItemService service;

    @MockBean
    private ItemRepository repository;

    @Test
    public void createItemTest() {
        User supplier = new User("jack", "Jack Ma", "Colombo", 757354645, "supplier", "1234");
        Item item = new Item(1, "Tile Pack", 10, 1200, "Lanka Tiles 2x2 Tile Pack", supplier);
        when(repository.save(item)).thenReturn(item);
        assertEquals(item, service.createItem(item));
    }

    @Test
    public void getItemByIdTest() {
        User supplier = new User("jack", "Jack Ma", "Colombo", 757354645, "supplier", "1234");
        Item item = new Item(1, "Tile Pack", 10, 1200, "Lanka Tiles 2x2 Tile Pack", supplier);
        when(repository.findById(1)).thenReturn(java.util.Optional.of(item));
        assertEquals(item, service.getItemById(1));
    }

    @Test
    public void getItemBySupplierTest() {
        User supplier = new User("jack", "Jack Ma", "Colombo", 757354645, "supplier", "1234");
        Item item = new Item(1, "Tile Pack", 10, 1200, "Lanka Tiles 2x2 Tile Pack", supplier);
        List<Item> items = new ArrayList<>();
        items.add(item);
        when(repository.findBySupplier(supplier)).thenReturn(items);
        assertEquals(items, service.getItemsBySupplier(supplier));
    }

    @Test
    public void deleteItemById() {
        service.deleteById(1);
        verify(repository, times(1)).deleteById(1);
    }
}
