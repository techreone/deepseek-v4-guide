# DeepSeek Docker Deployment: API, Ollama & vLLM

- **URL**: https://chat-deep.ai/guide/deepseek-docker-deployment/
- **Published**: 2026-05-01T18:22:00+00:00
- **Modified**: 2026-07-29T12:08:05+00:00
- **Category**: DeepSeek Guides
- **Word count**: 4290
- **Code blocks**: 28
- **Description**: Deploy DeepSeek with Docker using the hosted V4 API, Ollama, Docker Model Runner or vLLM, with secure Compose examples and production safeguards.

## H1


## H2 目录
- Quick Answer: Which DeepSeek Docker Deployment Should You Use?
- What “DeepSeek Docker Deployment” Actually Means
- Prerequisites
- Path 1: Dockerize an App That Calls the Hosted DeepSeek API
- Path 2: Add a LiteLLM Proxy When Teams Need a Shared Gateway
- Path 3: Run DeepSeek Locally with Ollama and Open WebUI
- Path 4: Use Docker Model Runner for Docker-Native Local Models
- Path 5: Self-Host DeepSeek with vLLM in Docker
- Path 6: Use SGLang for Advanced DeepSeek Serving
- Model Names: Do Not Mix These Up
- Production Hardening Checklist
- Troubleshooting DeepSeek Docker Deployment
- Best Practices by Use Case
- FAQ

## 正文
Deploy DeepSeek with Docker using the hosted V4 API, Ollama, Docker Model Runner, or vLLM, with secure Compose examples and production safeguards. Last verified: July 28, 2026.

DeepSeek Docker deployment can mean several different things. For most production apps, the simplest and safest setup is a Dockerized application that calls the hosted DeepSeek API. For local experimentation, use Ollama + Open WebUI or Docker Model Runner. For high-throughput self-hosting, use vLLM or SGLang only when you have the right GPU infrastructure and operational experience.

Current API model status — verified July 28, 2026: DeepSeek’s announced cutoff for deepseek-chat and deepseek-reasoner passed on July 24, 2026. The current official model list shows deepseek-v4-flash and deepseek-v4-pro; use one of those explicit IDs for hosted API containers.


### Quick Answer: Which DeepSeek Docker Deployment Should You Use?

Use this decision table before writing a Dockerfile.


Deployment path | Best for | Runs model locally? | GPU required? | Complexity | Production fit | Main caveat
Dockerized app calling DeepSeek API | Most SaaS apps, internal tools, agents, chat features | No | No | Low | Strong default | You depend on DeepSeek’s hosted API, billing, latency, and availability
LiteLLM proxy in Docker | Teams needing routing, provider abstraction, logging, budgets, shared access | No | No | Medium | Good for teams | Another service to secure and operate
Ollama + Open WebUI | Local chat UI, demos, private experiments, offline-style workflows | Yes | Optional, but strongly recommended for larger models | Low–Medium | Better for internal/local use than public production | Model tags are not hosted API model IDs
Docker Model Runner | Local model experimentation using Docker-native model tooling | Yes | Depends on model and platform | Medium | Good for local/dev workflows | Model Runner API is unauthenticated by default
vLLM in Docker | High-throughput inference serving on GPU servers | Yes | Usually yes | High | Strong for advanced serving | Requires model compatibility, GPU memory planning, monitoring, and security
SGLang in Docker | Advanced DeepSeek serving, multi-GPU, datacenter inference | Yes | Usually yes | High | Strong for expert teams | Not a simple laptop deployment path
Kubernetes GPU deployment | Platform teams serving multiple models at scale | Yes or no | Usually yes | Very high | Strong at scale | Requires orchestration, observability, security, and cost controls

The recommended starting point is simple: containerize your application, pass DEEPSEEK_API_KEY securely at runtime, and call the DeepSeek API from inside the container. Move to local model serving only when you need local inference, data locality, offline development, or full control over the inference stack.


### What “DeepSeek Docker Deployment” Actually Means

The phrase DeepSeek Docker Deployment is ambiguous. It does not always mean “download the entire DeepSeek model and run it in one container.”

It usually means one of these five patterns:

- API-based deployment: A Dockerized app calls DeepSeek’s hosted API.

- Proxy-based deployment: A Dockerized gateway such as LiteLLM routes requests to DeepSeek.

