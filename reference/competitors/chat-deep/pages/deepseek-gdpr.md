# Is DeepSeek GDPR Compliant? EU Privacy Risks

- **URL**: https://chat-deep.ai/privacy-security/deepseek-gdpr/
- **Published**: 2026-05-17T14:02:18+00:00
- **Modified**: 2026-07-29T12:12:31+00:00
- **Category**: DeepSeek Privacy & Security Center
- **Word count**: 3003
- **Code blocks**: 0
- **Description**: Review DeepSeek GDPR concerns, data transfers, regulator actions and business risks, plus questions organizations should assess before using hosted services.

## H1


## H2 目录
- Quick Answer
- DeepSeek AI Under EU Scrutiny: Why Regulators Are Concerned
- DeepSeek and GDPR: The Core Compliance Questions
- What Personal Data Does DeepSeek Collect?
- The China Data-Transfer Issue
- What Italy’s Garante Did
- What Germany’s Berlin Data Protection Authority Said
- Is DeepSeek GDPR Compliant Today?
- Can Companies Use DeepSeek in a GDPR-Compliant Way?
- DeepSeek Public App vs API vs Self-Hosted Model
- Practical Checklist Before Using DeepSeek in the EU
- What EU Users Should Do
- Conclusion
- FAQ

## 正文
Updated: May 2026

DeepSeek AI under EU scrutiny is no longer just a technology headline; it is a serious GDPR compliance issue. DeepSeek’s China-hosted consumer service should not be assumed GDPR-compliant for EU personal data. EU regulators have raised serious concerns about transparency, legal basis, data-subject rights, EU territorial scope, representative obligations, security, and international data transfers to China. However, the answer to “Is DeepSeek GDPR compliant?” depends on the specific use case, deployment model, contracts, safeguards, and current privacy documentation.

The debate around DeepSeek and GDPR is especially important for companies, public bodies, DPOs, and employees who may enter personal, client, legal, financial, HR, or confidential data into an AI system. For DeepSeek services covered by its Privacy Policy, DeepSeek describes collection of prompts, uploaded files, chat history, device and network data, logs, approximate location, and other personal data, and states that personal data for those services is directly collected, processed, and stored in the People’s Republic of China.

The official API and downstream applications require a separate GDPR assessment because DeepSeek’s consumer Privacy Policy expressly excludes end-user personal data collected through downstream Open Platform applications.


> note: This article is for general information only and does not constitute legal advice.


### Quick Answer


Question | Short answer
Is DeepSeek GDPR compliant? | Not enough for EU users or businesses to assume compliance by default, especially for the public China-hosted app.
Why are EU regulators concerned? | Transparency, lawful basis, data-subject rights, EU territorial scope, representative obligations, security, and transfers of EU personal data to China.
Is it safe for EU businesses to use DeepSeek? | Not for personal or confidential business data unless the organisation has completed vendor due diligence, contract review, transfer analysis, and technical controls.
Is self-hosting DeepSeek different from using the public app? | Yes. A self-hosted or private deployment can reduce transfer and training risks, but it does not remove GDPR obligations.


### DeepSeek AI Under EU Scrutiny: Why Regulators Are Concerned

DeepSeek attracted European regulatory attention because its chatbot service became widely used very quickly while its privacy and data-transfer practices raised questions under the GDPR. In January 2025, Italy’s data protection authority, the Garante, asked Hangzhou DeepSeek Artificial Intelligence and Beijing DeepSeek Artificial Intelligence to explain what personal data they collected, from which sources, for what purposes, on what legal basis, and whether the data was stored on servers in China. The Garante also asked what information was used to train the AI system and how users were informed if personal data had been collected through web scraping.

Two days later, the Italian authority ordered an urgent limitation on processing Italian users’ data, saying the companies’ response was unsatisfactory and that the service was still being offered to people in the EU, specifically in Italy. The Garante’s order identified issues including cooperation with the authority, transparency, legal basis, data-subject rights, security, and the lack of an EU representative at the time of the order. DeepSeek’s current privacy policy now names Prighter Group as a privacy representative for the EU and UK, but organisations should still verify the scope, effectiveness, and contractual relevance of that arrangement.

