# One Com Server

## Required Dependencies

- Postgres Database
- Docker

#

## Steps


1. To use postgres database
    - use `scripts.sql` file to create new database
    - configure database information accordingly in src/config/configs.ts

2. To run server
    - install Dependencies `npm install`
    - To compile `tsc` 
    - To start server `node build`
    - To run test scripts (Jest) :  `npm test`

3. To run prometheus

    Modify: `/prometheus-configs/prometheus.yml`, replace `192.168.29.21` with your own host machine's IP.  
    ```sh
    docker run -p 9090:9090 -v "$(pwd)/prometheus-configs":/prometheus-configs prom/prometheus --config.file=/prometheus-configs/prometheus.yml
    ```

4. Visit your running prometheus and run queries

    Open Prometheus: http://localhost:9090

5. Run grafana

    ```sh
    docker run -i -p 3000:3000 grafana/grafana
    ```

6. Visit your running grafana

    Open Grafana http://localhost:3000
  
    ```
      Username: admin
      Password: admin
    ```

7. Add prometheus data source 

    Url: `http://{{localhost/IP}}:9090`, Access: `direct`

8. To see the custom developed monitoring tool, 

    Import `grafana.json` for dashboard.

#

## Prometheus Queries

1. To see the metrics
    
      Open http://localhost:3080/metrics

2. Response Time / Throughput
    ```sh
    histogram_quantile(0.5, sum(rate(http_request_duration_ms_bucket[1m])) by (le, route, method))
    ```

3. Memory Usage
    ```sh
    avg(nodejs_external_memory_bytes / 1024) by (service)
    ```

4. CPU Usage
    ```sh
    rate(process_cpu_seconds_total{instance=~"$instance"}[$interval])
    ```

5. Custom Metrics
    ```sh
    sum(rate(api_hits_total[1m])) by (api_hit)  * 60
    ```