- Local desktop/server deployment: Ollama runs a DeepSeek R1 or distilled model, often with Open WebUI as the interface.

- Docker-native local model deployment: Docker Model Runner pulls and serves a packaged model through Docker’s local model tooling.

- Self-hosted inference deployment: vLLM or SGLang serves DeepSeek/open-weight models on GPU infrastructure.

That distinction matters because hosted DeepSeek model IDs, Ollama tags, Docker Model Runner package names, Hugging Face repositories, and vLLM/SGLang model names are not interchangeable. A value like deepseek-v4-flash belongs to DeepSeek’s hosted API; an Ollama tag like deepseek-r1:8b belongs to Ollama; a Hugging Face repository such as deepseek-ai/DeepSeek-V4-Pro belongs to model-weight distribution and serving frameworks. DeepSeek’s official API docs list hosted API model IDs, while Ollama separately publishes local model tags for deepseek-r1.


### Prerequisites

For the API-based path, you need:

- Docker and Docker Compose.

- A DeepSeek API key.

- A small app in Python, Node.js, Go, Java, or another backend stack.

- Runtime configuration for DEEPSEEK_API_KEY, DEEPSEEK_BASE_URL, and DEEPSEEK_MODEL.

For local model paths, you may also need:

- Enough disk space for the selected model.

- Sufficient RAM or VRAM.

- NVIDIA Container Toolkit for NVIDIA GPU passthrough on Linux.

- A supported GPU driver/runtime combination.

- A clear policy for who can access local inference endpoints.

Ollama’s Docker documentation shows separate paths for NVIDIA GPU, AMD GPU, Vulkan, and CPU-only local execution. Its hardware support page states that supported NVIDIA GPUs require compute capability 5.0+ with driver version 550 or newer, with compute capability 5.0 through 6.2 requiring driver 570 or newer.

For NVIDIA Docker workloads, NVIDIA’s Container Toolkit documentation instructs users to configure Docker with sudo nvidia-ctk runtime configure --runtime=docker and restart Docker afterward.

Production image warning: tutorial tags such as ollama/ollama:latest, open-webui:main, vllm/vllm-openai:latest, and sglang:latest are convenient for learning but are not reproducible production pins. Replace them with tested version tags or image digests. Docker Model Runner’s API is unauthenticated, so keep it on a trusted interface or place an authenticated proxy in front of it.


### Path 1: Dockerize an App That Calls the Hosted DeepSeek API

This is the best default for most production teams. You keep your app portable with Docker, but DeepSeek operates the model infrastructure.


#### Why this path is usually the best default

Use the hosted API path when you want:

- Fastest time to production.

- No GPU capacity planning.

- A smaller Docker image.

- Easier scaling of your application layer.

- Less operational complexity than self-hosting model weights.

DeepSeek’s official quick-start says the API can be accessed through OpenAI-compatible or Anthropic-compatible formats by changing configuration, which makes this pattern straightforward for teams already using OpenAI-style SDKs.


#### Project layout


```
deepseek-docker-app/
├── app.py
├── requirements.txt
├── Dockerfile
├── compose.yaml
├── .env.example
├── .gitignore
└── secrets/
    └── deepseek_api_key.txt
```

Create .gitignore first so secrets are not accidentally committed:


```
.env
secrets/
__pycache__/
*.pyc
```


#### .env.example

Do not put real API keys in this file.


```
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-flash
```

deepseek-v4-flash is a sensible default for many cost-sensitive or latency-sensitive workloads, while deepseek-v4-pro is the higher-capability hosted model. Verify the current model list before deployment because model names, pricing, and limits can change.


#### requirements.txt


```
fastapi
uvicorn[standard]
openai
```

For production, pin and review dependency versions with your normal dependency management process.


#### app.py

This minimal FastAPI service reads the API key from either an environment variable or a mounted Docker secret file.


