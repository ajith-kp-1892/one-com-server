# One Com Server

## Required Library

- Docker
#

## Steps

1. Run server
   `npm install` and `tsc` and `node build`

2. Run Prometheus

    Modify: `/prometheus-configs/prometheus.yml`, replace `192.168.29.21` with your own host machine's IP.  
    ```sh
    docker run -p 9090:9090 -v "$(pwd)/prometheus-configs":/prometheus-configs prom/prometheus --config.file=/prometheus-configs/prometheus.yml
    ```

3. Visit your running Prometheus and run queries

    Open Prometheus: http://localhost:9090

4. Run Grafana

    ```sh
    docker run -i -p 3000:3000 grafana/grafana
    ```

5. Visit your running Grafana 

    Open Grafana http://localhost:3000
  
    ```
      Username: admin
      Password: admin
    ```

6. Add Prometheus data source 

    Url: `http://{{localhost/IP}}:9090`, Access: `direct`

7. To see the custom developed monitoring tool, 

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