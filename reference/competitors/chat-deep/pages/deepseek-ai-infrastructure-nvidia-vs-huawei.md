# DeepSeek Infrastructure: NVIDIA vs Huawei

- **URL**: https://chat-deep.ai/news/deepseek-ai-infrastructure-nvidia-vs-huawei/
- **Published**: 2026-05-25T22:37:32+00:00
- **Modified**: 2026-07-29T12:12:06+00:00
- **Category**: DeepSeek News
- **Word count**: 3898
- **Code blocks**: 0
- **Description**: Explore DeepSeek infrastructure across NVIDIA and Huawei hardware, including deployment, supply-chain, performance and procurement considerations.

## H1


## H2 目录
- The Short Answer: DeepSeek Is the Model Layer, NVIDIA and Huawei Are Infrastructure Layers
- Why NVIDIA vs Huawei Matters for DeepSeek
- What We Know About DeepSeek, NVIDIA Chips and Huawei Ascend
- Huawei Ascend vs NVIDIA: The Infrastructure Difference
- DeepSeek Infrastructure for US Companies
- DeepSeek AI Deployment in Canada
- DeepSeek Infrastructure Risks for EU Companies
- Hosted DeepSeek vs Self-Hosted DeepSeek Infrastructure
- Can DeepSeek Run on Huawei Ascend?
- Does the Chip Story Affect Ordinary DeepSeek Users?
- Could DeepSeek Create Two AI Infrastructure Ecosystems?
- Practical Decision Framework: How Companies Should Choose a DeepSeek Infrastructure Path
- Final Takeaway
- FAQ

## 正文
Last updated: May 23, 2026

DeepSeek is no longer only a chatbot or model-performance story. DeepSeek AI infrastructure has become a strategic question about chips, software ecosystems, export controls, data location, compliance, and self-hosting. The real issue is not simply whether Huawei is stronger than NVIDIA, or whether DeepSeek has “abandoned” NVIDIA. The real issue is where DeepSeek workloads run, which hardware and software stack supports them, and what that means for companies using DeepSeek in production.

DeepSeek officially released its DeepSeek-V4 Preview on April 24, 2026, describing it as open-sourced and available through its API, with V4-Pro and V4-Flash both supporting a 1-million-token context window. Reuters reported the same day that DeepSeek-V4 was adapted to run on Huawei Ascend chips and that Huawei said its Ascend 950-based supernode clusters would support DeepSeek V4.

For enterprises, that makes the DeepSeek NVIDIA Huawei story much bigger than a chip headline. It is about model deployment, cloud architecture, export controls, procurement risk, vendor due diligence, data residency and whether AI infrastructure is splitting into US-led and China-led stacks.


### The Short Answer: DeepSeek Is the Model Layer, NVIDIA and Huawei Are Infrastructure Layers

DeepSeek is the model layer: the AI model, weights, API, reasoning capability, context window and developer interface. NVIDIA and Huawei are infrastructure layers: the chips, networking, software libraries, data-center systems and optimization tools that make large-scale training and inference possible.

NVIDIA’s advantage is not only its GPUs. It is the broader CUDA-centered ecosystem: software libraries, compilers, debugging tools, optimization tools, enterprise support, cloud availability and developer familiarity. NVIDIA describes CUDA as a development environment for creating, optimizing and deploying GPU-accelerated applications across embedded systems, workstations, data centers, cloud platforms and supercomputers.

Huawei Ascend is a different infrastructure layer. Huawei’s AI stack includes Ascend processors and CANN, the Compute Architecture for Neural Networks, along with MindStudio and other tooling designed to connect AI hardware with model development and deployment.

So the practical question is not “NVIDIA vs Huawei AI infrastructure: which chip wins?” The better question is:

Which infrastructure stack is your DeepSeek workload actually using, and can your organization legally, securely and operationally depend on it?


### Why NVIDIA vs Huawei Matters for DeepSeek

NVIDIA vs Huawei matters for DeepSeek because large AI models do not run in isolation. They run on specific compute stacks with specific constraints.

