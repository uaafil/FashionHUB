package com.example.ecommerce.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Getter
@Setter
@Table(name = "orders") // Important: "order" is reserved keyword in SQL
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;
    @JsonProperty("user_email")
    private String userMail; // to link order to user

    public List<OrderItem> getOrderItems() {
        return this.items;
    }

    public String getMail() {
       return this.userMail;
    }
}
