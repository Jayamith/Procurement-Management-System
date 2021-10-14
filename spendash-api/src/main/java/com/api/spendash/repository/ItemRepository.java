package com.api.spendash.repository;

import com.api.spendash.model.Item;
import com.api.spendash.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
    List<Item> findBySupplier(User supplier);
}