```
import logging
import os
from pathlib import Path

from fastapi import FastAPI, HTTPException, status
from openai import OpenAI, OpenAIError
from pydantic import BaseModel, Field

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="DeepSeek Docker Demo",
    version="1.0.0",
)


class AskRequest(BaseModel):
    prompt: str = Field(
        ...,
        min_length=1,
        max_length=20_000,
        description="The prompt to send to the model.",
    )


class AskResponse(BaseModel):
    answer: str


def read_secret(name: str) -> str:
    """
    Read a secret from a Docker secret file first, then fall back
    to a standard environment variable.
    """
    file_path = os.getenv(f"{name}_FILE")

    if file_path:
        secret_file = Path(file_path)

        if not secret_file.is_file():
            raise RuntimeError(
                f"The secret file configured by {name}_FILE does not exist."
            )

        value = secret_file.read_text(encoding="utf-8").strip()

        if value:
            return value

        raise RuntimeError(f"The secret file configured by {name}_FILE is empty.")

    value = os.getenv(name, "").strip()

    if value:
        return value

    raise RuntimeError(f"Missing required configuration: {name} or {name}_FILE")


DEEPSEEK_API_KEY = read_secret("DEEPSEEK_API_KEY")
DEEPSEEK_BASE_URL = os.getenv(
    "DEEPSEEK_BASE_URL",
    "https://api.deepseek.com",
).rstrip("/")
DEEPSEEK_MODEL = os.getenv(
    "DEEPSEEK_MODEL",
    "deepseek-v4-flash",
).strip()

client = OpenAI(
    api_key=DEEPSEEK_API_KEY,
    base_url=DEEPSEEK_BASE_URL,
    timeout=60.0,
    max_retries=2,
)


@app.get("/healthz")
def healthz() -> dict[str, str]:
    """
    Lightweight container health check.

    This endpoint confirms that the application is running.
    It does not make a paid request to the model provider.
    """
    return {"status": "ok"}


@app.post(
    "/ask",
    response_model=AskResponse,
    status_code=status.HTTP_200_OK,
)
def ask(payload: AskRequest) -> AskResponse:
    prompt = payload.prompt.strip()

    if not prompt:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The prompt cannot be empty.",
        )

    try:
        response = client.chat.completions.create(
            model=DEEPSEEK_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a concise technical assistant. "
                        "Provide accurate, practical answers and do not invent facts."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            max_tokens=1000,
            stream=False,
            extra_body={
                "thinking": {
                    "type": "disabled",
                }
            },
        )

        answer = response.choices[0].message.content

        if not answer or not answer.strip():
            logger.warning(
                "The model returned an empty response. Model: %s",
                DEEPSEEK_MODEL,
            )
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="The model returned an empty response.",
            )

        return AskResponse(answer=answer.strip())

    except HTTPException:
        raise

    except OpenAIError:
        logger.exception(
            "DeepSeek API request failed. Model: %s, Base URL: %s",
            DEEPSEEK_MODEL,
            DEEPSEEK_BASE_URL,
        )
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Model provider request failed.",
        )

    except Exception:
        logger.exception("Unexpected error while processing the model request.")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected server error occurred.",
        )
```

DeepSeek’s official examples show OpenAI-format requests to /chat/completions using Authorization: Bearer ${DEEPSEEK_API_KEY}, and its docs list https://api.deepseek.com as the OpenAI-format base URL.


#### Dockerfile


```
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

USER 10001

EXPOSE 8080

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]
```

This Dockerfile keeps the image simple: install dependencies, copy the app, run as a non-root numeric user, and expose the FastAPI service on port 8080.


#### compose.yaml


```
services:
  deepseek-app:
    build: .
    ports:
      - "127.0.0.1:8080:8080"
    environment:
      DEEPSEEK_BASE_URL: "https://api.deepseek.com"
      DEEPSEEK_MODEL: "deepseek-v4-flash"
      DEEPSEEK_API_KEY_FILE: "/run/secrets/deepseek_api_key"
    secrets:
      - deepseek_api_key
    healthcheck:
      test:
        [
          "CMD",
          "python",
          "-c",
          "import urllib.request; urllib.request.urlopen('http://localhost:8080/healthz').read()"
        ]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
    restart: unless-stopped

secrets:
  deepseek_api_key:
    file: ./secrets/deepseek_api_key.txt
```

Docker Compose documentation recommends using secrets instead of environment variables for sensitive values such as passwords, and Compose mounts declared secrets under /run/secrets/<secret_name> inside the container.

Create the local secret file:


```
mkdir -p secrets
printf '%s' 'PASTE_YOUR_REAL_DEEPSEEK_API_KEY_HERE' > secrets/deepseek_api_key.txt
chmod 600 secrets/deepseek_api_key.txt
```

