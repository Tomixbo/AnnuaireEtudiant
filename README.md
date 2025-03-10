# Annuaire Etudiant
## Project Objective  
Create a customized development environment and deploy a fully functional web application (student directory management == *Annuaire Etudiant*) on an **AWS EC2 server** using Docker.  

- **Containerization** of the existing web application (Python/Flask, MariaDB, Node.js/React) by creating specific Dockerfiles for each component.  
- **Orchestration** of the different containers using Docker Compose to set up a consistent local development environment.  
- **CI/CD Integration**: Automate the build and deployment process with Jenkins.  
- **Configuration** of the network, database, and application access.  
- **Deployment Security**: Implement best security practices, including an `.env` file for application secrets and an SSL certificate for HTTPS security.

## Docker installation
*Inspired by the official documention on [aws docs - install docker](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-docker.html)*

To install Docker on Amazon Linux 2023

- Update the installed packages and package cache on your instance.

    ```bash
    $ sudo yum update -y
    ```

- Install the most recent Docker Community Edition package.

    For Amazon Linux 2023, run the following:

    ```bash
    $ sudo yum install -y docker
    ```

- Start the Docker service.
    ```bash
    $ sudo service docker start
    ```
- Add the ec2-user to the docker group so that you can run Docker commands without using sudo.
    ```bash
    $ sudo usermod -a -G docker ec2-user
    ```
    *Pick up the new docker group permissions by logging out and logging back in again. To do this, close your current SSH terminal window and reconnect to your instance in a new one. Your new SSH session should have the appropriate docker group permissions.*

- Verify that the ec2-user can run Docker commands without using sudo.
    ```bash
    $ docker ps
    ```
    You should see the following output, confirming that Docker is installed and running:
    ```
     CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
    ```

