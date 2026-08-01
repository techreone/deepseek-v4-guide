# Deploy DeepSeek on Kubernetes: Production Guide

- **URL**: https://chat-deep.ai/guide/deepseek-kubernetes-deployment/
- **Published**: 2026-06-04T08:01:49+00:00
- **Modified**: 2026-07-29T12:08:45+00:00
- **Category**: DeepSeek Guides
- **Word count**: 4323
- **Code blocks**: 27
- **Description**: Deploy DeepSeek workloads on Kubernetes with GPU scheduling, persistent storage, health checks, autoscaling, security controls and production monitoring.

## H1


## H2 目录
- Quick Answer: How Do You Deploy DeepSeek on Kubernetes?
- Why Kubernetes Deployment for DeepSeek Requires Careful GPU Planning
- Architecture Overview
- Choosing the Right DeepSeek Deployment Option
- Prerequisites
- Hardware and Model Sizing
- Prepare GPU Support in Kubernetes
- Create Namespace, Secret, and PVC
- Primary Deployment Path: DeepSeek with vLLM on Kubernetes
- Test the DeepSeek Endpoint
- Alternative Path: DeepSeek with Ollama on Kubernetes
- Advanced Path: Ray Serve + vLLM for Large DeepSeek Models
- Expose the Service Safely
- Scaling DeepSeek on Kubernetes
- Monitoring and Observability
- Security Best Practices
- Performance Optimization
- Troubleshooting
- Cleanup
- FAQ
- Conclusion

## 正文
Last updated: June 1, 2026

A Kubernetes Deployment for DeepSeek is not just a normal web-service deployment with a larger container image. DeepSeek models can range from small distilled checkpoints that are practical for development environments to full-size Mixture-of-Experts models that require serious GPU, memory, networking, and scheduling planning. DeepSeek-R1 is available with full-size and distilled variants, and the DeepSeek-R1 model card notes that the R1 repository and model weights are MIT licensed while some distilled variants inherit considerations from their Qwen or Llama base models.

In this guide, you will build a Kubernetes-based DeepSeek inference endpoint using three deployment paths: a production-oriented vLLM deployment, a simpler Ollama deployment for demos and smaller models, and an advanced Ray Serve + vLLM option for distributed serving. vLLM provides an OpenAI-compatible HTTP server for endpoints such as /v1/chat/completions, while Ray Serve LLM provides a production framework for distributed LLM serving with OpenAI API compatibility.

The examples use a smaller placeholder model such as deepseek-ai/DeepSeek-R1-Distill-Qwen-7B so the Kubernetes YAML is realistic for testing. Replace it with your chosen DeepSeek model only after validating GPU memory, precision, context length, concurrency, and license requirements.


### Quick Answer: How Do You Deploy DeepSeek on Kubernetes?

To deploy DeepSeek on Kubernetes, prepare GPU-enabled nodes, install the NVIDIA GPU Operator or device plugin, create a namespace, store your Hugging Face token in a Kubernetes Secret, mount a PersistentVolumeClaim for model cache, and deploy a model-serving container such as vLLM. Expose the Pod with a Kubernetes Service, then test the OpenAI-compatible endpoint using curl or the OpenAI Python client. Use Ollama for quick demos, vLLM for production inference, and Ray Serve + vLLM for large or multi-node DeepSeek deployments. Kubernetes schedules NVIDIA GPUs through the nvidia.com/gpu resource after the relevant device plugin is installed.


### Why Kubernetes Deployment for DeepSeek Requires Careful GPU Planning

DeepSeek is a family of models, not a single fixed runtime profile. The DeepSeek-R1 repository lists full DeepSeek-R1 and R1-Zero as 671B total parameter models with 37B activated parameters and a 128K context length, while also listing distilled 1.5B, 7B, 8B, 14B, 32B, and 70B checkpoints based on Qwen and Llama series models.

This matters because a small distilled model can be deployed as a single Kubernetes Pod on one GPU, while full-size DeepSeek-R1, V3, V3.1, or V3.2-class models require multi-GPU or multi-node planning. DeepSeek-V3 is described as a 671B total parameter MoE model with 37B activated parameters per token, and DeepSeek-V3.1 lists 671B total parameters, 37B activated parameters, and 128K context length.

Do not treat any single GPU recommendation as universal. Hardware depends on the model variant, precision, quantization, context length, batch size, KV cache, tensor parallelism, pipeline parallelism, and traffic pattern. Google Cloud’s DeepSeek-V3.1-Base tutorial, for example, uses vLLM on a GKE Autopilot cluster with an A4 VM containing 8 B200 GPUs; that is a specific reference architecture, not a general minimum for every DeepSeek deployment.


### Architecture Overview

