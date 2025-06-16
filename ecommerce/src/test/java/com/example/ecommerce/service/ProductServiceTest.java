package com.example.ecommerce.service;

import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize mocks
    }

    @Test
    public void testGetAllProducts() {
        Product p1 = new Product("Black Shirt", "Black Formal Shirt for Men", 699, "/uploads/Black-shirt.jpeg");
        Product p2 = new Product("White Shirt", "White Formal Shirt for Men", 649, "/uploads/White-shirt.jpeg");

        when(productRepository.findAll()).thenReturn(Arrays.asList(p1, p2));

        List<Product> result = productService.getAllProducts();

        assertEquals(2, result.size());
        assertEquals("Black Shirt", result.get(0).getName());
        assertEquals("White Shirt", result.get(1).getName());

        verify(productRepository, times(1)).findAll();
    }

    @Test
    public void testAddProduct() {
        Product product = new Product("Cap", "Cool summer cap", 299.0, "/uploads/cap.jpg");

        when(productRepository.save(product)).thenReturn(product);

        Product savedProduct = productService.addProduct(product);

        assertNotNull(savedProduct);
        assertEquals("Cap", savedProduct.getName());
        assertEquals(299.0, savedProduct.getPrice());

        verify(productRepository, times(1)).save(product);
    }
}
