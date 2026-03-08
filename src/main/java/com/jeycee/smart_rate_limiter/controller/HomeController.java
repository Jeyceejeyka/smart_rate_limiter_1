package com.jeycee.smart_rate_limiter.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HomeController {

    @GetMapping(produces = "text/html")
    public String home() {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <title>Smart Rate Limiter</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        background-color: #0f172a;
                        font-family: Consolas, monospace;
                        color: #e2e8f0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                    }

                    .container {
                        background-color: #1e293b;
                        padding: 40px;
                        border-radius: 12px;
                        box-shadow: 0 0 25px rgba(0, 255, 200, 0.2);
                        width: 850px;
                    }

                    h1 {
                        text-align: center;
                        color: #38bdf8;
                        margin-bottom: 30px;
                    }

                    .diagram {
                        text-align: center;
                        margin-bottom: 30px;
                        font-size: 14px;
                        line-height: 1.6;
                        color: #94a3b8;
                    }

                    .requests {
                        color: #facc15;
                    }

                    .gate {
                        color: #38bdf8;
                        font-weight: bold;
                    }

                    .allowed {
                        color: #22c55e;
                        font-weight: bold;
                    }

                    .blocked {
                        color: #ef4444;
                        font-weight: bold;
                    }

                    .bucket {
                        color: #a78bfa;
                        font-weight: bold;
                    }

                    .section {
                        margin-top: 20px;
                        padding: 15px;
                        background: #0f172a;
                        border-radius: 8px;
                    }

                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        font-size: 14px;
                        color: #64748b;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Smart Rate Limiter API</h1>

                    <div class="diagram">
                        <span class="requests">
                        >>> >>> >>> >>> >>> >>> >>> >>> >>>
                        </span>
                        <br>
                        Incoming Request Stream
                        <br><br>

                        <span class="gate">
                        ┌──────────────────────────┐<br>
                        │     TRAFFIC GATEWAY      │<br>
                        │     Rate Limiter Core    │<br>
                        └────────────┬─────────────┘
                        </span>
                        <br>

                        <span class="bucket">
                        Token Bucket Algorithm<br>
                        [ ● ● ● ● ● ● ○ ○ ○ ○ ]
                        </span>
                        <br><br>

                        <span class="allowed">
                        ✔ Allowed Flow  →  →  →
                        </span>
                        <br>

                        <span class="blocked">
                        ✖ Blocked Flow (429 Too Many Requests)
                        </span>
                    </div>

                    <div class="section">
                        <strong>Policy Configuration</strong><br>
                        Max Requests: 100 / minute<br>
                        Algorithm: Token Bucket<br>
                        Enforcement: ACTIVE
                    </div>

                    <div class="footer">
                        Monitoring • Regulating • Protecting
                    </div>
                </div>
            </body>
            </html>
            """;
    }
}
