package com.api.spendash.service;

import com.api.spendash.dto.ItemDTO.ItemDTO;
import com.api.spendash.dto.ItemDTO.ItemDTORepository;
import com.api.spendash.model.Item;
import com.api.spendash.model.Orders;
import com.api.spendash.model.Site;
import com.api.spendash.model.User;
import com.api.spendash.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository repository;
    private final ItemDTORepository itemDTORepository;

    @Autowired
    public OrderService(OrderRepository repository, ItemDTORepository itemDTORepository) {
        this.repository = repository;
        this.itemDTORepository = itemDTORepository;
    }

    public Orders createOrder(Orders orders, Item[] itemsList) {
        Orders tmpOrder = repository.save(orders);
        for (Item item : itemsList) {
            ItemDTO itemDTO = new ItemDTO();
            itemDTO.setOrder(orders);
            itemDTO.setIdRef(item.getId());
            itemDTO.setName(item.getName());
            itemDTO.setQty(item.getQty());
            itemDTO.setSupplier(item.getSupplier());
            itemDTO.setPrice(item.getPrice());

            itemDTORepository.save(itemDTO);
        }
        return tmpOrder;
    }

    public Orders getOrderById(long id) {
        Orders order = repository.findById(id).get();
        ArrayList<Item> itemArrayList = new ArrayList<>();
        if (order != null) {
            List<ItemDTO> itemDTOS = itemDTORepository.findByOrder(order);
            for (ItemDTO itemDTO : itemDTOS) {
                Item item = new Item();
                item.setId(itemDTO.getIdRef());
                item.setName(itemDTO.getName());
                item.setQty(itemDTO.getQty());
                item.setSupplier(itemDTO.getSupplier());
                item.setPrice(itemDTO.getPrice());
                itemArrayList.add(item);
            }
        }
        order.setItems(itemArrayList);
        return order;
    }

    public List<Orders> getAllOrders(Site site, String status, User supplier) {
        List<Orders> orders = null;
//        List<Orders> response = null;
        /**
         * site and supplier should be exist in the database
         * otherwise it will not serialize and the value will be null
         */
        if (site == null && status == null && supplier == null) {
            orders = repository.findAll();
        } else if (site != null && status == null && supplier == null) {
            orders = repository.findBySite(site);
        } else if (site != null && status != null && supplier == null) {
            orders = repository.findBySiteAndStatusEquals(site, status);
        } else if (site == null && status != null && supplier != null) {
            orders = repository.findByStatusEqualsAndSupplier(status, supplier);
        } else if (site == null && status == null && supplier != null) {
            orders = repository.findBySupplier(supplier);
        } else if (site == null && status != null && supplier == null) {
            orders = repository.findByStatusEquals(status);
        } else if (site != null && status == null && supplier != null) {
            orders = repository.findBySiteAndSupplier(site, supplier);
        } else {
            orders = repository.findBySiteAndStatusEqualsAndSupplier(site, status, supplier);
        }


        for (Orders tmpOrder : orders) {
            ArrayList<Item> itemArrayList = new ArrayList<>();
            List<ItemDTO> itemDTOS = itemDTORepository.findByOrder(tmpOrder);
            for (ItemDTO itemDTO : itemDTOS) {
                Item item = new Item();
                item.setId(itemDTO.getIdRef());
                item.setName(itemDTO.getName());
                item.setQty(itemDTO.getQty());
                item.setSupplier(itemDTO.getSupplier());
                item.setPrice(itemDTO.getPrice());
                itemArrayList.add(item);
            }
            tmpOrder.setItems(itemArrayList);
        }
        return orders;
    }

    public Orders updateOrder(Orders orders, Item[] itemsList) {
        Orders tmpOrder = repository.save(orders);
        List<ItemDTO> dItems = itemDTORepository.findByOrder(orders);
        for (ItemDTO itemDTO : dItems) {
            int id = itemDTO.getId();
            itemDTORepository.deleteById(id);
        }
        for (Item item : itemsList) {
            ItemDTO itemDTO = new ItemDTO();
            itemDTO.setOrder(orders);
            itemDTO.setIdRef(item.getId());
            itemDTO.setName(item.getName());
            itemDTO.setQty(item.getQty());
            itemDTO.setSupplier(item.getSupplier());
            itemDTO.setPrice(item.getPrice());

            itemDTORepository.save(itemDTO);
        }
        return tmpOrder;
    }

    public void deleteById(long id) {
        Orders tmpOrder = repository.findById(id).get();
        List<ItemDTO> dItems = itemDTORepository.findByOrder(tmpOrder);
        for (ItemDTO itemDTO : dItems) {
            int tmpId = itemDTO.getId();
            itemDTORepository.deleteById(tmpId);
        }
        repository.deleteById(id);
    }

    public Orders changeStatus(long id, String status) {
        Orders tmpOrder = repository.findById(id).get();
        tmpOrder.setStatus(status);
        return repository.save(tmpOrder);
    }
}