Start the service:


```
docker compose up --build
```

Test it from another terminal:


```
curl -s http://127.0.0.1:8080/ask \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Give me one practical Docker security tip."}'
```


#### Production notes for the API-based path

For production, replace local file secrets with your platform’s secret manager or orchestrator-native secrets. Keep .env for local development only. Do not bake DEEPSEEK_API_KEY into the image, do not commit it to Git, and do not print it in logs.

Bind local development ports to 127.0.0.1 unless the service must be reachable from another machine. Put a real ingress layer, authentication, TLS, and rate limiting in front of any public endpoint.


### Path 2: Add a LiteLLM Proxy When Teams Need a Shared Gateway

A proxy is useful when multiple apps or developers need one governed access layer for DeepSeek and other model providers.

Use a LiteLLM-style gateway when you need:

- One OpenAI-compatible endpoint for internal apps.

- Provider routing and fallback.

- Centralized logging.

- Budgeting or rate control.

- Team-level access policies.

- A migration layer between providers.

LiteLLM’s DeepSeek provider documentation says DeepSeek models use the deepseek/ prefix in LiteLLM calls and reads the DeepSeek key from DEEPSEEK_API_KEY. It also documents a proxy configuration pattern where a model name maps to deepseek/... plus api_key: os.environ/DEEPSEEK_API_KEY.

A minimal conceptual config.yaml looks like this:


```
model_list:
  - model_name: deepseek-v4-flash
    litellm_params:
      model: deepseek/deepseek-v4-flash
      api_key: os.environ/DEEPSEEK_API_KEY
```

Before deploying this pattern, verify LiteLLM’s current DeepSeek model mapping against DeepSeek’s official model list. Third-party tooling may still show historical names such as deepseek-chat or deepseek-reasoner, but DeepSeek’s announced cutoff has passed and its current catalog lists only the explicit V4 IDs.

Do not expose a LiteLLM proxy publicly without authentication, TLS, logging controls, and rate limits. A proxy centralizes access, which makes it powerful, but also makes it a high-value target.


### Path 3: Run DeepSeek Locally with Ollama and Open WebUI

Use this path when the goal is a local chat interface, local experimentation, or a private development environment. It is not the same as calling DeepSeek’s hosted API.

Ollama publishes deepseek-r1 tags such as deepseek-r1:1.5b, deepseek-r1:7b, deepseek-r1:8b, deepseek-r1:14b, deepseek-r1:32b, deepseek-r1:70b, and deepseek-r1:671b, with different download sizes and context metadata shown in the Ollama library.

Open WebUI is a self-hosted interface that supports Ollama and OpenAI-compatible APIs, and its docs provide Docker commands for running the web UI with persistent storage.


#### Local Ollama + Open WebUI Compose file


```
services:
  ollama:
    image: ollama/ollama:latest
    ports:
      - "127.0.0.1:11434:11434"
    volumes:
      - ollama:/root/.ollama
    restart: unless-stopped

  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "127.0.0.1:3000:8080"
    environment:
      OLLAMA_BASE_URL: "http://ollama:11434"
      WEBUI_SECRET_KEY: "${WEBUI_SECRET_KEY:?set WEBUI_SECRET_KEY before starting}"
    volumes:
      - open-webui:/app/backend/data
    depends_on:
      - ollama
    restart: unless-stopped

volumes:
  ollama:
  open-webui:
```

Start the stack:


```
export WEBUI_SECRET_KEY="$(openssl rand -hex 32)"
docker compose up -d
```

Pull a DeepSeek R1 model tag:


```
docker compose exec ollama ollama pull deepseek-r1:8b
```

Run a quick test:


```
docker compose exec ollama ollama run deepseek-r1:8b
```

Ollama’s Docker docs show running the container with a persistent /root/.ollama volume and then using docker exec to run a model inside the Ollama container.

Then open:


```
http://127.0.0.1:3000
```

Open WebUI’s docs emphasize mounting persistent data at /app/backend/data to avoid losing the WebUI database.


#### NVIDIA GPU version for Ollama

After installing and configuring NVIDIA Container Toolkit on the host, add GPU reservation to the ollama service:


```
services:
  ollama:
    image: ollama/ollama:latest
    ports:
      - "127.0.0.1:11434:11434"
    volumes:
      - ollama:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
    restart: unless-stopped
```

