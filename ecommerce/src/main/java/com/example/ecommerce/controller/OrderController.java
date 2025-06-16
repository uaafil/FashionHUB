package com.example.ecommerce.controller;

import com.example.ecommerce.dto.OrderRequest;
import com.example.ecommerce.dto.OrderResponse;
import com.example.ecommerce.model.Order;
import com.example.ecommerce.model.OrderItem;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173") // Frontend origin
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    // ✅ Place an order
    @PostMapping
    public ResponseEntity<String> placeOrder(@RequestBody OrderRequest request) {
        Order order = new Order();
        order.setUserMail(request.getUserEmail());

        List<OrderItem> items = request.getItems().stream().map(dtoItem -> {
            OrderItem item = new OrderItem();
            item.setProductName(dtoItem.getProductName());
            item.setQuantity(dtoItem.getQuantity());
            item.setPrice(dtoItem.getPrice());
            item.setOrder(order); // link item to order
            return item;
        }).collect(Collectors.toList());

        order.setItems(items);
        orderRepository.save(order);

        return ResponseEntity.ok("Order placed successfully");
    }


    // ✅ Get orders by email
    @GetMapping("/email/{email}")
    public ResponseEntity<List<OrderResponse>> getOrdersByEmail(@PathVariable String email) {
        List<Order> orders = orderRepository.findByUserMail(email);
        List<OrderResponse> response = orders.stream()
                .map(order -> new OrderResponse(order.getId(), order.getUserMail(), order.getItems()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

}