The issue also moved beyond Italy. DeepSeek appeared on the agenda of the EDPB’s 11 February 2025 plenary meeting, and the EDPB later announced the creation of an AI enforcement task force to support cooperation among EU data protection authorities. Reuters also reported that EU privacy regulators discussed DeepSeek after national regulators began actions or questions concerning the service.


### DeepSeek and GDPR: The Core Compliance Questions

The GDPR does not apply only to companies established in the EU. It can also apply to non-EU organisations that offer goods or services to people in the EU or monitor their behaviour. That is why a China-based AI company may still fall within GDPR scope when it provides an app or web service to EU users.

For DeepSeek GDPR compliance, the main questions are:


GDPR issue | Why it matters
Territorial scope | If the service is offered to EU users, GDPR may apply even if the provider is outside the EU.
Transparency | Users must understand what personal data is collected, why, how long it is kept, and who receives it.
Legal basis | Each processing purpose needs a lawful basis, such as contract, consent, legitimate interests, or legal obligation.
Data-subject rights | EU users must be able to exercise rights such as access, deletion, objection, restriction, and portability.
EU representative | Non-EU controllers subject to GDPR may need a written EU representative under Article 27.
Security of processing | Controllers must protect personal data appropriately, especially where sensitive or high-risk data may be entered.
International transfers | Transfers outside the EEA require an adequacy decision, appropriate safeguards, or a narrow derogation.
AI training and scraping | Training models on personal data raises questions about transparency, purpose limitation, minimisation, lawful basis, and rights.

DeepSeek’s current privacy policy has added more European-region language, including legal bases, rights, and a privacy representative contact. But disclosure alone does not prove that every processing activity, transfer, retention practice, or business use case is GDPR-compliant.


### What Personal Data Does DeepSeek Collect?

DeepSeek’s current privacy policy says it may collect personal data in several ways, including data provided by the user, automatically collected data, and data from other sources. The categories include:


Category | Examples
Account data | Email address, phone number, username, password, date of birth where applicable
Prompts and user inputs | Text input, voice input, prompts, uploaded files, photos, feedback
Chat history | User conversations and model-generated outputs
Device data | Device model, operating system, device identifiers, system language
Network data | IP address, cookies, unique identifiers
Log data | Features used, actions taken, diagnostic and performance logs
Approximate location | Location inferred from IP address
Public personal data | Publicly available personal data that may be obtained via online sources to train models
Payment data | Payment order and transaction data for paid Open Platform/API services; DeepSeek says this is not applicable to the DeepSeek App.

This matters because prompts and uploaded documents can easily contain personal data, even when the user does not think of them as “data.” A customer support transcript, employment dispute, contract, health note, invoice, spreadsheet, email chain, or screenshot may include names, contact details, personal opinions, financial information, or sensitive data.

DeepSeek’s policy also says the service is not designed or intended to process sensitive personal data and tells users not to provide it. That warning is important, but it does not eliminate risk if users or employees still paste sensitive or confidential information into the public app.


### The China Data-Transfer Issue

The central DeepSeek privacy concern in Europe is the DeepSeek data transfer to China. Under EU data protection rules, personal data does not lose GDPR protection when it leaves the EU. The European Commission explains that personal-data transfers to third countries generally need either an adequacy decision, appropriate safeguards such as Standard Contractual Clauses or Binding Corporate Rules, or specific derogations.

China is the key risk point because DeepSeek’s current policy says personal data may be directly collected, processed, and stored in the People’s Republic of China.

The Berlin Commissioner for Data Protection stated in June 2025 that DeepSeek transfers personal data from German users to Chinese data processors and stores it on servers in China. The same press release said the EU has not issued an adequacy decision for China and that DeepSeek had not provided convincing evidence that German users’ data would be protected in China at a level equivalent to the EU.