#### Docker Compose CLI plugin
*Inspired by the official documention on [docker docs - install docker compose manually](https://docs.docker.com/compose/install/linux/#install-the-plugin-manually)*
- To download and install the Docker Compose CLI plugin, run:

    ```bash
    $ DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
    $ mkdir -p $DOCKER_CONFIG/cli-plugins
    $ curl -SL https://github.com/docker/compose/releases/download/v2.33.1/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
    ```
    This command downloads and installs the latest release of Docker Compose for the active user under `$HOME` directory.

    To install:

    - Docker Compose for all users on your system, replace `~/.docker/cli-plugins` with `/usr/local/lib/docker/cli-plugins.`
    - A different version of Compose, substitute `v2.33.1` with the version of Compose you want to use.
    - For a different architecture, `substitute x86_64` with the architecture you want.

- Apply executable permissions to the binary:
    ```bash
    $ chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
    ```
    or, if you chose to install Compose for all users:
    ```bash
    $ sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
    ```
- Test the installation.
    ```bash
    $ docker compose version
    ```
    Expected output:
    ```
    Docker Compose version v2.33.1
    ```

## Downloading and running Jenkins in Docker
inspired by the official Jenkins documentation: [Jenkins Pipeline - Docker](https://www.jenkins.io/doc/book/installing/docker/).
1. Create a bridge network in Docker using the following docker network create command:
    ```bash
    $ docker network create jenkins
    ```
2. In order to execute Docker commands inside Jenkins nodes, download and run the `docker:dind` Docker image using the following docker run command:

    ```bash
    $ docker run --name jenkins-docker --rm --detach \
        --privileged --network jenkins --network-alias docker \
        --env DOCKER_TLS_CERTDIR=/certs \
        --volume jenkins-docker-certs:/certs/client \
        --volume jenkins-data:/var/jenkins_home \
        --publish 2376:2376 \
        --publish 5173:5173 \
        docker:dind --storage-driver overlay2
    ```

3. Customize the official Jenkins Docker image, by executing the following two steps:
    - Create a Dockerfile with the following content:
    ```Dockerfile
    FROM jenkins/jenkins:2.492.2-jdk17
    USER root
    RUN apt-get update && apt-get install -y lsb-release
    RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
    https://download.docker.com/linux/debian/gpg
    RUN echo "deb [arch=$(dpkg --print-architecture) \
    signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
    https://download.docker.com/linux/debian \
    $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
    RUN apt-get update && apt-get install -y docker-ce-cli
    USER jenkins
    RUN jenkins-plugin-cli --plugins "blueocean docker-workflow"
    ```

    - Build a new docker image from this Dockerfile, and assign the image a meaningful name, such as `myjenkins-blueocean:2.492.2-1` :

    ```bash
    $ docker build -t myjenkins-blueocean:2.492.2-1 .
    ```
    *If you have not yet downloaded the official Jenkins Docker image, the above process automatically downloads it for you.*

4. Run your own `myjenkins-blueocean:2.492.2-1` image as a container in Docker using the following docker run command:
    ```bash
    $ docker run --name jenkins-blueocean --restart=on-failure --detach \
        --network jenkins --env DOCKER_HOST=tcp://docker:2376 \
        --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 \
        --publish 8080:8080 --publish 50000:50000 \
        --volume jenkins-data:/var/jenkins_home \
        --volume jenkins-docker-certs:/certs/client:ro \
        myjenkins-blueocean:2.492.2-1
    ```

5. Proceed to the [Post-installation setup wizard](#post-installation-setup-wizard).

### Post-installation setup wizard
After downloading, installing and running Jenkins using one of the procedures above (except for installation with Jenkins Operator), the post-installation setup wizard begins.

This setup wizard takes you through a few quick "one-off" steps to unlock Jenkins, customize it with plugins and create the first administrator user through which you can continue accessing Jenkins.

#### Unlocking Jenkins
- When you first access a new Jenkins controller, you are asked to unlock it using an automatically-generated password.

    Browse to http://server-ip:8080 (or whichever port you configured for Jenkins when installing it) and wait until the Unlock Jenkins page appears.

    ![Unlock Jenkins page](https://www.jenkins.io/doc/book/resources/tutorials/setup-jenkins-01-unlock-jenkins-page.jpg)

- From the Jenkins console log output, copy the automatically-generated alphanumeric password (between the 2 sets of asterisks).

    ![Jenkins console password](https://www.jenkins.io/doc/book/resources/tutorials/setup-jenkins-02-copying-initial-admin-password.png)

    Note:

    - The command: `sudo cat /var/lib/jenkins/secrets/initialAdminPassword` will print the password at console.

    - If you are running Jenkins in Docker using the official `jenkins/jenkins` image you can use `sudo docker exec ${CONTAINER_ID or CONTAINER_NAME} cat /var/jenkins_home/secrets/initialAdminPassword` to print the password in the console without having to exec into the container.

#### Customizing Jenkins with plugins

After unlocking Jenkins, the Customize Jenkins page appears. Here you can install any number of useful plugins as part of your initial setup.

Click one of the two options shown:

- Install suggested plugins - to install the recommended set of plugins, which are based on most common use cases.

- Select plugins to install - to choose which set of plugins to initially install. When you first access the plugin selection page, the suggested plugins are selected by default.

    *If you are not sure what plugins you need, choose Install suggested plugins. You can install (or remove) additional Jenkins plugins at a later point in time via the Manage Jenkins > Plugins page in Jenkins.*

    *In our case, we need essentialy to install : docker and github plugins*

The setup wizard shows the progression of Jenkins being configured and your chosen set of Jenkins plugins being installed. This process may take a few minutes.

#### Creating the first administrator user

Finally, after customizing Jenkins with plugins, Jenkins asks you to create your first administrator user.

- When the Create First Admin User page appears, specify the details for your administrator user in the respective fields and click Save and Finish.

- When the Jenkins is ready page appears, click Start using Jenkins.
    -  **Notes**:

        *This page may indicate Jenkins is almost ready! instead and if so, click Restart.*

        *If the page does not automatically refresh after a minute, use your web browser to refresh the page manually.*

        *If required, log in to Jenkins with the credentials of the user you just created and you are ready to start using Jenkins!*

