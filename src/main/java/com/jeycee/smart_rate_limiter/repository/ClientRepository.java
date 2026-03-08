package com.jeycee.smart_rate_limiter.repository;

import com.jeycee.smart_rate_limiter.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findByName(String name);
}