Open WebUI’s quick-start documentation shows the same Compose device reservation pattern for NVIDIA GPU support.


#### When Ollama is the right choice

Ollama is a strong fit when you want:

- A local DeepSeek R1-style model.

- A quick internal demo.

- A personal coding/research assistant.

- A local API compatible with many developer tools.

- A WebUI for non-CLI users.

Ollama is not automatically the best path for public production inference. If you expose it, place it behind authentication, TLS, network restrictions, rate limits, and monitoring.


### Path 4: Use Docker Model Runner for Docker-Native Local Models

Docker Model Runner is useful if you want local model execution managed through Docker’s model tooling instead of running a separate model server container yourself.

Docker’s documentation says Docker Model Runner can pull and serve models from Docker Hub, OCI-compatible registries, or Hugging Face; it also provides OpenAI-compatible and Ollama-compatible APIs. It requires Docker Engine or Docker Desktop versions listed in Docker’s requirements, and its supported inference engines include llama.cpp, vLLM, and Diffusers, with vLLM requiring NVIDIA GPUs on supported platforms.

Docker has published a verified Docker Hub model page for ai/deepseek-v3.2-vllm, which can be used with Docker Model Runner for local inference. The Docker Hub listing identifies it as a large model package, so it should be treated as a production-scale local deployment rather than a lightweight test image. Always verify the current model identifier, compatibility requirements, and hardware recommendations in Docker’s official documentation before deployment.

A typical command is:


```
docker model run ai/deepseek-v3.2-vllm
```

If Docker Hub or your Docker CLI shows a different exact model identifier or tag, use the current identifier shown by your installed Docker tooling.


#### Calling Docker Model Runner from an app

Docker’s Model Runner REST API documentation lists these local base URLs:

- From containers on Docker Desktop: http://model-runner.docker.internal

- From host processes with TCP enabled: http://localhost:12434

- OpenAI-compatible clients: http://localhost:12434/engines/v1

Docker also documents the OpenAI-compatible /engines/v1/chat/completions endpoint and notes that model identifiers should include the model namespace where applicable.

Example host request:


```
curl http://localhost:12434/engines/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "ai/deepseek-v3.2-vllm",
    "messages": [
      {"role": "user", "content": "Explain one Docker Model Runner use case."}
    ]
  }'
```


#### Security warning for Docker Model Runner

Docker’s docs state that the Model Runner API is not authenticated and that any client able to reach it can pull, load, run models, and send inference requests. Keep the API bound to trusted local access, avoid exposing it directly on a public network, and use a protected proxy if team access is needed.


### Path 5: Self-Host DeepSeek with vLLM in Docker

Use vLLM when you need an OpenAI-compatible inference server with high-throughput serving and you have the GPU resources to run the selected model.

vLLM provides an official Docker image, vllm/vllm-openai, for running an OpenAI-compatible server. Its Docker documentation shows GPU-enabled runs with --gpus all, a Hugging Face cache volume, optional HF_TOKEN, port 8000, and --ipc=host or shared-memory configuration.

A small DeepSeek R1 distilled test server can look like this:


```
docker run --rm --runtime nvidia --gpus all \
  -v ~/.cache/huggingface:/root/.cache/huggingface \
  --env "HF_TOKEN=${HF_TOKEN}" \
  -p 127.0.0.1:8000:8000 \
  --ipc=host \
  vllm/vllm-openai:latest \
  --model deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B \
  --reasoning-parser deepseek_r1
```

vLLM’s reasoning-output documentation uses DeepSeek-R1-Distill-Qwen-1.5B in its quick-start and instructs users to specify the --reasoning-parser deepseek_r1 flag for DeepSeek R1-style reasoning output.

Test it:


```
curl http://127.0.0.1:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",
    "messages": [
      {"role": "user", "content": "What should I check before exposing a model server?"}
    ]
  }'
```


#### vLLM and DeepSeek V4

vLLM’s supported-models documentation lists DeepseekV4ForCausalLM with examples including deepseek-ai/DeepSeek-V4-Flash and deepseek-ai/DeepSeek-V4-Pro. That does not mean every workstation can run those models. Large DeepSeek V4 deployments require serious model-weight, GPU memory, parallelism, and serving-configuration planning.

