package com.example.ecommerce.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

        import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/razorpay")
@CrossOrigin(origins = "http://localhost:5173")
public class RazorpayController {

    @PostMapping("/create-order")
    public Map<String, Object> createOrder(@RequestBody Map<String, Object> data) throws Exception {
        int amount = (int) data.get("amount");

        RazorpayClient client = new RazorpayClient("KEY", "SECRET");

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount); // in paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "order_rcptid_11");

        Order order = client.orders.create(orderRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("id", order.get("id"));
        response.put("amount", order.get("amount"));
        response.put("currency", order.get("currency"));

        return response;
    }
}