For training, the infrastructure layer affects how quickly models can be developed, how efficiently clusters communicate, how much compute is available and which optimization methods are practical. DeepSeek-V3’s own technical materials state that the model required 2.788 million H800 GPU hours for full training, linking earlier DeepSeek infrastructure directly to NVIDIA H800-class hardware.

For inference, the question changes. Inference is the production serving of a model after training. A model can be trained on one type of infrastructure and later optimized to run on another. This is why DeepSeek Huawei Ascend support matters: it may show that DeepSeek workloads can be served or partially trained inside a China-aligned chip and software ecosystem, even if earlier models used NVIDIA chips.

The infrastructure difference affects:


Infrastructure factor | Why it matters for DeepSeek
GPU/NPU availability | Determines whether teams can scale training or inference economically.
CUDA vs CANN | Affects developer tooling, model optimization and portability.
Training vs inference | A model trained on NVIDIA may still be optimized for Huawei inference.
Export controls | Restricts which chips can be shipped to China and which customers can access them.
Data-center location | Determines privacy, data residency, latency and legal exposure.
Enterprise compliance | Impacts audits, procurement, vendor risk and regulated-industry use.
Vendor lock-in | Deep integrations can make switching hardware stacks expensive.
AI ecosystem split | DeepSeek may become part of a broader China-native AI stack while still being usable elsewhere.

The export-control issue is especially important. CSIS noted that DeepSeek’s V3 paper cited 2,788,000 GPU-hours using NVIDIA H800 chips, and that H800 was a modified version of NVIDIA’s H100 designed for the Chinese market under earlier US export-control thresholds. The US Bureau of Industry and Security later revised licensing policy for some advanced chips exported to China, stating in January 2026 that applications for chips such as NVIDIA H200 and AMD MI325X would be reviewed case by case if security requirements were met.

That means DeepSeek export controls are not a side issue. They shape which AI chips are available, which infrastructure stacks become attractive, and how companies should evaluate DeepSeek AI deployment risk.


### What We Know About DeepSeek, NVIDIA Chips and Huawei Ascend

The strongest analysis separates what is confirmed, what is reported and what remains unknown.

DeepSeek officially says V4 Preview is open-sourced, available through its API, and offered in V4-Pro and V4-Flash versions with 1-million-token context support. Reuters reported that V4 was adapted for Huawei’s Ascend AI chips, that Huawei said Ascend 950-based supernode clusters fully support V4, and that Huawei chips were used for part of V4-Flash training. Reuters also reported that earlier DeepSeek V3 and R1 models were trained on NVIDIA chips, but that DeepSeek did not say whether the same applied to V4.

That last point is essential. DeepSeek Huawei Ascend support does not automatically prove that every part of V4 training happened on Huawei hardware. It proves that Huawei Ascend has become part of the DeepSeek infrastructure conversation.


Question | What we know | What remains unclear
Did DeepSeek use NVIDIA chips? | DeepSeek-V3 materials cite 2.788M H800 GPU hours; Reuters reported earlier V3 and R1 were trained on NVIDIA chips. | The full composition of DeepSeek’s total infrastructure stack is not fully public.
Can DeepSeek run on Huawei Ascend? | DeepSeek-V3 documentation lists Huawei Ascend NPU support for INT8 and BF16; Reuters reported V4 was adapted for Huawei Ascend. | Teams must verify exact model version, precision, drivers, runtime and workload.
Was V4 fully trained on Huawei? | Huawei chips were reportedly used for part of V4-Flash training. | DeepSeek did not disclose whether V4 itself was trained on NVIDIA, Huawei or a mixed stack.
Did DeepSeek abandon NVIDIA? | There is no public basis to say DeepSeek fully abandoned NVIDIA. Reuters explicitly notes earlier NVIDIA use and non-disclosure for V4. | Future DeepSeek releases may shift further toward domestic Chinese infrastructure.
Does this affect enterprise deployments? | Yes. It affects vendor risk, compliance, region strategy and self-hosting decisions. | The exact risk depends on whether a company uses the consumer app, hosted API, cloud deployment or self-hosted model.