A typical DeepSeek model serving architecture on Kubernetes looks like this:


```
Client / App
    |
    v
Ingress / API Gateway / Service Mesh
    |
    v
Kubernetes Service
    |
    v
vLLM, Ollama, or Ray Serve Pod(s)
    |
    v
GPU Node Pool
    |
    +--> PersistentVolumeClaim / model cache
    |
    +--> Monitoring: Prometheus, Grafana, DCGM Exporter, vLLM metrics
```

The main production goal is to keep model weights cached, route traffic only through authenticated internal or gateway-controlled endpoints, and monitor both application-level latency and GPU-level saturation. NVIDIA’s GPU Operator can automate several NVIDIA software components needed for Kubernetes GPU nodes, including drivers, the NVIDIA Kubernetes device plugin, NVIDIA Container Toolkit, GPU Feature Discovery, and DCGM-based monitoring.


### Choosing the Right DeepSeek Deployment Option


Option | Best use case | Complexity | GPU support | Production readiness | Multi-node support | OpenAI-compatible API | Recommended model size
Ollama | Quick start, local-style demos, internal experiments | Low | Yes, with suitable runtime/device access | Limited for high-concurrency production | Not the main design goal | Partial OpenAI compatibility | Small/distilled models
vLLM | Production inference endpoint, batching, higher throughput | Medium | Yes | Strong production foundation | Single-node tensor parallelism and integrations | Yes | Small to mid-size models; larger with careful parallelism
Ray Serve + vLLM | Distributed serving, large models, advanced scaling | High | Yes | Strong for distributed production serving | Yes | Yes | Large DeepSeek models and multi-node workloads

Use Ollama when the team needs a fast demo or a private endpoint for smaller distilled DeepSeek models. Ollama provides an API for programmatic model interaction and documents OpenAI compatibility for parts of the OpenAI API.

Use vLLM when you need a production DeepSeek inference server with an OpenAI-compatible API. vLLM’s documentation describes Kubernetes deployment options and an OpenAI-compatible server that implements Completions and Chat APIs.

Use Ray Serve + vLLM when the model or workload exceeds a simple single-Pod deployment. Ray Serve LLM supports multi-node inference patterns, autoscaling, load balancing, OpenAI-compatible APIs, and distributed deployment capabilities.


### Prerequisites

You need a working Kubernetes cluster and permissions to create Deployments, Services, Secrets, PVCs, and optionally Ingress or RayService resources.

Minimum platform requirements:


Requirement | Notes
Kubernetes cluster | Managed Kubernetes or self-managed cluster
kubectl | Configured for the target cluster
Helm | Useful for NVIDIA GPU Operator, KubeRay, Prometheus, Grafana
GPU node pool | Required for practical LLM serving
NVIDIA GPU Operator or NVIDIA device plugin | Required so Kubernetes can expose nvidia.com/gpu
StorageClass and PVC support | Needed for model cache
Container registry access | Use pinned images, preferably from a trusted registry
Hugging Face token | Required for gated/private models and useful for authenticated pulls
Basic Kubernetes knowledge | Deployments, Services, Secrets, PVCs, probes, requests, limits

Kubernetes GPU support is based on device plugins. After the GPU vendor plugin is installed, the cluster exposes resources such as nvidia.com/gpu, and Pods can request GPUs in their container resource limits. Kubernetes documents that GPUs should be specified in limits; if requests are also specified, requests and limits must be equal.


### Hardware and Model Sizing

There is no universal “one GPU fits DeepSeek” answer. Sizing depends on:


Factor | Why it matters
Model variant | Distilled models are much smaller than full DeepSeek-R1/V3-class models
Precision | BF16, FP8, and quantized formats change memory and performance behavior
Context length | Longer context increases KV cache memory pressure
Concurrency | More simultaneous requests require more memory and scheduling headroom
Batch size | Higher batch sizes can improve throughput but increase latency and memory use
KV cache | Often the limiting factor for long-context serving
Tensor parallelism | Splits model computation across multiple GPUs
Pipeline parallelism | Splits layers/stages across devices or nodes
Storage speed | Slow model downloads can cause long startup times
Interconnect | Multi-node workloads can be limited by network/NCCL/RDMA configuration

Practical categories:


Category | Typical use
Small distilled model | Development, demos, CI validation, lightweight internal tools
Mid-size model | Team workloads, internal assistants, batch-like low-concurrency inference
Full-size DeepSeek-R1/V3/V3.1/V3.2 class | Multi-GPU or multi-node architecture with careful serving stack validation

Ray’s official DeepSeek R1 on Kubernetes example states that its full DeepSeek model guide requires two nodes, each with 8 H100 80GB GPUs. Treat that as a reference architecture for that specific example, not as a universal rule for every DeepSeek model or quantized variant.


