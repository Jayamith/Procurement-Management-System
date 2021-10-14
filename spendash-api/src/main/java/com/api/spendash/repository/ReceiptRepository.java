package com.api.spendash.repository;

import com.api.spendash.model.Orders;
import com.api.spendash.model.Receipt;
import com.api.spendash.model.Site;
import com.api.spendash.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, Long> {
    List<Receipt> findBySite(Site site);
    List<Receipt> findBySiteAndSupplier(Site site, User supplier);
    List<Receipt> findBySiteAndSupplierAndTypeEquals(Site site, User supplier, String type);
    List<Receipt> findByTypeEquals(String type);
    List<Receipt> findBySupplierAndTypeEquals(User supplier, String type);
    List<Receipt> findBySupplier(User supplier);
    List<Receipt> findBySiteAndTypeEquals(Site site, String type);
    List<Receipt> findByOrderRef(Orders order);
    boolean existsByOrderRef(Orders order);
}
