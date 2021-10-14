package com.api.spendash.repository;

import com.api.spendash.model.CreditNote;
import com.api.spendash.model.Receipt;
import com.api.spendash.model.Site;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreditNoteRepository extends JpaRepository<CreditNote, Long> {
    List<CreditNote> findBySite(Site site);
    List<CreditNote> findByInvoiceRef(Receipt invoiceRef);
    List<CreditNote> findBySiteAndInvoiceRef(Site site, Receipt invoiceRef);
}