### Prepare GPU Support in Kubernetes

First, confirm that your GPU nodes are visible:


```
kubectl get nodes -o wide
kubectl describe nodes | grep -i -A5 "nvidia.com/gpu"
```

A GPU node should report allocatable GPU resources similar to:


```
Allocatable:
  cpu:                32
  memory:             250Gi
  nvidia.com/gpu:     1
```

To schedule a DeepSeek inference Pod on GPU nodes, request the GPU resource in the container limits:


```
resources:
  limits:
    nvidia.com/gpu: "1"
```

If your GPU nodes are labeled, add a nodeSelector:


```
nodeSelector:
  accelerator: nvidia-gpu
```

If GPU nodes are tainted, add tolerations:


```
tolerations:
  - key: "nvidia.com/gpu"
    operator: "Exists"
    effect: "NoSchedule"
```

Kubernetes also supports node labels and node selectors for clusters with different GPU types, which is important when you have mixed A10, L4, A100, H100, B200, or other GPU pools.


### Create Namespace, Secret, and PVC

Create a namespace, Secret, and model cache PVC. The Secret stores your Hugging Face token and an API key for the vLLM endpoint. Kubernetes Secrets are designed for small sensitive values such as passwords, tokens, and keys, so do not bake tokens into images or commit them to Git.


```
apiVersion: v1
kind: Namespace
metadata:
  name: deepseek
---
apiVersion: v1
kind: Secret
metadata:
  name: deepseek-secrets
  namespace: deepseek
type: Opaque
stringData:
  HF_TOKEN: "<YOUR_HUGGING_FACE_TOKEN>"
  VLLM_API_KEY: "<YOUR_INTERNAL_API_KEY>"
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: deepseek-model-cache
  namespace: deepseek
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: "<YOUR_STORAGE_CLASS>"
  resources:
    requests:
      storage: 200Gi
```

Apply it:


```
kubectl apply -f deepseek-base.yaml
```

For GitOps, use an external secret manager or sealed secret workflow instead of committing plaintext Secret manifests.

Production secret warning: Kubernetes Secrets are not a complete secret-management solution by themselves. Enable encryption at rest for Secrets, restrict access with least-privilege RBAC, avoid exposing Secrets to unnecessary Pods, and prefer an external secret manager or Secrets Store CSI workflow for production environments.


### Primary Deployment Path: DeepSeek with vLLM on Kubernetes

This is the recommended path for most production-oriented DeepSeek vLLM Kubernetes deployments. vLLM’s Kubernetes documentation shows native Kubernetes deployment patterns, and its OpenAI-compatible server allows existing OpenAI-style clients to call local or self-hosted models with minimal client changes.

The following manifest deploys a single-replica DeepSeek inference server using vLLM. It uses a smaller distilled model placeholder for safety. Replace the model only after testing memory and throughput.


```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deepseek-vllm
  namespace: deepseek
  labels:
    app.kubernetes.io/name: deepseek-vllm
    app.kubernetes.io/component: inference
spec:
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: deepseek-vllm
  template:
    metadata:
      labels:
        app.kubernetes.io/name: deepseek-vllm
        app.kubernetes.io/component: inference
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "8000"
        prometheus.io/path: "/metrics"
    spec:
      terminationGracePeriodSeconds: 120
      nodeSelector:
        accelerator: nvidia-gpu
      tolerations:
        - key: "nvidia.com/gpu"
          operator: "Exists"
          effect: "NoSchedule"
      securityContext:
        fsGroup: 1000
      containers:
        - name: vllm
          image: "vllm/vllm-openai:<PINNED_VERSION_TAG>"
          imagePullPolicy: IfNotPresent
          command: ["vllm", "serve"]
          args:
            - "$(MODEL_ID)"
            - "--host"
            - "0.0.0.0"
            - "--port"
            - "8000"
            - "--served-model-name"
            - "deepseek-r1-distill"
            - "--dtype"
            - "auto"
            - "--api-key"
            - "$(VLLM_API_KEY)"
            # Tune these after load testing:
            # - "--max-model-len"
            # - "8192"
            # - "--gpu-memory-utilization"
            # - "0.90"
          env:
            - name: MODEL_ID
              value: "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B"
            - name: HF_HOME
              value: "/models/huggingface"
            - name: HF_TOKEN
              valueFrom:
                secretKeyRef:
                  name: deepseek-secrets
                  key: HF_TOKEN
            - name: HUGGING_FACE_HUB_TOKEN
              valueFrom:
                secretKeyRef:
                  name: deepseek-secrets
                  key: HF_TOKEN
            - name: VLLM_API_KEY
              valueFrom:
                secretKeyRef:
                  name: deepseek-secrets
                  key: VLLM_API_KEY
          ports:
            - name: http
              containerPort: 8000
          resources:
            requests:
              cpu: "4"
              memory: "32Gi"
            limits:
              cpu: "8"
              memory: "64Gi"
              nvidia.com/gpu: "1"
          volumeMounts:
            - name: model-cache
              mountPath: /models/huggingface
            - name: shm
              mountPath: /dev/shm
          startupProbe:
            httpGet:
              path: /health
              port: http
            failureThreshold: 120
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /health
              port: http
            initialDelaySeconds: 10
            periodSeconds: 10
            failureThreshold: 6
          livenessProbe:
            httpGet:
              path: /health
              port: http
            initialDelaySeconds: 60
            periodSeconds: 30
            failureThreshold: 5
          securityContext:
            allowPrivilegeEscalation: false
            capabilities:
              drop: ["ALL"]
      volumes:
        - name: model-cache
          persistentVolumeClaim:
            claimName: deepseek-model-cache
        - name: shm
          emptyDir:
            medium: Memory
            sizeLimit: "8Gi"
            # Increase shm size for larger models, tensor parallelism, or high-concurrency workloads after load testing.
---
apiVersion: v1
kind: Service
metadata:
  name: deepseek-vllm
  namespace: deepseek
  labels:
    app.kubernetes.io/name: deepseek-vllm
spec:
  type: ClusterIP
  selector:
    app.kubernetes.io/name: deepseek-vllm
  ports:
    - name: http
      port: 8000
      targetPort: http
```