For EU businesses, this means the question is not simply “Where is DeepSeek based?” The real compliance questions are: What personal data is being sent? Where is it processed? Who can access it? What transfer mechanism is used? Are enforceable rights and effective remedies available? Has a Transfer Impact Assessment been completed? Are technical safeguards strong enough?


### What Italy’s Garante Did

Italy’s Garante acted quickly. On 28 January 2025, it asked DeepSeek’s operators to provide details about personal data collection, data sources, processing purposes, legal basis, storage in China, training data, and possible web scraping. It gave the companies 20 days to respond.

On 30 January 2025, the Garante ordered an urgent and immediate limitation on processing Italian users’ data. The authority said the companies’ communication was “entirely unsatisfactory” and noted that the companies claimed they did not operate in Italy and that European legislation did not apply. The authority disagreed and opened an investigation.

In the formal order, the Garante stated that DeepSeek was offered to data subjects in the EU, specifically Italy, and therefore Article 3(2)(a) GDPR applied. It also found issues involving Articles 31, 12, 13, 14, 6, 32, 27, and Chapter III rights.


### What Germany’s Berlin Data Protection Authority Said

Germany’s Berlin Commissioner took a different enforcement route. In June 2025, the Commissioner notified Apple and Google in Germany that the DeepSeek app constituted illegal content because of allegedly unlawful transfers of personal data to China. The press release said the app was offered in Germany via the Apple App Store and Google Play Store with a German-language description and could be used in German, making it subject to the GDPR.

The Berlin authority specifically referenced Article 46(1) GDPR and said DeepSeek had been asked in May 2025 either to remove its apps from German app stores, stop the illegal transfer of personal data to China, or fulfil the requirements for lawful third-country transfers. The authority then used the Digital Services Act route to notify Apple and Google.

This is why app stores became part of the enforcement path: if an app is considered illegal content or linked to unlawful data processing, regulators may pressure platform operators to review whether it should remain available.


### Is DeepSeek GDPR Compliant Today?

The balanced answer is: there is no safe basis for EU organisations to approve the public hosted DeepSeek app by default for personal or confidential data without a documented GDPR assessment, transfer analysis, contract review, and technical controls.

DeepSeek’s latest privacy policy is more detailed than the early documentation reviewed by regulators. It includes an EEA, Switzerland, and UK section, a table of legal bases, data-subject rights, an opt-out reference for training or optimisation, and a privacy representative contact.

However, those additions do not automatically resolve every GDPR issue. Compliance still depends on the actual processing, transfer mechanism, contracts, safeguards, security controls, retention practices, and deployment model.


GDPR requirement | Why it matters for DeepSeek | Risk level
Transparency | Users need clear, granular information about collection, purposes, retention, sharing, training, and transfers. | Medium–High
Legal basis | Each use of prompts, logs, location, training data, and public personal data needs a valid lawful basis. | High
Data-subject rights | EU users must be able to exercise access, deletion, objection, restriction, and complaint rights effectively. | Medium–High
International transfers | China-based storage or processing requires lawful transfer safeguards and effective remedies. | High
Security | Prompts and uploads may contain sensitive or confidential information. | High
Representative in the EU | Current policy names a privacy representative, but organisations should verify scope and effectiveness. | Medium
AI training and web scraping | Training on user or public personal data raises purpose limitation, minimisation, transparency, and objection issues. | High
Business use / DPA | Companies need a DPA, clear processor/controller roles, retention terms, audit rights, and transfer terms. | High

For consumer users, DeepSeek may be acceptable for low-risk, non-personal prompts. For EU companies, public-sector bodies, and regulated organisations, the public hosted DeepSeek service should not be approved for personal or confidential data unless the organisation has documented the legal basis, transfer mechanism, contractual terms, security controls, retention rules, and user-rights process.


### Can Companies Use DeepSeek in a GDPR-Compliant Way?

Possibly, but only under strict controls. A company should not allow employees to use the public DeepSeek app for personal data or confidential business data unless it has completed a proper compliance review.

A safer approach may involve:

- Avoiding the public consumer app for personal data.

- Using a self-hosted or private deployment where possible.

- Keeping data in the EEA where technically and contractually feasible.