### Huawei Ascend vs NVIDIA: The Infrastructure Difference

A useful Huawei Ascend vs NVIDIA comparison should not be a simple benchmark contest. Enterprises need to compare ecosystems.

NVIDIA is the default global AI infrastructure stack for many companies because of CUDA maturity, broad cloud availability, high developer familiarity and a mature inference/training ecosystem. CUDA includes libraries, compiler tooling, debugging tools and runtime support for GPU-accelerated applications.

Huawei Ascend is more important inside China and for organizations that want or need a China-native infrastructure path. Huawei’s CANN stack is designed as the bridge between Ascend hardware and AI applications, with Huawei describing CANN, MindStudio and MindX as part of its full-stack Ascend software platform.


Factor | NVIDIA AI infrastructure | Huawei Ascend AI infrastructure
Primary ecosystem | Global GPU ecosystem centered on NVIDIA GPUs and CUDA. | China-aligned AI chip ecosystem centered on Ascend NPUs and CANN.
Software stack | CUDA, TensorRT, NCCL, Triton, CUDA libraries, large third-party support. | CANN, MindStudio, MindX and Huawei Ascend tooling.
Global availability | Strong in US, Europe, Canada, UK, Australia and global cloud markets. | Stronger in China; more limited or politically sensitive in many Western markets.
China availability | Constrained by US export controls on advanced NVIDIA chips. | Strategically important for China’s AI self-sufficiency.
Developer maturity | Very mature; widely used in AI research, cloud and enterprise deployment. | Improving, but moving developers away from NVIDIA remains difficult, according to Reuters’ quoted analyst.
Export-control exposure | High for shipments into China and certain restricted users. | Lower exposure to US chip-export restrictions, but higher Western procurement and supply-chain scrutiny.
Enterprise familiarity | High among global AI teams. | Higher in China; lower in many Western enterprise teams.
Best-fit use cases | Global AI training, inference, enterprise cloud, self-hosting and high-performance AI factories. | China-market deployments, domestic Chinese AI stacks, Huawei cloud/data-center environments.
Main risks | Cost, GPU scarcity, export controls and vendor concentration. | Ecosystem maturity, regional availability, procurement restrictions and compliance concerns outside China.

Reuters’ reporting captures the strategic direction: DeepSeek V4’s Huawei adaptation is a step toward China’s self-sufficient AI ecosystem, while Huawei still faces challenges competing with NVIDIA’s broader technology and developer ecosystem.


### DeepSeek Infrastructure for US Companies

For US companies, the central issue is not simply whether DeepSeek is impressive. The issue is how DeepSeek is accessed and where data flows.

A US company might use DeepSeek in at least four different ways:

- The public DeepSeek app or web interface

- The hosted DeepSeek API

- A third-party cloud deployment or model marketplace

- Open weights deployed in a private cloud or on-prem environment

Those options carry very different risks. DeepSeek’s privacy policy says it may collect user inputs, uploaded files, chat history, device/network data, log data and approximate location data; it also says personal data is directly collected, processed and stored in the People’s Republic of China to provide the services.

That does not automatically mean every DeepSeek deployment has the same risk. A self-hosted open-weight deployment may avoid sending prompts to DeepSeek’s hosted service, but it also creates new responsibilities: model security, access control, logging, monitoring, patching, abuse prevention and auditability.

US government and regulated-sector users should be especially cautious. Reuters reported in March 2025 that US Commerce Department bureaus informed staff that DeepSeek was banned on government devices, citing concerns about information-system safety and sensitive government information.


#### Practical Checklist for US Companies

Before using DeepSeek AI infrastructure for US companies, review:

- Data classification: Are prompts, files or outputs confidential, regulated or export-controlled?

- Model access method: Consumer app, hosted API, third-party cloud, private cloud or self-hosted?

- Hosting region: Where are prompts, logs, embeddings and outputs processed?

- Vendor due diligence: Who controls the service, infrastructure, monitoring and retention?

