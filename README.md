# 📇 Contact Manager App

A full-stack contact management application built with:

- **Frontend**: React
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Containerization**: Docker & Docker Compose
- **CI/CD**: Azure DevOps Pipeline (Build & Push Docker images)

...

## 📬 Contact


# Contact Manager App – Kubernetes Project Documentation (AKS + CI/CD)

## 1. Project Architecture
```
+----------------+       +----------------+       +----------------+
|   Frontend     | <---> |   Backend      | <---> |   MongoDB       |
| (LoadBalancer) |       | (ClusterIP)    |       | (ClusterIP + PVC)|
+----------------+       +----------------+       +----------------+

All deployed in AKS under same namespace.
Frontend is public via LoadBalancer; backend and DB are internal.
```

## 2. Project Flow
1. **Frontend** makes API requests to backend.
2. **Backend** connects to MongoDB using hardcoded URI.
3. MongoDB stores user/contact data.
4. All services are deployed via Kubernetes YAML files:
   - `frontend-deployment.yaml`
   - `backend-deployment.yaml`
   - `mongo-deployment.yaml`
   - `pvc.yaml` (MongoDB volume)
   - `namespace.yaml` (optional)

## 3. CI/CD Overview
Using **Azure DevOps Pipelines**:
- **CI (Build Pipeline):**
  - Trigger on push to main.
  - Build Docker images for frontend/backend.
  - Push to Azure Container Registry (ACR).
- **CD (Release Pipeline):**
  - Deploy built images to AKS.
  - Use `kubectl` and service connections.

## 4. Create Release Pipeline (Using UI)
1. Go to **Azure DevOps → Pipelines → Releases**.
2. Click **"New pipeline"**, choose **"Empty job"**.
3. Add an **artifact** from the build pipeline.
4. Add a **stage** (e.g., Deploy to AKS).
5. Add task: **Kubernetes → kubectl apply -f manifests/**.
6. Save and create a release.

## 5. Enable Auto-Trigger
- In the **artifact settings**, enable:
  > ✔️ **Continuous deployment trigger**

This ensures that new builds auto-trigger the release pipeline.

## 6. Configure Release Pipeline
- Add **Azure Resource Manager** or **Kubernetes service connection** to allow `kubectl` tasks.
- In `kubectl apply` task, point to folder where your YAMLs are:
  ```yaml
  kubectl apply -f $(System.DefaultWorkingDirectory)/_your-project/drop/manifests/
  ```

## 7. Deploying to AKS
Use Azure CLI or the release pipeline:

az aks get-credentials --resource-group <rg-name> --name <aks-cluster-name>
kubectl apply -f k8s-manifests/


## 8. Provide ACR Pull Access to AKS

az aks update   --name <aks-cluster>   --resource-group <rg>   --attach-acr <acr-name>


✅ This grants AKS permission to pull images from ACR automatically.

## 9. Troubleshooting Steps

| Issue                    | Fix                                                                 |
|--------------------------|----------------------------------------------------------------------|
| `ImagePullBackOff`       | Check ACR permissions. Use `az aks update --attach-acr`.             |
| `CrashLoopBackOff`       | Inspect container logs: `kubectl logs <pod-name>`.                  |
| `Unauthorized` in CI/CD  | Check Azure DevOps Service Connection to ACR.                        |
| LoadBalancer IP missing  | Wait a few minutes or run `kubectl get svc`.                         |
| Mongo connection fails   | Double-check the hardcoded URI and MongoDB service name in cluster.  |

