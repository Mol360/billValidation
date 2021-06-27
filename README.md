## NodeJS Bill Validation

This is an example of how validate differents bill number formats and how to calculate module 10 and 11.

## Getting Started

To run the project you will need to have docker installed.

### Installation

1. Install Docker
2. Clone the repo
   ```sh
   git clone https://github.com/Mol360/billValidation.git
   ```
3. Run 'docker-compose up' on main directory
   ```sh
   docker-compose up
   ```
4. Access your local host on port http://localhost:8080/boleto/[$billNumber]
   ```sh
   #Bill Format example
   curl -i http://localhost:8080/boleto/21290001192110001210904475617405975870000002000

   #Affiliate Format example
   curl -i http://localhost:8080/boleto/817700000000010936599702411310797039001433708318
   ```

## Tests

To run the tests you need to run 'npm test' inside the container.

```sh
docker exec -t nodejs-test npm test
```

## Contact

Marcelo de Oliveira Lopes - mol360@gmail.com

Project Link: [https://github.com/Mol360/billValidation](https://github.com/Mol360/billValidation)