- Logging and retention: Are prompts stored, reviewed or used for model improvement?

- Sanctions/export-control review: Are any users, workloads, chips or destinations restricted?

- Security review: Can the deployment meet internal identity, encryption and monitoring standards?

- Legal review: Are contracts, DPAs, procurement rules and customer commitments satisfied?

- Incident response plan: Can the company detect and respond to data leakage, prompt abuse or model misuse?

The key point: an “open model” is not automatically a safe enterprise deployment. DeepSeek infrastructure must be evaluated like any other production AI system.


### DeepSeek AI Deployment in Canada

DeepSeek AI deployment in Canada should be assessed through privacy, public-sector restrictions, cross-border transfer and sector-specific obligations.

Canadian organizations need to distinguish between casual employee experimentation and enterprise-controlled deployment. Using the consumer app with confidential data is very different from running a vetted model in a controlled Canadian cloud environment with access controls, logging policies and contractual safeguards.

Canada has already treated DeepSeek as a public-sector risk in some contexts. A Canadian Press report said a restriction was applied to government mobile devices managed by Shared Services Canada, and that other departments and agencies were advised to do the same as a precautionary measure. The Government of Canada’s AI Strategy for the Federal Public Service frames AI adoption around responsible use, showing that public-sector AI deployment is not simply a technical procurement decision.

For Canadian businesses, self-hosting may reduce cross-border transfer risk if data stays in a controlled Canadian or approved environment. But self-hosting also increases operational responsibility. A private deployment needs infrastructure capacity, model monitoring, security controls, human review, legal review and clear rules for what employees can input.


### DeepSeek Infrastructure Risks for EU Companies

For EU companies, DeepSeek infrastructure risks are closely tied to GDPR, international data transfers, AI Act obligations, vendor transparency and data residency.

The first question is whether personal data is processed. If employees or customers enter personal data into a hosted DeepSeek service, organizations need to evaluate lawful basis, transparency, retention, processor/controller roles, international transfer mechanisms and user rights. DeepSeek’s privacy policy states that personal data may be directly collected, processed and stored in the People’s Republic of China, and it includes specific supplemental terms for users in the EEA, Switzerland and UK.

The second question is whether the deployment is hosted or self-hosted. Hosted DeepSeek usage may create cross-border transfer and vendor-control questions. Self-hosted open-weight deployment may reduce hosted-service data exposure, but it does not remove GDPR duties if personal data is processed.

The third question is whether the use case falls within the EU AI Act. The European Commission states that general-purpose AI model obligations entered into application on August 2, 2025, with enforcement powers beginning August 2, 2026, and that providers of GPAI models must assess obligations based on the AI Act framework. The Commission also describes the General-Purpose AI Code of Practice as a voluntary tool to help providers comply with obligations on transparency, copyright, safety and security.


#### Before Using DeepSeek in the EU: Checklist

- Is personal data processed?

- Is data transferred outside the EU/EEA?

- Who is the controller and who is the processor?

- Is there a valid DPA?

- Are prompts, logs, files and outputs retained?

- Is training on user data disabled or controlled?

- Can the deployment be audited?

- Does the use case fall under high-risk AI categories?

- Is model output monitored?

- Is there a human review process?

For EU companies, the safest infrastructure path is usually not “use or ban DeepSeek.” It is to identify the use case, isolate the data, choose the right deployment model and document the legal and technical controls.


### Hosted DeepSeek vs Self-Hosted DeepSeek Infrastructure

The DeepSeek self-hosting infrastructure question is central for enterprises. Hosted AI services reduce engineering burden, but they increase dependency on the provider’s data handling, infrastructure, retention and jurisdiction. Self-hosting gives more control, but it shifts operational risk to the company.

DeepSeek’s V3 repository notes that DeepSeek-V3 can be deployed locally using multiple inference frameworks and hardware routes, including NVIDIA/AMD support through SGLang and vLLM, as well as Huawei Ascend NPU support in specified modes. That does not mean every enterprise can self-host easily. It means self-hosting is possible only if the team has the right hardware, software stack, precision support, model-serving framework and security operations.