```
# Increase shm size for larger models, tensor parallelism, or high-concurrency workloads after load testing.
```

Important parts of the manifest:


Field | Purpose
MODEL_ID | Hugging Face model identifier. Start with a distilled model.
HF_HOME | Places model cache on the mounted PVC.
HF_TOKEN | Authenticates model downloads where required.
VLLM_API_KEY | Enables basic API-key protection at the vLLM layer.
nvidia.com/gpu | Requests a GPU from Kubernetes.
startupProbe | Gives large model downloads enough time before Kubernetes restarts the container.
readinessProbe | Prevents traffic before the model server is ready.
prometheus.io/* annotations | Allows Prometheus scraping in clusters that use annotation discovery.
ClusterIP Service | Keeps the model endpoint internal by default.

For DeepSeek-R1-family models, follow the model card’s usage recommendations. The DeepSeek-R1 model card recommends avoiding a system prompt and putting instructions in the user prompt for expected behavior.


### Test the DeepSeek Endpoint

Apply the vLLM manifest:


```
kubectl apply -f deepseek-vllm.yaml
```

Check status:


```
kubectl -n deepseek get pods
kubectl -n deepseek describe pod -l app.kubernetes.io/name=deepseek-vllm
kubectl -n deepseek logs -l app.kubernetes.io/name=deepseek-vllm -f
```

Port-forward the Service:


```
kubectl -n deepseek port-forward svc/deepseek-vllm 8000:8000
```

Test the OpenAI-compatible Chat Completions endpoint:


```
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_INTERNAL_API_KEY>" \
  -d '{
    "model": "deepseek-r1-distill",
    "messages": [
      {
        "role": "user",
        "content": "Explain the steps to deploy a GPU workload on Kubernetes. Keep the answer concise."
      }
    ],
    "temperature": 0.6,
    "max_tokens": 512
  }'
```

You can also call the endpoint with the OpenAI Python client because vLLM exposes an OpenAI-compatible server.


```
from openai import OpenAI
client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="<YOUR_INTERNAL_API_KEY>",
)
response = client.chat.completions.create(
    model="deepseek-r1-distill",
    messages=[
        {
            "role": "user",
            "content": "Give me a Kubernetes checklist for serving DeepSeek with GPUs."
        }
    ],
    temperature=0.6,
    max_tokens=512,
)
print(response.choices[0].message.content)
```


### Alternative Path: DeepSeek with Ollama on Kubernetes

A DeepSeek Ollama Kubernetes deployment is useful for demos, local-style workflows, and smaller distilled models. Ollama documents programmatic model interaction through its API, a Docker workflow, and OpenAI compatibility for parts of the OpenAI API.

Use Ollama when the goal is fast experimentation, not maximum production concurrency. For high-throughput production inference, vLLM is usually the better default.


```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deepseek-ollama
  namespace: deepseek
  labels:
    app.kubernetes.io/name: deepseek-ollama
spec:
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: deepseek-ollama
  template:
    metadata:
      labels:
        app.kubernetes.io/name: deepseek-ollama
    spec:
      nodeSelector:
        accelerator: nvidia-gpu
      tolerations:
        - key: "nvidia.com/gpu"
          operator: "Exists"
          effect: "NoSchedule"
      containers:
        - name: ollama
          image: "ollama/ollama:<PINNED_VERSION_TAG>"
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 11434
          resources:
            requests:
              cpu: "2"
              memory: "16Gi"
            limits:
              cpu: "6"
              memory: "48Gi"
              nvidia.com/gpu: "1"
          volumeMounts:
            - name: ollama-data
              mountPath: /root/.ollama
      volumes:
        - name: ollama-data
          persistentVolumeClaim:
            claimName: ollama-model-cache
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ollama-model-cache
  namespace: deepseek
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: "<YOUR_STORAGE_CLASS>"
  resources:
    requests:
      storage: 100Gi
---
apiVersion: v1
kind: Service
metadata:
  name: deepseek-ollama
  namespace: deepseek
spec:
  type: ClusterIP
  selector:
    app.kubernetes.io/name: deepseek-ollama
  ports:
    - name: http
      port: 11434
      targetPort: http
```

Apply it:


```
kubectl apply -f deepseek-ollama.yaml
```

Pull a DeepSeek model into the Ollama PVC:


```
kubectl -n deepseek exec deploy/deepseek-ollama -- ollama pull deepseek-r1:8b
```

Test through port-forwarding:


```
kubectl -n deepseek port-forward svc/deepseek-ollama 11434:11434
curl http://localhost:11434/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-r1:8b",
    "messages": [
      {
        "role": "user",
        "content": "Write a short Kubernetes GPU readiness checklist."
      }
    ],
    "stream": false
  }'
```

Ollama is simpler, but for production concurrency you should validate request queuing, memory pressure, model loading time, API authentication, and autoscaling behavior before exposing it to internal users.


### Advanced Path: Ray Serve + vLLM for Large DeepSeek Models

Use Ray Serve DeepSeek Kubernetes architecture when a single Pod is no longer enough. Ray Serve LLM specializes Ray Serve for distributed LLM serving and includes production features such as autoscaling, load balancing, multi-node deployments, OpenAI-compatible APIs, metrics, and Grafana dashboards.

Ray’s Kubernetes DeepSeek example uses KubeRay, Ray Serve, and vLLM to deploy deepseek-ai/DeepSeek-R1 on Kubernetes and expose an efficient OpenAI-compatible LLM service.

Below is a conceptual RayService manifest. Treat it as a starting template, not a drop-in production manifest. Exact values depend on GPU type, node count, model variant, vLLM version, Ray version, storage, and network topology.

Image note: For Ray Serve + vLLM, use a pinned custom image that includes a Ray version compatible with KubeRay, Ray Serve LLM dependencies, vLLM, CUDA/NCCL libraries, and any model-specific runtime packages. A plain base Ray image may not include everything required for production LLM serving.


```
apiVersion: ray.io/v1
kind: RayService
metadata:
  name: deepseek-rayserve
  namespace: deepseek
spec:
  serveConfigV2: |
    applications:
      - name: deepseek
        import_path: ray.serve.llm:build_openai_app
        route_prefix: "/"
        args:
          llm_configs:
            - model_loading_config:
                model_id: deepseek-r1
                model_source: deepseek-ai/DeepSeek-R1
              engine_kwargs:
                dtype: bfloat16
                max_model_len: 8192
                tensor_parallel_size: <GPUS_PER_REPLICA>
                pipeline_parallel_size: <PIPELINE_PARALLEL_SIZE>
                gpu_memory_utilization: 0.90
              deployment_config:
                autoscaling_config:
                  min_replicas: 1
                  max_replicas: 2
                  target_ongoing_requests: 64
                max_ongoing_requests: 128
  rayClusterConfig:
    rayVersion: "<PINNED_RAY_VERSION>"
    headGroupSpec:
      serviceType: ClusterIP
      rayStartParams:
        dashboard-host: "0.0.0.0"
      template:
        spec:
          containers:
            - name: ray-head
              image: "rayproject/ray:<PINNED_RAY_IMAGE_TAG>"
              ports:
                - containerPort: 6379
                  name: gcs
                - containerPort: 8265
                  name: dashboard
                - containerPort: 8000
                  name: serve
              env:
                - name: HUGGING_FACE_HUB_TOKEN
                  valueFrom:
                    secretKeyRef:
                      name: deepseek-secrets
                      key: HF_TOKEN
              resources:
                requests:
                  cpu: "4"
                  memory: "16Gi"
                limits:
                  cpu: "8"
                  memory: "32Gi"
    workerGroupSpecs:
      - groupName: gpu-workers
        replicas: <GPU_WORKER_REPLICAS>
        minReplicas: <GPU_WORKER_MIN_REPLICAS>
        maxReplicas: <GPU_WORKER_MAX_REPLICAS>
        rayStartParams: {}
        template:
          spec:
            nodeSelector:
              accelerator: nvidia-gpu
            tolerations:
              - key: "nvidia.com/gpu"
                operator: "Exists"
                effect: "NoSchedule"
            containers:
              - name: ray-worker
                image: "rayproject/ray:<PINNED_RAY_IMAGE_TAG>"
                env:
                  - name: HUGGING_FACE_HUB_TOKEN
                    valueFrom:
                      secretKeyRef:
                        name: deepseek-secrets
                        key: HF_TOKEN
                resources:
                  requests:
                    cpu: "16"
                    memory: "128Gi"
                  limits:
                    cpu: "32"
                    memory: "256Gi"
                    nvidia.com/gpu: "<GPUS_PER_WORKER_POD>"
```

Ray’s documented serveConfigV2 format uses ray.serve.llm:build_openai_app, llm_configs, model_loading_config, engine_kwargs, and deployment_config to configure an OpenAI-compatible LLM application.

For large DeepSeek deployments, validate NCCL, RDMA or high-performance networking, topology-aware scheduling, image size, shared cache, and rollout strategy before production. Multi-node LLM serving failures are often infrastructure failures, not model-code failures.


### Expose the Service Safely

Do not expose an unauthenticated DeepSeek inference endpoint directly to the public internet.

Recommended exposure patterns:


Pattern | Use case
ClusterIP | Internal services inside the cluster
Private Ingress | Internal platform users or private VPC
API Gateway | Auth, quotas, rate limits, request logging
Service mesh | mTLS, policy, internal traffic control
Public Ingress | Only behind strong auth, TLS, and rate limiting

A minimal internal Ingress may look like this:


```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: deepseek-vllm
  namespace: deepseek
  annotations:
    nginx.ingress.kubernetes.io/proxy-read-timeout: "600"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "600"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - deepseek.internal.example.com
      secretName: deepseek-tls
  rules:
    - host: deepseek.internal.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: deepseek-vllm
                port:
                  number: 8000
```

Add authentication before the request reaches the model server. For production, enforce API keys or identity-aware proxy at the gateway layer, not just in application code.


### Scaling DeepSeek on Kubernetes

Scaling LLMs is different from scaling stateless REST APIs. A normal CPU-based HPA can be misleading because the bottleneck is often GPU memory, KV cache pressure, waiting queue depth, tokens per second, time-to-first-token, or time per output token.

Kubernetes HPA autoscaling/v2 supports memory and custom metrics, which is important for LLM inference workloads where CPU is not the main saturation signal.

Example HPA using a custom metric exposed through Prometheus Adapter:


```
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: deepseek-vllm
  namespace: deepseek
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: deepseek-vllm
  minReplicas: 1
  maxReplicas: 4
  metrics:
    - type: Pods
      pods:
        metric:
          name: vllm_num_requests_waiting
        target:
          type: AverageValue
          averageValue: "8"
```

This assumes you have created a Prometheus recording rule or adapter mapping called vllm_num_requests_waiting. vLLM’s metrics documentation notes that autoscaling and load balancing are common use cases for vLLM metrics, but also warns that identifying saturation for model serving is non-trivial.

For smaller models, replica scaling may work well if each replica owns a GPU. For large models using tensor or pipeline parallelism, scaling often means adding a full replica group, not simply adding one Pod.


### Monitoring and Observability

Monitor the model server, the GPU, the Kubernetes workload, and the user experience.

Key metrics:


Layer | Metrics
GPU | utilization, memory used, memory temperature, power, ECC errors
vLLM | request latency, queue depth, tokens/sec, time-to-first-token, time per output token
Kubernetes | Pod restarts, Pending Pods, probe failures, OOMKilled events
API | request rate, error rate, timeout rate, status code distribution
Storage | model download duration, PVC latency, cache hit behavior
Ray | Serve deployment status, actor health, object store memory, worker failures

NVIDIA DCGM Exporter exposes GPU metrics at an HTTP /metrics endpoint for monitoring systems such as Prometheus and can run as a DaemonSet on GPU nodes.

For vLLM, scrape the model server metrics endpoint and create dashboards for queue length, request latency, throughput, and GPU utilization. For Ray Serve, also monitor the Ray dashboard and Ray Serve deployment status.


### Security Best Practices

A production DeepSeek inference endpoint can process sensitive prompts, internal code, customer data, or operational logs. Treat it as a sensitive service.

Security checklist:


Area | Recommendation
Secrets | Store tokens in Kubernetes Secrets or external secret managers
RBAC | Grant only the permissions required for deployment and runtime
NetworkPolicy | Restrict ingress to API gateways and trusted namespaces
TLS | Use TLS at Ingress or gateway
Authentication | Require API keys, OIDC, mTLS, or gateway-based auth
Rate limiting | Prevent runaway spend and GPU saturation
Image security | Pin images, scan images, avoid latest tags
Registry | Prefer private or trusted registries
Prompt logging | Define retention, redaction, and privacy rules
Data privacy | Avoid logging raw prompts unless explicitly approved
License review | Review each model variant and base model license
Supply chain | Scan manifests, images, and dependencies

Kubernetes RBAC guidance emphasizes least privilege and warns against overly permissive wildcard permissions.

NetworkPolicies control what network traffic is allowed for selected Pods, including ingress and egress behavior, so use them to limit which workloads can call your DeepSeek inference server.

Example NetworkPolicy allowing ingress only from an API gateway namespace:

This example uses Kubernetes’ built-in namespace label kubernetes.io/metadata.name. If your cluster uses custom namespace labels, replace the selector with your approved label strategy.


```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-gateway-to-deepseek
  namespace: deepseek
spec:
  podSelector:
    matchLabels:
      app.kubernetes.io/name: deepseek-vllm
  policyTypes:
    - Ingress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: api-gateway
      ports:
        - protocol: TCP
          port: 8000
```


### Performance Optimization

Start with correctness, then tune performance.

High-impact tuning areas:


Tuning area | Practical guidance
Model choice | Use the smallest model that satisfies quality requirements
Serving engine | Use vLLM for production batching and OpenAI-compatible serving
Precision | Test BF16, FP8, or quantized formats depending on model support
Context length | Lower max_model_len if you do not need long context
KV cache | Plan memory for concurrency and context length
Tensor parallelism | Use when a model needs multiple GPUs in one replica
Pipeline parallelism | Consider for larger distributed deployments
Model cache | Use PVC, node-local SSD, or fast storage to avoid repeated downloads
Startup | Use startup probes long enough for model loading
Concurrency | Increase gradually and measure TTFT/TPOT
Scheduling | Pin workloads to compatible GPU node pools
Rollouts | Avoid evicting all model replicas at once

Do not jump directly to maximum context length and high concurrency. Long context increases KV cache pressure, and the best values are usually discovered through load testing with prompts that look like your real workload.


### Troubleshooting


Problem | Likely cause | How to fix
Pod stuck Pending | No GPU node available, wrong node selector, insufficient resources | Check kubectl describe pod, GPU node labels, taints, and allocatable nvidia.com/gpu
GPU not visible | NVIDIA device plugin or GPU Operator not installed correctly | Verify node drivers, GPU Operator status, and kubectl describe node GPU resources
CUDA mismatch | Image CUDA stack incompatible with host driver/runtime | Use a compatible pinned image and validate NVIDIA runtime configuration
Model download fails | Missing token, network egress blocked, wrong model ID | Check HF_TOKEN, egress policy, DNS, and Hugging Face model name
401 from Hugging Face | Invalid token or insufficient access | Recreate Secret and confirm token permissions
CUDA out of memory | Model too large, context too long, concurrency too high | Use smaller model, quantization, lower context, lower utilization, or more GPUs
Slow startup | Large model download or slow PVC | Pre-warm cache, use faster storage, or bake approved weights into internal artifact storage
Service not reachable | Wrong Service selector, port mismatch, NetworkPolicy | Check endpoints with kubectl get endpoints -n deepseek
Readiness probe fails | Model still loading or /health unavailable | Increase startup probe window and inspect logs
Poor throughput | GPU underutilization, queue bottleneck, small batch, slow tokenization | Check vLLM metrics, tune concurrency, and benchmark realistic traffic
Multi-node NCCL/RDMA issues | Network, driver, or topology misconfiguration | Validate NCCL tests, node networking, firewall rules, and GPU topology
Model too large for GPU memory | Full model used on insufficient hardware | Use distilled variant, quantization, tensor parallelism, or Ray Serve + vLLM


### Cleanup

Delete the vLLM deployment:


```
kubectl -n deepseek delete deployment deepseek-vllm
kubectl -n deepseek delete service deepseek-vllm
```

Delete the Ollama deployment:


```
kubectl -n deepseek delete deployment deepseek-ollama
kubectl -n deepseek delete service deepseek-ollama
kubectl -n deepseek delete pvc ollama-model-cache
```

Delete shared resources:


```
kubectl -n deepseek delete pvc deepseek-model-cache
kubectl delete namespace deepseek
```

For Ray Serve, delete the RayService:


```
kubectl -n deepseek delete rayservice deepseek-rayserve
```


### FAQ


#### Can I deploy DeepSeek on Kubernetes?

Yes. You can deploy DeepSeek on Kubernetes using vLLM, Ollama, Ray Serve, SGLang, or other serving stacks. For production, vLLM and Ray Serve + vLLM are strong options because they expose OpenAI-compatible APIs and support production inference patterns.


#### What is the best way to deploy DeepSeek on Kubernetes?

For most production use cases, the best starting point is vLLM on GPU-enabled Kubernetes nodes. Use Ollama for quick demos and Ray Serve + vLLM for larger distributed deployments.


#### Should I use Ollama or vLLM for DeepSeek?

Use Ollama for simple experiments, small distilled models, and low-complexity internal demos. Use vLLM when you need a more production-oriented DeepSeek inference server with OpenAI-compatible endpoints, batching, metrics, and stronger Kubernetes deployment patterns.


#### Does DeepSeek need GPUs on Kubernetes?

For practical LLM serving, yes. Small models may run on CPU for testing, but production DeepSeek inference should use GPUs. Kubernetes supports GPU scheduling through vendor device plugins and exposes resources such as nvidia.com/gpu after the plugin is installed.


#### Can I run DeepSeek-R1 on a single GPU?

A small distilled DeepSeek-R1 model may run on a single suitable GPU depending on precision, context length, and concurrency. Full DeepSeek-R1-class models are not single small-GPU workloads and require serious multi-GPU or multi-node planning.


#### How do I expose DeepSeek as an OpenAI-compatible API?

Deploy a serving stack such as vLLM or Ray Serve LLM and expose the Kubernetes Service internally or through an authenticated gateway. vLLM supports OpenAI-compatible endpoints such as /v1/chat/completions, and Ray Serve LLM aligns with vLLM’s OpenAI-compatible API.


#### How do I scale DeepSeek on Kubernetes?

For small models, run multiple replicas where each replica has its own GPU. For larger models, use tensor parallelism, pipeline parallelism, or Ray Serve + vLLM. Use custom metrics such as queue depth, tokens/sec, latency, and GPU utilization instead of relying only on CPU-based HPA.


#### Is self-hosting DeepSeek better than using the hosted API?

Self-hosting gives you more control over data locality, network boundaries, model variants, and infrastructure. The hosted API is usually simpler operationally. Choose self-hosting when compliance, customization, private networking, or cost control at scale justifies the operational burden.


### Conclusion

A successful Kubernetes Deployment for DeepSeek starts with the right model choice. Use Ollama for quick starts and small distilled models. Use vLLM for production Kubernetes inference with an OpenAI-compatible DeepSeek API. Use Ray Serve + vLLM when the model or traffic pattern requires distributed multi-node serving.

The most important production decisions are GPU planning, model-size selection, cache strategy, authentication, monitoring, autoscaling signals, and security controls. Full-size DeepSeek models require careful multi-GPU or multi-node architecture, while distilled models are much more practical for demos and smaller internal workloads.

## 内部链接
- [DeepSeek](https://chat-deep.ai/)

## 外部链接
- [DeepSeek-R1 model card](https://huggingface.co/deepseek-ai/DeepSeek-R1)
- [(no anchor)](https://docs.vllm.ai/en/latest/serving/online_serving/openai_compatible_server/)
- [OpenAI-compatible HTTP server](https://docs.vllm.ai/en/stable/serving/online_serving/openai_compatible_server/)
- [Kubernetes schedules NVIDIA GPUs](https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/)
- [DeepSeek-R1 repository](https://github.com/deepseek-ai/DeepSeek-R1)
- [DeepSeek-V3](https://huggingface.co/deepseek-ai/DeepSeek-V3)
- [DeepSeek-V3.1](https://huggingface.co/deepseek-ai/DeepSeek-V3.1)
- [Google Cloud’s DeepSeek-V3.1-Base tutorial](https://docs.cloud.google.com/ai-hypercomputer/docs/tutorials/gpu/deepseek-vllm-inference)
- [NVIDIA’s GPU Operator](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html)
- [Ollama](https://docs.ollama.com/api/introduction)
- [OpenAI compatibility](https://docs.ollama.com/api/openai-compatibility)
- [device plugins](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/)
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)
- [vLLM’s Kubernetes documentation](https://docs.vllm.ai/en/stable/deployment/k8s/)
- [Ray Serve LLM](https://docs.ray.io/en/latest/serve/llm/index.html)
- [Ray’s Kubernetes DeepSeek example](https://docs.ray.io/en/latest/cluster/kubernetes/examples/rayserve-deepseek-example.html)
- [Kubernetes HPA autoscaling/v2](https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/)
- [NVIDIA DCGM Exporter](https://docs.nvidia.com/datacenter/dcgm/latest/gpu-telemetry/dcgm-exporter.html)
- [Kubernetes RBAC guidance](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
- [NetworkPolicies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)