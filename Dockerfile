FROM python:3.12-slim

# Install dependencies
RUN apt-get update && apt-get install -y git curl build-essential

# Install Solc
RUN curl -L https://github.com/ethereum/solidity/releases/download/v0.8.21/solc-static-linux -o /usr/local/bin/solc \
    && chmod +x /usr/local/bin/solc

# Install Slither
RUN pip install slither-analyzer

WORKDIR /project
ENTRYPOINT ["slither"]