Deployment option | Best for | Main benefit | Main risk | Compliance notes
Consumer app | Casual personal experimentation | Fastest access | User inputs may be collected and processed under the provider’s policy | Not suitable for confidential or regulated business data.
Hosted API | Developers testing workflows | Easy integration | Data transfer, logging, retention and vendor-control questions | Review terms, privacy policy, retention and regional processing.
Western cloud marketplace/model catalog | Teams needing managed infrastructure | More enterprise controls than consumer app | Availability and model-version limitations | Check region, DPA, logging and marketplace terms.
Private cloud deployment | Enterprises needing control without owning hardware | Better control over access and region | Cloud cost and configuration complexity | Align with internal cloud, security and privacy standards.
On-prem/self-hosted deployment | Highly sensitive workloads | Maximum data-location control | Infrastructure, MLOps and security burden | Requires governance, monitoring, audits and patching.
Huawei Ascend-based deployment | China-market or Huawei-stack environments | China-native hardware/software alignment | Western procurement and compliance concerns | Verify model support, CANN version, region and legal exposure.
NVIDIA-based deployment | Global enterprise AI workloads | Mature tooling and broad cloud support | Cost, availability and export-control exposure | Strong fit for controlled enterprise deployment outside restricted contexts.


### Can DeepSeek Run on Huawei Ascend?

Yes, DeepSeek models can run on Huawei Ascend in specific contexts. DeepSeek’s V3 documentation lists Huawei Ascend NPU support for running DeepSeek-V3 in INT8 and BF16, while Reuters reported that DeepSeek V4 was adapted for Huawei Ascend chips and supported by Huawei Ascend 950-based supernode clusters.

But teams should not overgeneralize this into “every DeepSeek workload runs equally well on Ascend.” Enterprises must verify:

- Exact DeepSeek model version

- Precision format, such as BF16, FP8, INT8 or quantized variants

- Inference framework support

- CANN and driver versions

- Batch size and latency requirements

- Context-window requirements

- Multi-node networking

- Monitoring and observability

- Vendor support and update cadence

The best interpretation of “DeepSeek Huawei Ascend support explained” is this: Huawei support gives DeepSeek a credible China-native infrastructure path, but each production workload still needs technical validation.


### Does the Chip Story Affect Ordinary DeepSeek Users?

For ordinary users, the chip story may not be visible day to day. Most users care about price, speed, availability, quality, privacy and whether the app answers their questions.

For companies, governments and regulated industries, the chip story matters a lot. Infrastructure determines where data is processed, which vendors are involved, what export controls apply, whether the deployment can be audited and whether the organization can switch providers if policy or supply-chain conditions change.

A consumer may only ask, “Is DeepSeek fast?” A CTO or compliance leader needs to ask, “Where does this workload run, who can access the data, what chips and software support it, and can we defend this deployment in an audit?”


### Could DeepSeek Create Two AI Infrastructure Ecosystems?

DeepSeek could contribute to a broader split between two AI infrastructure ecosystems, although this is a trend rather than a guaranteed outcome.

One stack is centered on NVIDIA, CUDA, US cloud providers, Western enterprise procurement, Western compliance frameworks and global developer familiarity. NVIDIA’s own AI positioning emphasizes full-stack accelerated infrastructure, enterprise-grade software and AI models.

The other stack is centered on Chinese models, Huawei Ascend, CANN, domestic Chinese cloud providers and China’s AI sovereignty strategy. CSIS argues that the larger strategic challenge is not DeepSeek alone, but China’s ability to build domestic AI chip infrastructure at sufficient quantity and quality, with Huawei positioned as the strongest Chinese AI chip player through its Ascend product line.

This possible split has practical implications:

- Developers may need to optimize for both CUDA and CANN.

- Enterprises may need region-specific AI infrastructure strategies.

- Cloud buyers may face different approved-vendor lists by region.

- Model providers may release different optimization paths for different hardware ecosystems.