DeepSeek’s own Hugging Face model card points users to dedicated local-inference instructions and recommends specific sampling parameters for local deployment; it also notes the repository and model weights are under the MIT License.

Use vLLM for DeepSeek only after validating:

- The exact Hugging Face repository or local model path.

- GPU memory and tensor parallel requirements.

- Quantization format.

- Chat template or tokenizer requirements.

- Reasoning-output behavior.

- Tool-calling support if your app depends on tools.

- Latency and throughput under real traffic.

- Authentication and network isolation.


### Path 6: Use SGLang for Advanced DeepSeek Serving

SGLang is another advanced serving path for teams operating serious inference infrastructure. Its documentation describes SGLang as a high-performance serving framework for language and multimodal models, with support for DeepSeek, Hugging Face compatibility, OpenAI APIs, and multiple hardware platforms.

SGLang’s DeepSeek-V4 cookbook includes Docker launch patterns such as lmsysorg/sglang:latest, --gpus all, --shm-size, Hugging Face cache mounts, HF_TOKEN, and --ipc=host, plus hardware-specific recipes. It also distinguishes operating modes such as low-latency, balanced, and high-throughput serving.

Use SGLang when you need:

- Advanced DeepSeek serving recipes.

- Large-model optimization.

- Multi-GPU or multi-node deployment.

- DeepSeek-specific inference tuning.

- Dedicated platform engineering support.

Do not choose SGLang just because it appears in a Docker search result. It is powerful, but it belongs in a deployment plan with hardware validation, observability, security, and rollback procedures.


### Model Names: Do Not Mix These Up

This is one of the most common DeepSeek Docker deployment mistakes.


Context | Example | Where it belongs
DeepSeek hosted API model ID | deepseek-v4-flash | Requests to https://api.deepseek.com
DeepSeek hosted API model ID | deepseek-v4-pro | Requests to https://api.deepseek.com
Historical DeepSeek API names | deepseek-chat, deepseek-reasoner | Announced cutoff has passed; mention only in migration history
Ollama tag | deepseek-r1:8b | ollama pull / ollama run
Docker Model Runner package | ai/deepseek-v3.2-vllm | docker model run / Docker Model Runner APIs
Hugging Face repository | deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B | vLLM/SGLang/HF-based serving
Hugging Face repository | deepseek-ai/DeepSeek-V4-Pro | Advanced local/self-hosted serving

DeepSeek’s official API docs are the source of truth for hosted API model IDs. Ollama’s library is the source of truth for Ollama tags. Docker Hub and Docker docs are the source of truth for Docker Model Runner package names. Hugging Face model cards and serving-framework docs are the source of truth for local model repositories and compatibility.


### Production Hardening Checklist

Use this checklist before moving from a local DeepSeek Docker deployment to production.


#### Secrets

- Never bake DEEPSEEK_API_KEY into a Docker image.

- Never commit .env or secrets/ to Git.

- Prefer Docker secrets, orchestrator secrets, or a managed secret store.

- Rotate leaked keys immediately.

- Avoid logging request headers or full environment dumps.

Docker’s Compose documentation explicitly warns against using environment variables for sensitive information and recommends secrets instead.


#### Network exposure

- Bind development ports to 127.0.0.1.

- Do not expose Ollama, Open WebUI, Docker Model Runner, vLLM, SGLang, or LiteLLM directly to the public internet.

- Put public services behind TLS, authentication, authorization, and rate limits.

- Use private Docker networks for service-to-service communication.

- Restrict outbound traffic where your compliance model requires it.

This is especially important for Docker Model Runner because Docker’s own documentation says the Model Runner API is not authenticated by default.


#### Runtime controls

- Set CPU and memory limits where appropriate.

- Use health checks.

- Use restart policies.

- Pin image tags or digests for stable production releases.

- Keep base images and dependencies updated.

- Avoid running containers as root unless the image requires it.

- Mount model caches and app data on named volumes or managed storage.


#### Observability

Track:

- Request count.

- Latency.

- Error rate.

- Token usage for hosted APIs.

- GPU utilization for local/self-hosted models.

- VRAM pressure.

- Container restarts.

- Queue depth.

- Cost per user, workspace, or application.


#### Model governance

Document:

- Which model is used.

- Whether data leaves your environment.

- Who can access prompts and outputs.

- Retention policy for logs.

- Redaction rules for sensitive data.

