package com.example.ecommerce.repository;

import com.example.ecommerce.model.Product;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)

public class ProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    @Test
    public void testSaveAndFindProduct() {
        Product product = new Product("Black Shirt", "Black Formal Shirt for Men ", 699,"/uploads/Black shirt.jpeg");
        Product saved = productRepository.save(product);

        assertNotNull(saved.getId());
        assertEquals("Black Shirt", saved.getName());
    }
}
