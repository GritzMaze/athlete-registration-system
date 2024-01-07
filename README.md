<div id="top"></div>

<div align="center">

![Contributors](https://img.shields.io/github/contributors/GritzMaze/athlete-registration-system?color=brightgreen&logo=github&logoColor=181717)
![Forks](https://img.shields.io/github/forks/GritzMaze/athlete-registration-system?color=blue&logo=github&logoColor=181717)
![Stars](https://img.shields.io/github/stars/GritzMaze/athlete-registration-system?color=blue&logo=github&logoColor=181717)
![Issues](https://img.shields.io/github/issues/GritzMaze/athlete-registration-system?color=yellow&logo=github&logoColor=181717)
![License](https://img.shields.io/badge/license-MIT-green)

 </div>

 <br>
 <div align="center">
    <a href="https://github.com/GritzMaze/athlete-registration-system/actions/workflows/master-build.yml"><img src="https://github.com/GritzMaze/athlete-registration-system/actions/workflows/master-build.yml/badge.svg" alt="build" ></a>
    <a href="https://github.com/GritzMaze/athlete-registration-system/actions/workflows/master-test.yml"><img src="https://github.com/GritzMaze/athlete-registration-system/actions/workflows/master-test.yml/badge.svg" alt="build" ></a>
    <a href="https://github.com/GritzMaze/athlete-registration-system/actions/workflows/release.yml"><img src="https://github.com/GritzMaze/athlete-registration-system/actions/workflows/release.yml/badge.svg" alt="build" ></a>
 </div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="#">
  <!-- <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://i.imgur.com/KyDgAFI.png">
    <source media="(prefers-color-scheme: light)" srcset="https://i.imgur.com/WoKCj3e.png">
    <img src="https://i.imgur.com/KyDgAFI.png" alt="Logo" width="" height="300">
    </picture> -->
  </a>
</div>
<br>
<br>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#introduction">Introduction</a>
      <ul>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#known-bugs">Known Bugs</a></li>
      </ul>
    </li>
    <li>
      <a href="#installation">Installation</a>
      <ul>
        <li><a href="#development">Development</a></li>
      </ul>
    </li>
    <li><a href="#deployment-process">Deployment process</a>
      <ul>
        <li><a href="#development">Development</a></li>
        <li><a href="#testing">Testing</a></li>
        <li><a href="#continuous-integration">Continuous Integration</a></li>
        <li><a href="#dockerization">Dockerization</a></li>
        <li><a href="#deployment-to-kubernetes">Deployment to Kubernetes</a></li>
      </ul>
    </li>
    <li><a href="#faq">FAQ</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>

<br>
<!-- Introduction -->

# Introduction

TODO: Add description

<div align="right"><p align="right">(<a href="#top">back to top</a>)</p></div>

# Requirements

This project requires the following software:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

<div align="right"><p align="right">(<a href="#top">back to top</a>)</p></div>

## Built With

The app has been built with the following technologies:

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Material-UI](https://material-ui.com/)
- [Prisma ORM](https://prisma.io/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

<div align="right"><p align="right">(<a href="#top">back to top</a>)</p></div>

# Known bugs

- TBD
<div align="right"><p align="right">(<a href="#top">back to top</a>)</p></div>

<!-- GETTING STARTED -->

# Installation

In order to install the project locally, you need to have Docker installed.

## Development

1. Clone the repo

```sh
git clone https://github.com/GritzMaze/athlete-registration-system.git
```

2. Configure the environment variables in the docker-compose.yml file or you can leave the default ones.

```yml
DATABASE_URL:
JWT_KEY:
JWT_EXPIRATION: 
APP_PORT: 
BCRYPT_SALT_ROUNDS:
LOG_LEVEL: 
LOG_OUTPUT:

POSTGRES_PASSWORD:
POSTGRES_USER:
POSTGRES_DB:
```

3. Compose the project

```sh
docker-compose up --build -d
```

<div align="right"><p align="right">(<a href="#top">back to top</a>)</p></div>

# Deployment process

## Development
Developers work on features in their local environment. Once the feature is complete, a feature branch is created and pushed to the repository. A pull request is then created to merge the feature branch into the main branch. The pull request is reviewed by other developers and then merged into the main branch.

## Testing
Before pushing to the repository, the pre-push hook in the .husky directory runs to ensure that all tests pass and there are no linting errors.

## Continuous Integration
There are two main workflows in the .github/workflows directory. `The master-build.yml` workflow check if the branch can be build. `The master-test.yml` workflow validates if all unit testing in the application pass.

## Dockerization
The application is dockerized using the Dockerfiles in the client and server directories. These are deployment images that are used in the Kubernetes deployment. There aren't images for local development at this time.

## Deployment to Kubernetes

<picture>
<img src="https://i.imgur.com/f9WDgBS.png" alt="Deployment pipeline" />
</picture>

### Stages:

#### 1. Build docker images

The first stage of the pipeline is to build the docker images for the client and server. The images are then pushed to the Github registry.

#### 2. Scan docker images

The second stage of the pipeline is to scan the docker images for vulnerabilities. The results are uploaded to the security tab in the repository.

#### 3.1 Deploy client to K8s

Client is deployed to the Kubernetes cluster using the image from the Github registry. The deployment is exposed using a load balancer service. Pod configuration is stored in the `manifests/client-deployment.yml` file. Environment variables for the client are passed on docker build as build arguments and built with the image.

#### 3.2 Deploy database to K8s

Database is deployed to the Kubernetes cluster using postgres 15.0 image. The pod has persistent volume storage to retain the database on deploy. The stage will not complete if the pod is not up and running in 3 minute. Postgres service is expose so we can run the database schema migrations from the github actions. 

#### 3.3 Deploy server to K8s

Server is deployed to the Kubernetes cluster using the image from the Github registry. The deployment is exposed using a load balancer service. Pod configuration is stored in the `manifests/server-deployment.yml` file. Server awaits for the database to be ready before starting.

#### 4. Github release

On successful deployment to the Kubernetes cluster, a Github release is created.

#### 5. Swagger documentation

Swagger documentation is generated on successful deployment to the Kubernetes cluster. The documentation is available on <strong><a href="https://gritzmaze.github.io/athlete-registration-system/">github-pages</a></strong>.


# FAQ

- **How to run the tests?**

  - Currently, only the server has tests. To run them, you need to go to the server directory and run the following command:

  ```sh
    npm run test
    ```

<div align="right"><p align="right">(<a href="#top">back to top</a>)</p></div>

# License

The project is distributed under `MIT`. <br/>
Description of the license can be found [here](https://opensource.org/licenses/MIT).

<div align="right"><p align="right">(<a href="#top">back to top</a>)</p></div>

# Contributors

<table>
  <tr>
    <td align="center"><a href="https://github.com/GritzMaze"><img src="https://i.imgur.com/5XntyAW.jpg" width="100px;" alt=""/><br /><sub><b>Vesselin Jivkov</b></sub></a><br /> <a href="#" title="Student">💻</a></td>
    </tr>
</table>

<div align="right"><p align="right">(<a href="#top">back to top</a>)</p></div>