- Fallback behavior during provider outages.

- Model upgrade and rollback process.


### Troubleshooting DeepSeek Docker Deployment


#### 401 Unauthorized or authentication errors

Check that the API key exists inside the container:


```
docker compose exec deepseek-app sh -lc 'test -f /run/secrets/deepseek_api_key && echo "secret file exists"'
```

Do not print the key. Verify the key in the DeepSeek platform and confirm your app is reading the correct file or environment variable.


#### Wrong model name

If a hosted API call fails with a model error, compare the configured model ID with DeepSeek’s current official model list. New API containers should use deepseek-v4-flash or deepseek-v4-pro; do not depend on historical compatibility names.


#### Container cannot reach the DeepSeek API

Enter the container and test DNS/network access:


```
docker compose exec deepseek-app python -c "import socket; print(socket.gethostbyname('api.deepseek.com'))"
```

If DNS works but requests fail, check:

- Corporate proxy settings.

- Firewall egress rules.

- TLS interception.

- Incorrect base URL.

- Expired or invalid API key.


#### Open WebUI cannot connect to Ollama

When both services run in the same Compose file, use the service name:


```
OLLAMA_BASE_URL: "http://ollama:11434"
```

Open WebUI’s troubleshooting docs note that connection issues often happen when the container tries to reach Ollama at 127.0.0.1:11434 from inside the wrong network namespace.


#### GPU not visible inside the container

Check the host first:


```
nvidia-smi
```

Then verify Docker GPU access:


```
docker run --rm --gpus all nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi
```

If this fails, install or reconfigure NVIDIA Container Toolkit, run sudo nvidia-ctk runtime configure --runtime=docker, and restart Docker.


#### Ollama model not found

List local models:


```
docker compose exec ollama ollama list
```

Pull the exact tag you intend to use:


```
docker compose exec ollama ollama pull deepseek-r1:8b
```

Check the Ollama library for valid deepseek-r1 tags and sizes before choosing a model.


#### Out-of-memory or VRAM errors

Use a smaller model, a quantized model, or a serving setup designed for your hardware. Docker does not reduce the memory requirements of a model. It only packages and isolates the runtime.

For Ollama, compare model sizes before pulling. For vLLM or SGLang, validate tensor parallel settings, quantization format, max context length, and GPU memory headroom before running real traffic.


#### vLLM server starts but responses fail

Check:

- Exact model repository.

- Whether the model requires HF_TOKEN.

- Whether the model needs --trust-remote-code.

- Whether the chat template is supported.

- Whether a reasoning parser is required.

- Shared memory configuration such as --ipc=host or --shm-size.

vLLM’s Docker docs note that --ipc=host or --shm-size is used because PyTorch uses shared memory between processes, especially for tensor-parallel inference.


### Best Practices by Use Case


#### For a production SaaS feature

Use:

- Dockerized app.

- Hosted DeepSeek API.

- Secrets manager.

- Rate limiting.

- Usage monitoring.

- Fallback behavior.

Avoid self-hosting unless you have a strong reason.


#### For an internal developer assistant

Use:

- Ollama + Open WebUI, or Docker Model Runner.

- Local-only port binding.

- SSO or VPN if shared.

- Persistent volumes.

- Clear model update policy.


#### For regulated or privacy-sensitive workflows

Consider:

- Whether prompts can leave your environment.

- Whether local inference is required.

- Whether a smaller local model is sufficient.

- Whether self-hosting creates more operational risk than it removes.

- Whether logs, backups, and monitoring systems store sensitive text.


#### For high-throughput inference

Use:

- vLLM or SGLang.

- Dedicated GPU servers.

- Load testing.

- Autoscaling strategy.

- Structured logs and metrics.

- GPU-aware scheduling.

- Canary deployments.

- Rollback plan.


### FAQ


#### Can I run DeepSeek in Docker?

Yes. You can run a Dockerized app that calls the hosted DeepSeek API, run local DeepSeek R1-style models with Ollama, use Docker Model Runner for local model packages, or self-host compatible model weights with vLLM/SGLang on suitable hardware. These are different deployment patterns, not one universal command.


#### What is the easiest DeepSeek Docker deployment?

The easiest production-friendly deployment is a Dockerized backend application that calls DeepSeek’s hosted API using the current base URL and model ID. This avoids GPU setup, model downloads, and inference-server operations.


