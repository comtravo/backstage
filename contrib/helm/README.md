# Run Backstage with Helm chart (locally)

## Prerequisites

### K8s

[Install and Set Up kubectl on macOS](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/)
Spoiler:

```shell
brew install kubernetes-cli
```

### Helm

[Installing Helm](https://helm.sh/docs/intro/install/)
Spoiler:

```shell
brew install helm
```

### minikube

[Install minikube](https://minikube.sigs.k8s.io/docs/start/)
Guess what?

```shell
brew install minikube
```

## Build application image locally

Tested with:

- node v14.18.2
- npm 6.14.15
- yarn 6.14.15

```shell
yarn install --frozen-lockfile
NODE_OPTIONS=--max_old_space_size=4096 yarn tsc
yarn build
docker build -t backstage:local .

```

## Run

From repo root context:

```shell
minikube start
helm install
```