- Disabling model-training or service-improvement use where the relevant product and account provide such a setting, and verifying any API no-training commitment in the applicable contract.

- Signing a Data Processing Agreement where the provider acts as processor.

- Using SCCs or another lawful transfer mechanism if third-country transfers occur.

- Completing a Transfer Impact Assessment for China-related transfers.

- Conducting a DPIA where the use is likely to be high risk.

- Applying prompt filtering, access controls, audit logging, and data-loss prevention.

- Prohibiting staff from entering client, HR, legal, health, financial, children’s, or confidential data.

- Documenting vendor due diligence, risk decisions, and user instructions.

Self-hosting can reduce the risk of sending prompts to DeepSeek’s hosted service. But it does not remove GDPR duties. The organisation still needs a lawful basis, data minimisation, security controls, retention rules, user rights processes, and governance over how the AI system is used.


### DeepSeek Public App vs API vs Self-Hosted Model


Deployment model | Data control | Storage location | Training risk | DPA availability | GDPR risk | Suitable use cases
Public app / web service | Low | According to current policy, personal data may be processed and stored in China | Higher unless settings and policy prove otherwise | Not enough to assume | High | Low-risk public information, no personal or confidential data
API / business use | Medium, depending on contract | Depends on provider terms, routing, and infrastructure | Depends on API terms and opt-out controls | Must be verified | Medium–High | Controlled internal tools after vendor review
Self-hosted / private deployment | Higher | Chosen by the organisation | Lower if no external training or telemetry | Internal governance still needed | Lower–Medium | Enterprise use with EEA hosting and strict controls

The key difference is control. With the public app, the user accepts the provider’s default data flow. With API use, contractual terms may define processing more clearly. With self-hosting, the company can keep prompts inside its own infrastructure, but it becomes responsible for securing and governing the system.


### Practical Checklist Before Using DeepSeek in the EU

Before approving DeepSeek for any EU business use, ask:

- Have we mapped what data users may enter?

- Are we entering personal data?

- Are we entering confidential business data?

- Do we have a lawful basis for the processing?

- Do we know whether DeepSeek is a controller, processor, or independent provider for our use case?

- Do we have a DPA where required?

- Are transfers outside the EEA involved?

- Is there an adequacy decision or valid transfer safeguard?

- Have we completed a Transfer Impact Assessment?

- Have we completed a DPIA where required, using current EDPB or national supervisory-authority guidance rather than relying on an unapproved draft template?

- Can users exercise GDPR rights effectively?

- Do we know retention periods?

- Which model-training or service-improvement settings apply to the exact product and account, and does the API contract provide an explicit no-training commitment?

- Can we prevent staff from uploading sensitive or confidential data?

- Is there a safer EU-hosted, private, or self-hosted option?


### What EU Users Should Do

Individual EU users should treat the public DeepSeek app as a high-caution tool for privacy. Do not enter sensitive personal information, medical information, financial details, legal documents, employment disputes, passport data, children’s data, private photos, or confidential third-party information.

For business users, the safest rule is to avoid entering personal or confidential data into DeepSeek’s public consumer service. For API use, map the complete data flow and verify the Open Platform Terms, caching, logging, retention, transfer mechanism, downstream privacy notice, and contractual safeguards. For self-hosted use, confirm that prompts, outputs, logs, backups, monitoring, and support data remain within the approved environment.


### Conclusion

DeepSeek AI under EU scrutiny is a GDPR issue because regulators are concerned about transparency, legal basis, user rights, security, EU territorial scope, representative obligations, AI training practices, and especially transfers of personal data to China.

For EU businesses, the safest position is not to treat the public China-hosted DeepSeek service as GDPR-compliant by default. A compliant use case may require private deployment, EU data hosting, strong contractual safeguards, a DPA, SCCs where relevant, TIA/DPIA documentation, access controls, training opt-outs, and strict rules on what users may enter.

DeepSeek may be a powerful AI tool, but under GDPR, technical capability is not enough. The compliance question is about data flows, legal basis, transparency, enforceable rights, security, and accountability.


