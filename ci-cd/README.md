# Concourse Boilerplate

<p align="center">
  <img width="280" height="280" src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.brandeps.com%2Flogo-download%2FC%2FConcourse-01.png&f=1">
</p>

Boilerplate with sample configurations for a [Concourse](https://concourse-ci.org/) CI/CD instance

### Prerequisites

You must have the following installed for this to work:
1. [Docker](https://docs.docker.com/install/)
2. [Docker Compose](https://docs.docker.com/compose/install/)
3. [Fly CLI](https://concourse-ci.org/fly.html)

### Getting Started
1. Edit the `.env` file with the desired Postgres and Concourse settings
2. Run `./keys/generate.sh` to generate the proper Concourse auth keys
3. Run `docker-compose up -d` to get Concourse running locally

   You can now navigate to `http://127.0.0.1:8080` and see your Concourse instance running.
   (Make sure to use your IP instead of `localhost` for your URL; this is because of a bug in Concourse where
   auth redirection fails)

   You can login with the credentials specified in the `.env` file.
4. Run `fly login -t main -c http://127.0.0.1:8080` and login with the admin credentials used above.
5. Run `fly set-pipeline -t main -c sample-pipeline/pipeline.yml -p "Sample Pipeline"`

   Replace `main` with the desired name of the Concourse project, and replace
   `Sample Pipeline` with the desired pipeline name.
6. Fin.

   You can see the sample pipeline at your local Concourse instance.
   (Note: You may have to "unpause" the pipeline on start, which can be done from the UI)
   
### Resources

If you'd like to learn more about how Concourse works (e.g. what the hell is a "Concourse Resource"?)
take a look at the [Concourse Docs](https://concourse-ci.org/docs.html)