- Compliance teams may need to evaluate not just model behavior, but infrastructure provenance.

DeepSeek is the model layer. NVIDIA and Huawei are infrastructure layers. The future may not be one universal AI stack, but parallel stacks shaped by chips, software, regulation and geopolitics.


### Practical Decision Framework: How Companies Should Choose a DeepSeek Infrastructure Path

The right DeepSeek infrastructure path depends on region, data sensitivity, industry regulation, latency, cost, model performance, hardware availability, vendor risk, export-control exposure and the need for self-hosting.


Scenario | Recommended path | Why
Casual experimentation | Consumer app or hosted API with non-sensitive data | Fast, low friction and suitable for learning.
Startup prototype | Hosted API or managed cloud deployment | Reduces infrastructure burden while testing product-market fit.
US regulated company | Private cloud or self-hosted deployment after legal/security review | Avoids uncontrolled sensitive data exposure and supports auditability.
Canadian business | Controlled cloud or self-hosted deployment with privacy review | Helps manage cross-border transfer and sector-specific obligations.
EU company | EU-hosted, private or self-hosted deployment with GDPR and AI Act assessment | Reduces transfer risk and supports compliance documentation.
Global enterprise | Region-specific deployment strategy | Different regions may require different infrastructure and legal controls.
China-market deployment | Huawei Ascend or China-local cloud may be practical | Aligns with local infrastructure availability and market requirements.
Highly sensitive workload | On-prem or private self-hosted deployment | Maximizes control over data, access, logs and monitoring.

A practical procurement decision should answer these questions:

- Are we using DeepSeek as a hosted service or deploying the model ourselves?

- Are prompts, files or outputs sensitive?

- Which region processes the workload?

- Which infrastructure stack serves inference?

- Are logs retained or used for model improvement?

- Can we audit access and outputs?

- Are export controls or procurement restrictions relevant?

- Can we switch models or hardware stacks if policy changes?

- Do we have enough MLOps maturity to self-host safely?

- Is human review required for the use case?


### Final Takeaway

DeepSeek AI infrastructure is not just about whether DeepSeek uses NVIDIA or Huawei. It is about where DeepSeek workloads run, what chip and software ecosystem supports them, what legal exposure applies, and how companies choose between hosted, cloud and self-hosted deployment.

DeepSeek V4’s Huawei Ascend adaptation is a real infrastructure signal. It suggests DeepSeek can fit into a China-native AI stack. But it does not prove that DeepSeek has completely stopped using NVIDIA, and it does not remove the need for enterprise validation.

For global companies, the winning approach is careful separation:

- Model layer: Which DeepSeek model are we using?

- Infrastructure layer: Is it NVIDIA, Huawei, cloud, private cloud or on-prem?

- Data layer: Where do prompts, logs and outputs go?

- Compliance layer: Which privacy, export-control and procurement rules apply?

- Operational layer: Can we monitor, secure and audit the deployment?

That is the real meaning of NVIDIA vs Huawei for DeepSeek.


### FAQ


#### Why does NVIDIA vs Huawei matter for DeepSeek?

NVIDIA vs Huawei matters because DeepSeek workloads need infrastructure. NVIDIA represents the dominant global CUDA/GPU ecosystem, while Huawei Ascend represents a China-native AI chip and software stack. The choice affects performance, availability, compliance, export controls, data-center strategy and vendor risk.


#### Does DeepSeek run on Huawei chips?

Yes, in specific contexts. DeepSeek-V3 documentation lists Huawei Ascend NPU support, and Reuters reported that DeepSeek V4 was adapted for Huawei Ascend chips and supported by Huawei Ascend 950-based supernode clusters.


#### Did DeepSeek stop using NVIDIA chips?

There is no public basis to say DeepSeek completely stopped using NVIDIA. DeepSeek-V3 materials cite H800 GPU hours, Reuters reported earlier V3 and R1 models were trained on NVIDIA chips, and Reuters also noted that DeepSeek did not say whether V4 was trained on NVIDIA or Huawei hardware.


