package com.example.ecommerce.controller;

import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> createProduct(@RequestParam("name") String name,
                                           @RequestParam("description") String description,
                                           @RequestParam("price") double price,
                                           @RequestParam("image") MultipartFile image) {
        try {
            // Define upload directory relative to the current working directory
            String uploadsDir = System.getProperty("user.dir") + "/uploads/";
            File uploadPath = new File(uploadsDir);
            if (!uploadPath.exists()) {
                uploadPath.mkdirs(); // create uploads folder if not exists
            }

            // Save the file to the uploads directory
            String filePath = uploadsDir + image.getOriginalFilename();
            image.transferTo(new File(filePath));

            // Create and save product
            Product product = new Product();
            product.setName(name);
            product.setDescription(description);
            product.setPrice(price);
            product.setImageUrl("/uploads/" + image.getOriginalFilename()); // for frontend access

            productRepository.save(product);

            return ResponseEntity.ok("Product added successfully!");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }
}
