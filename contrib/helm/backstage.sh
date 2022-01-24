#!/usr/bin/env bash

helm install backstage backstage/ --values backstage/values.yaml

minikube service backstage --url