### FAQ


#### 1. Is DeepSeek GDPR compliant?

DeepSeek should not be assumed GDPR-compliant by default for EU personal data, especially when using the public China-hosted app. Compliance depends on the deployment model, data entered, legal basis, contracts, transfer safeguards, and current privacy controls.


#### 2. Why is DeepSeek AI under EU scrutiny?

DeepSeek is under EU scrutiny because regulators questioned its handling of personal data, transparency, legal basis, user rights, AI training practices, and transfers of personal data to China.


#### 3. Does DeepSeek store EU user data in China?

For services covered by DeepSeek’s Privacy Policy, the policy states that personal data is directly collected, processed, and stored in the People’s Republic of China. EU organizations should not extend that statement automatically to every API or self-hosted deployment; instead, they should verify the precise data flow, transfer mechanism, and contractual terms for the selected deployment.


#### 4. Can EU companies use DeepSeek legally?

Possibly, but only after a proper GDPR assessment. Companies should avoid the public app for personal data, verify contract terms, complete transfer assessments, consider DPIA requirements, and implement technical controls.


#### 5. Is DeepSeek safe for business data?

The public app should not be treated as safe for confidential business data by default. Companies should avoid entering client data, legal documents, HR records, financial information, source code, trade secrets, or regulated data unless a compliant enterprise or private setup is in place.


#### 6. Is self-hosting DeepSeek more GDPR-friendly?

Self-hosting can be more GDPR-friendly because it may keep prompts, files, and outputs within the organisation’s own environment. However, the organisation still needs lawful basis, data minimisation, retention rules, security, access control, and user-rights processes.


#### 7. What should I avoid entering into DeepSeek?

Avoid entering sensitive personal data, confidential company data, client documents, legal files, health information, financial data, children’s data, HR records, authentication secrets, and anything subject to contractual or regulatory confidentiality.

## 内部链接
- [DeepSeek](https://chat-deep.ai/)

## 外部链接
- [international data transfers](https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/obligations/what-rules-apply-if-my-organisation-transfers-data-outside-eu_en)
- [the Garante](https://www.gpdp.it/web/guest/home/docweb/-/docweb-display/docweb/10096856)
- [what personal data they collected](https://www.gpdp.it/web/guest/home/docweb/-/docweb-display/docweb/10096856)
- [ordered an urgent limitation on processing Italian users’ data](https://www.gpdp.it/web/guest/home/docweb/-/docweb-display/docweb/10097450)
- [AI enforcement](https://www.edpb.europa.eu/news/news/2025/edpb-adopts-statement-age-assurance-creates-task-force-ai-enforcement-and-gives_en)
- [adequacy decision](https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/obligations/what-rules-apply-if-my-organisation-transfers-data-outside-eu_en)
- [Standard Contractual Clauses](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en)
- [Berlin Commissioner for Data Protection](https://www.datenschutz-berlin.de/fileadmin/user_upload/pdf/pressemitteilungen/2025/20250627-BlnBDI-Press-Release_DeepSeek.pdf)
- [Article 3(2)(a) GDPR](https://www.gpdp.it/web/guest/home/docweb/-/docweb-display/docweb/10098477)
- [Articles 31, 12, 13, 14, 6, 32, 27, and Chapter III rights](https://www.gpdp.it/web/guest/home/docweb/-/docweb-display/docweb/10098477)
- [Article 46(1) GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng)
- [EU territorial scope](https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-32018-territorial-scope-gdpr-article-3-version_en)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fprivacy-security%2Fdeepseek-gdpr%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fprivacy-security%2Fdeepseek-gdpr%2F&text=Is%20DeepSeek%20GDPR%20Compliant%3F%20EU%20Scrutiny%2C%20China%20Data%20Transfers%20%26amp%3B%20Business%20Risks)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fprivacy-security%2Fdeepseek-gdpr%2F&title=Is%20DeepSeek%20GDPR%20Compliant%3F%20EU%20Scrutiny%2C%20China%20Data%20Transfers%20%26amp%3B%20Business%20Risks)