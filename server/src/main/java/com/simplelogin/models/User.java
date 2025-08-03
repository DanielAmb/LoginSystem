package com.simplelogin.models;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class User implements UserDetails {  // Implement UserDetails
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;

    // Required UserDetails methods
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")); // Assign default role
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Change if you need account expiration
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Change if you implement locking
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Change if you need credential expiration
    }

    @Override
    public boolean isEnabled() {
        return true; // Change if you implement account disabling
    }
}
