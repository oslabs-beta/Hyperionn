# GitHub Tutorial
<div align="center">
  <a href="https://https://github.com/oslabs-beta/hyperionn">
    <img src="./assets/Hyperion.png" alt="Logo" height="300px" width="300px"/> 
  </a>
  <h1>Hyperion</h1>
  <p>An open-source Kafka monitoring tool built for developers<p>
  <a href="https://github.com/oslabs-beta/ksqljs"><img src="https://img.shields.io/badge/license-MIT-blue"/></a>
  <a href="https://github.com/oslabs-beta/ksqljs/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/oslabs-beta/hyperionn"></a>
  <a href="https://github.com/oslabs-beta/ksqljs/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/oslabs-beta/hyperionn"></a>
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/oslabs-beta/hyperionn">
  
  <a href=""><strong>hyperion.com</strong></a>
</div>

## Table of Contents

1. [About the Project](#about-the-project)
   - [Built With](#built-with)
1. [Getting Started](#getting-started)
   - [Requirements](#requirements)
   - [Installation](#installation)
   - [When you're ready to use FranzView](#when-youre-ready-to-use-franzview)
1. [Contributors](#contributors)
1. [Roadmap](#roadmap)
1. [Prometheus Server and Demo Cluster](#prometheus-server-and-demo-cluster)
1. [License](#license)

## About the Project

<!-- FranzView is an open-source web application to help small teams with monitoring and management of Apache Kafka clusters. With FranzView you can monitor key metrics related to broker and topic performance and take actions around them. Through the UI you are able to:

- Monitor key performance metrics in real time by broker or topic and diagnose any issues through different views
- Create and delete topics within a cluster
- Reassign partition replicas to support with load balancing, change replication factor for a topic, and solve for underreplication issues

These features are supported by a GraphQL API for improved performance, for abstraction of PromQL queries, and is easily extendable based on the nuances of your cluster. -->

### Built With

- [Chart.js](https://www.chartjs.org/)
- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [FireBase SDK](https://firebase.google.com/docs/auth)
- [Chart.js](https://www.chartjs.org/docs/latest/)
- [Jest](https://jestjs.io/)
- [Prometheus](https://prometheus.io/)
- [KafkaJS](https://kafka.js.org/)

## Getting Started

### Requirements

<!-- Before starting setup you'll need to take the following steps:

- Have node installed. FranzView is tested to work on Node 14+.
- If you'd like to use our demo cluster, make sure you have Docker Desktop and Docker Compose installed and then check the [demo instructions](#prometheus-server-and-demo-cluster).
- Set up [JMX exporter](https://github.com/prometheus/jmx_exporter) on your cluster. You can find the configuration files and a copy of the JMX exporter jar file in the `configs/jmx_exporter` folder in this repo.
  1. If you're starting your Kafka cluster from the CLI you can set up JMX exporter following these commands:
  ```
  export KAFKA_OPTS='-javaagent:{PATH_TO_JMX_EXPORTER}/jmx-exporter.jar={PORT}:{PATH_TO_JMX_EXPORTER_KAFKA.yml}/kafka.yml'
  ```
  2. Launch or restart your broker as you normally would.
- Have a Prometheus metric server set up with targets setup for each of your brokers. You should use the `prometheus.template.yml` as a template.

Please check the docker-compose files in this repo as examples or to spin up a demo cluster. -->

### Installation

1. Clone down this repository:

```
git clone https://github.com/oslabs-beta/hyperionn
```

2. In the Hyperion root directory to install all dependencies:

```
npm install
```

4. Build your version of Hyperion:

```
npm run build
```

### When you're ready to use Hyperion

1. Start the server:

```
npm start
```

2. Hyperion defaults to running on port 3000. So simply go to http://localhost:3500. You can view your metrics and start managing your Kafka cluster!

## Contributors

- Anish Patel | [GitHub](https://github.com/justanotherguyonline) | [Linkedin](https://www.linkedin.com/in/anish-patel-759545123/)
- Kristin Green | [GitHub](https://github.com/kngreen) | [Linkedin](https://www.linkedin.com/in/kristin-green-101902a4/)
- Joey Friedman | [GitHub](https://github.com/fried-jo) | [Linkedin](https://www.linkedin.com/in/joseph-friedman-803803149/)
- Anita Duong | [GitHub](https://github.com/anitaduong98) | [Linkedin](https://www.linkedin.com/in/anita-duong/)


## Roadmap

Here are some features the Hyperion team is working on adding to the application in the near future:

- Additional metrics to view monitor performance
- Ability to customize dashboard with metrics that are important to your Kafka cluster
- End-to-end testing with Cypress
- Refactoring codebase to Typescript for 

If there is a feature you think would be useful to you and your team, or if you find any bugs, please [open an issue](https://github.com/oslabs-beta/hyperionn/issues). We are 

## Prometheus Server and Demo Cluster

<!-- We have a few different docker-compose files depending on your needs.

- If you just need a Kafka cluster (this will spin up a cluster with one zookeeper instance and three brokers ([localhost:9092](localhost:9092), [localhost:9093](localhost:9093), [localhost:9094](localhost:9094)):
  ```
  docker-compose -f docker-compose-kafka-only.yml up -d
  ```
- If you just need a Prometheus server:
  1. Create a `prometheus.yml` file from the template `prometheus.template.yml`
  1. Save it in the `configs/prometheus` folder
  1. Run the following command to spin up a Prometheus server running at http://localhost:9090:
  ```
  docker-compose -f docker-compose-prom-only.yml up -d
  ```
- If you just need want to spin up a Prometheus server + Kafka Cluster.:
  1. We already have a Prometheus config set up, so don't worry about it!
  1. Run the following command to spin up a Prometheus server running at http://localhost:9090 and 3 brokers ([localhost:9092](localhost:9092), [localhost:9093](localhost:9093), [localhost:9094](localhost:9094)):
  ```
  docker-compose -f docker-compose-kafka-prom.yml up -d
  ``` -->

## License

This product is licensed under the MIT License without restriction.





