package com.api.spendash.repository;

import com.api.spendash.model.Orders;
import com.api.spendash.model.Site;
import com.api.spendash.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long> {
    List<Orders> findBySite(Site site);
    List<Orders> findBySiteAndStatusEquals(Site site, String status);
    List<Orders> findByStatusEqualsAndSupplier(String status, User supplier);
    List<Orders> findBySupplier(User supplier);
    List<Orders> findByStatusEquals(String status);
    List<Orders> findBySiteAndSupplier(Site site, User supplier);
    List<Orders> findBySiteAndStatusEqualsAndSupplier(Site site, String status, User supplier);
}
