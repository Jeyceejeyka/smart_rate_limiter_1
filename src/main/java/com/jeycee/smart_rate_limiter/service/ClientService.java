package com.jeycee.smart_rate_limiter.service;

import com.jeycee.smart_rate_limiter.dto.ClientRequest;
import com.jeycee.smart_rate_limiter.entity.Client;
import com.jeycee.smart_rate_limiter.entity.UserRole;
import com.jeycee.smart_rate_limiter.exception.ClientNotFoundException;
import com.jeycee.smart_rate_limiter.repository.ClientRepository;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Client createClient(ClientRequest request) {

        UserRole role = request.getRole() == null
                ? UserRole.FREE
                : request.getRole();

        Client client = new Client(
                request.getName(),
                request.getBaseLimit(),
                role
        );

        return clientRepository.save(client);
    }

    public Client getClientByName(String name) {
        return clientRepository.findByName(name)
                .orElseThrow(() ->
                        new ClientNotFoundException("Client not found: " + name)
                );
    }
}