package com.example.ecommerce.dto;

import com.example.ecommerce.model.OrderItem;
import java.util.List;

public class OrderResponse {
    private Long orderId;
    private String userMail;
    private List<OrderItem> items;

    // ✅ Default constructor required for serialization
    public OrderResponse() {}

    public OrderResponse(Long orderId, String userMail, List<OrderItem> items) {
        this.orderId = orderId;
        this.userMail = userMail;
        this.items = items;
    }

    public Long getOrderId() {
        return orderId;
    }

    public String getUserMail() {
        return userMail;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public void setUserMail(String userMail) {
        this.userMail = userMail;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
}