#### Should I use deepseek-v4-flash or deepseek-v4-pro?

Use deepseek-v4-flash when you want a faster or more cost-conscious hosted API default. Use deepseek-v4-pro when you need the higher-capability hosted model. Verify the current DeepSeek Models & Pricing page before shipping because model details, limits, and pricing can change.


#### Can I still use deepseek-chat or deepseek-reasoner?

No. DeepSeek’s announced cutoff for deepseek-chat and deepseek-reasoner passed on July 24, 2026. Use an explicit V4 model ID for hosted API deployments.


#### Can I run DeepSeek V4 locally with Docker?

Technically yes, because DeepSeek V4 weights are available and serving frameworks document support paths. Practically, full V4 self-hosting is an advanced GPU deployment, not a simple laptop Docker command. For most teams, hosted API, Ollama distilled models, or Docker Model Runner experiments are more realistic starting points.


#### Is Ollama the same as the DeepSeek API?

No. Ollama runs local model tags such as deepseek-r1:8b; the hosted DeepSeek API uses model IDs such as deepseek-v4-flash and deepseek-v4-pro. Do not copy model names between the two systems without checking the relevant documentation.


#### Do I need a GPU?

For the hosted API path, no. For local model serving, a GPU is often important for acceptable performance, especially as model size grows. Some small local models can run on CPU, but speed and capacity depend on model size, quantization, memory, and hardware.


#### Is it safe to expose Ollama, Open WebUI, vLLM, SGLang, LiteLLM, or Docker Model Runner publicly?

Not directly. Put any public or shared endpoint behind authentication, authorization, TLS, network restrictions, rate limits, and monitoring. Docker Model Runner specifically documents that its API is not authenticated by default.


#### What is the best DeepSeek Docker Compose setup?

For production apps, use Docker Compose to run your app and inject the DeepSeek key through secrets. For local chat, use a Compose stack with Ollama and Open WebUI, persistent volumes, and ports bound to 127.0.0.1.


#### When should I use vLLM instead of Ollama?

Use vLLM when you are building a serious inference service with GPU-backed throughput requirements, OpenAI-compatible serving, batching, and production monitoring. Use Ollama when you want a simpler local model runtime for development, demos, or personal/internal use.

## 外部链接
- [Ollama’s Docker documentation](https://docs.ollama.com/docker)
- [hardware support page](https://docs.ollama.com/gpu)
- [NVIDIA’s Container Toolkit documentation](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)
- [secrets instead of environment variables](https://docs.docker.com/compose/how-tos/use-secrets/)
- [LiteLLM’s DeepSeek provider documentation](https://docs.litellm.ai/docs/providers/deepseek)
- [Ollama library](https://ollama.com/library/deepseek-r1/tags)
- [Open WebUI’s docs](https://docs.openwebui.com/getting-started/quick-start/)
- [Docker Model Runner can pull and serve models](https://docs.docker.com/ai/model-runner/)
- [verified Docker Hub model page](https://hub.docker.com/r/ai/deepseek-v3.2-vllm)
- [Docker’s Model Runner REST API documentation](https://docs.docker.com/ai/model-runner/api-reference/)
- [Model Runner API is not authenticated](https://docs.docker.com/ai/model-runner/#security-and-isolation)
- [vLLM provides an official Docker image](https://docs.vllm.ai/en/stable/deployment/docker/)
- [vLLM’s reasoning-output documentation](https://docs.vllm.ai/en/latest/features/reasoning_outputs/)
- [vLLM’s supported-models documentation](https://docs.vllm.ai/en/latest/models/supported_models/)
- [Hugging Face model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- [SGLang’s DeepSeek-V4 cookbook](https://docs.sglang.io/cookbook/autoregressive/DeepSeek/DeepSeek-V4)
- [DeepSeek Models & Pricing page](https://api-docs.deepseek.com/quick_start/pricing/)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fguide%2Fdeepseek-docker-deployment%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fguide%2Fdeepseek-docker-deployment%2F&text=DeepSeek%20Docker%20Deployment%3A%20API%2C%20Ollama%20%26%23038%3B%20vLLM)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fguide%2Fdeepseek-docker-deployment%2F&title=DeepSeek%20Docker%20Deployment%3A%20API%2C%20Ollama%20%26%23038%3B%20vLLM)