#### Is Huawei Ascend a real alternative to NVIDIA for DeepSeek?

Huawei Ascend is a real infrastructure path for some DeepSeek deployments, especially in China-aligned environments. However, NVIDIA still has a more mature global software ecosystem, broader cloud availability and stronger developer familiarity. Enterprises should compare actual workload performance, tooling, support and compliance requirements before choosing.


#### What does this mean for US companies using DeepSeek?

US companies should identify whether they are using the consumer app, hosted API, third-party cloud, private cloud or self-hosted weights. Sensitive data, government contracting, regulated industries, export controls and procurement policies all matter. An open model is not automatically a compliant deployment.


#### What does this mean for Canadian businesses?

Canadian businesses should separate casual use from enterprise deployment. They should review privacy, cross-border data transfer, public-sector restrictions, sector obligations and whether self-hosting would reduce data-transfer risk or simply move operational responsibility in-house.


#### What should EU companies check before using DeepSeek?

EU companies should check whether personal data is processed, whether data leaves the EU/EEA, who acts as controller or processor, whether a DPA exists, whether logs are retained, whether user data can train models, and whether the use case triggers GDPR or EU AI Act obligations.


#### Does the chip story affect ordinary DeepSeek users?

Usually not directly. Ordinary users mostly notice price, speed, quality, availability and privacy. The chip story matters much more for companies, governments and developers deploying DeepSeek at scale.


#### Is self-hosted DeepSeek safer than hosted DeepSeek?

Self-hosting can be safer for sensitive data because it gives more control over data location, access and logs. But it is only safer if the organization can operate the infrastructure securely, including monitoring, patching, access control, model governance and incident response.


#### Could DeepSeek create two AI infrastructure ecosystems?

DeepSeek could contribute to a split between a US-led stack centered on NVIDIA, CUDA and Western cloud providers, and a China-led stack centered on Huawei Ascend, CANN and domestic Chinese infrastructure. This is not certain, but it is a realistic trend for enterprise AI planning.

## 内部链接
- [DeepSeek](https://chat-deep.ai/)

## 外部链接
- [DeepSeek-V4 Preview](https://api-docs.deepseek.com/news/news260424)
- [adapted to run on Huawei Ascend chips](https://www.reuters.com/world/china/deepseek-v4-chinese-ai-model-adapted-huawei-chips-2026-04-24/)
- [CUDA-centered ecosystem](https://docs.nvidia.com/cuda/)
- [CANN](https://www.hiascend.com/en/cann)
- [2.788 million H800 GPU hours](https://arxiv.org/html/2412.19437v1)
- [US Bureau of Industry and Security](https://www.bis.gov/press-release/department-commerce-revises-license-review-policy-semiconductors-exported-china)
- [DeepSeek export controls](https://www.csis.org/analysis/deepseek-deep-dive)
- [DeepSeek’s privacy policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html)
- [US Commerce Department bureaus informed staff](https://www.reuters.com/technology/artificial-intelligence/us-commerce-department-bureaus-ban-chinas-deepseek-government-devices-sources-2025-03-17/)
- [Canadian Press report](https://toronto.citynews.ca/2025/02/07/ai-chatbot-deepseek-restricted-from-some-canadian-government-phones/)
- [AI Strategy for the Federal Public Service](https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai.html)
- [General-Purpose AI Code of Practice](https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai)
- [Huawei Ascend NPU support](https://github.com/deepseek-ai/DeepSeek-V3)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fnews%2Fdeepseek-ai-infrastructure-nvidia-vs-huawei%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fnews%2Fdeepseek-ai-infrastructure-nvidia-vs-huawei%2F&text=DeepSeek%20AI%20Infrastructure%3A%20What%20NVIDIA%20vs%20Huawei%20Means%20for%20Global%20Companies)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fnews%2Fdeepseek-ai-infrastructure-nvidia-vs-huawei%2F&title=DeepSeek%20AI%20Infrastructure%3A%20What%20NVIDIA%20vs%20Huawei%20Means%20for%20Global%20Companies)