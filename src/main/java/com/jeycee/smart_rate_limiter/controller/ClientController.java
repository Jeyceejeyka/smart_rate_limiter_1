package com.jeycee.smart_rate_limiter.controller;

import com.jeycee.smart_rate_limiter.dto.ClientRequest;
import com.jeycee.smart_rate_limiter.dto.ClientResponse;
import com.jeycee.smart_rate_limiter.entity.Client;
import com.jeycee.smart_rate_limiter.service.ClientService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clients")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping
    public ClientResponse createClient(@Valid @RequestBody ClientRequest request) {

        Client client = clientService.createClient(request);

        return new ClientResponse(
                client.getName(),
                client.getBaseLimit(),
                client.getRole().name()
        );
    }
}