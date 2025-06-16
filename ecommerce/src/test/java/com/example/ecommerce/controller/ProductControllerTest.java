package com.example.ecommerce.controller;

import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.security.JwtFilter;
import com.example.ecommerce.security.JwtUtil;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.hamcrest.Matchers.containsString;

@WebMvcTest(ProductController.class)
@AutoConfigureMockMvc(addFilters = false)  // disable Spring Security filters for test
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductRepository productRepository;

    // ✅ Add these to fix "NoSuchBeanDefinition" for Jwt-related beans
    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private JwtFilter jwtFilter;

    @Test
    public void testGetAllProducts() throws Exception {
        Product product1 = new Product("Black Shirt", "Black Formal Shirt for Men", 699, "/uploads/Black-shirt.jpeg");
        Product product2 = new Product("White Shirt", "White Formal Shirt for Men", 649, "/uploads/White-shirt.jpeg");

        Mockito.when(productRepository.findAll()).thenReturn(Arrays.asList(product1, product2));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Black Shirt")))
                .andExpect(content().string(containsString("White Shirt")));
    }

    @Test
    public void testCreateProduct() throws Exception {
        MockMultipartFile imageFile = new MockMultipartFile("image", "shirt.jpg",
                MediaType.IMAGE_JPEG_VALUE, "Dummy Image Content".getBytes());

        mockMvc.perform(multipart("/api/products")
                        .file(imageFile)
                        .param("name", "New Shirt")
                        .param("description", "Trendy Shirt")
                        .param("price", "499.99"))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Product added successfully")));
    }
}
