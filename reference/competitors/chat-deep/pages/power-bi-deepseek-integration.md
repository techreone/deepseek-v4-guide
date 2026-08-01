# DeepSeek Power BI Integration: Power Query Guide

- **URL**: https://chat-deep.ai/guide/power-bi-deepseek-integration/
- **Published**: 2026-05-16T06:28:03+00:00
- **Modified**: 2026-07-29T12:11:27+00:00
- **Category**: DeepSeek Guides
- **Word count**: 2528
- **Code blocks**: 5
- **Description**: Connect DeepSeek to Power BI with Power Query M, structured JSON, refresh controls, error handling, security practices and production guidance for teams.

## H1


## H2 目录
- Can Power BI connect to DeepSeek?
- Choose the right architecture
- Prerequisites
- Connect DeepSeek to Power BI with Power Query
- Why this example is safe for a demo—not a production secret design
- Production architecture for larger or sensitive workloads
- Refresh, rate-limit, and cost controls
- Security and privacy checklist
- Troubleshooting
- Using DeepSeek to help with DAX
- FAQ
- Sources and verification notes

## 正文
Connect DeepSeek to Power BI with corrected Power Query M, structured JSON, refresh controls, error handling, security, and production guidance. Last technically reviewed: July 28, 2026.

You can connect DeepSeek to Power BI today, but there is no native DeepSeek connector in Power BI. The simplest proof of concept is a Power Query custom function that sends text to the official DeepSeek Chat Completions API, requests a small JSON response, and returns validated fields to your table.

The example below fixes the common failure points in this workflow: invalid Power Query syntax, obsolete model names, empty model responses, unvalidated categories, repeated refresh calls, and misleading API-key guidance.

Important: this is an independent guide, not official DeepSeek or Microsoft documentation. API behavior, model availability, Power BI refresh rules, and prices can change. Verify the linked primary sources before a production deployment.


### Can Power BI connect to DeepSeek?

Yes. Power Query can make an HTTP POST request with Web.Contents, create the request payload with Json.FromValue, and parse the response with Json.Document. DeepSeek exposes an OpenAI-compatible Chat Completions route at:


```
https://api.deepseek.com/chat/completions
```

This works well for bounded text-enrichment tasks such as:

- classifying survey comments or support tickets;

- extracting a small set of fields from text;

- assigning sentiment or issue labels;

- creating short, reviewable summaries; and

- drafting explanations of data-quality issues.

It is a poor design for an unbounded report refresh that sends thousands of rows to an external model every time the semantic model refreshes. For that workload, preprocess the data outside Power BI and load the reviewed results.


### Choose the right architecture


Approach | Best for | Main trade-off
Direct DeepSeek API call from Power Query | Small proof of concept with non-sensitive text | The key is present in the PBIX/query environment and refresh can repeat calls
Server-side middleware or scheduled enrichment job | Production workloads, controlled secrets, retries, caching, and audit logs | Requires a small backend or data-engineering workflow
Microsoft Foundry-hosted DeepSeek deployment | Organizations that require Azure governance and identity controls | Endpoint, deployment name, supported parameters, and billing differ from the direct DeepSeek API
Self-hosted open-weight model | Teams that need infrastructure and data-residency control | You own model serving, security, monitoring, and capacity

For most teams, direct Power Query access is a useful experiment. A server-side enrichment layer is the safer production pattern.


### Prerequisites

- Power BI Desktop and access to Power Query Editor.

- An official DeepSeek API account and API key.

- A small test table with a text column.

- Approval to send that text to an external hosted AI service.

- A budget and refresh plan.

Do not begin with confidential data or a full production table. Test with 10–50 non-sensitive rows first.


### Connect DeepSeek to Power BI with Power Query


#### 1. Create an API key and a Power BI parameter

Create the key in the official DeepSeek developer platform. In Power Query, create a text parameter named pDeepSeekApiKey for the proof of concept.

A Power Query parameter is not an enterprise secret vault. Anyone who can inspect the PBIX or query may be able to recover the value. Never publish a sample PBIX containing a live key. Use middleware, a reviewed custom connector, or an approved secret-management design for production.


#### 2. Create the Power Query function

In Power Query Editor, create a blank query, open Advanced Editor, paste the code below, and name the query fnDeepSeekClassifyFeedback.


```
let
    fnDeepSeekClassifyFeedback =
        (
            feedbackText as nullable text,
            apiKey as text
        ) as record =>
        let
            CleanText =
                if feedbackText = null
                then ""
                else Text.Trim(Text.From(feedbackText)),

            EmptyResult =
                [
                    Category = null,
                    HttpStatus = null,
                    Error = null,
                    RawText = null
                ],

            Result =
                if CleanText = "" then
                    EmptyResult
                else if Text.Trim(apiKey) = "" then
                    [
                        Category = null,
                        HttpStatus = null,
                        Error = "Missing DeepSeek API key.",
                        RawText = null
                    ]
                else
                    let
                        BaseUrl = "https://api.deepseek.com",

                        AllowedCategories =
                            {
                                "Complaint",
                                "Refund",
                                "Inquiry",
                                "Technical Support",
                                "Suggestion",
                                "Praise"
                            },

                        SystemPrompt =
                            "Classify customer feedback into exactly one allowed category: " &
                            Text.Combine(AllowedCategories, ", ") &
                            ". Return only JSON in this exact shape: " &
                            "{""category"":""Complaint""}.",

                        RequestBody =
                            [
                                model = "deepseek-v4-flash",
                                thinking = [type = "disabled"],
                                messages =
                                    {
                                        [role = "system", content = SystemPrompt],
                                        [role = "user", content = CleanText]
                                    },
                                response_format = [type = "json_object"],
                                temperature = 0,
                                max_tokens = 100
                            ],

                        RequestAttempt =
                            try
                                Web.Contents(
                                    BaseUrl,
                                    [
                                        RelativePath = "chat/completions",
                                        Headers =
                                            [
                                                #"Content-Type" = "application/json",
                                                #"Authorization" = "Bearer " & apiKey
                                            ],
                                        Content = Json.FromValue(RequestBody),
                                        ManualStatusHandling =
                                            {400, 402, 404, 422, 429, 500, 503},
                                        Timeout = #duration(0, 0, 2, 0)
                                    ]
                                ),

                        ResultFromRequest =
                            if RequestAttempt[HasError] then
                                [
                                    Category = null,
                                    HttpStatus = null,
                                    Error =
                                        try RequestAttempt[Error][Message]
                                        otherwise "The API request failed.",
                                    RawText = null
                                ]
                            else
                                let
                                    ResponseBinary = RequestAttempt[Value],

                                    HttpStatus =
                                        try
                                            Value.Metadata(ResponseBinary)[Response.Status]
                                        otherwise
                                            200,

                                    ResponseJson =
                                        try Json.Document(ResponseBinary)
                                        otherwise null,

                                    ApiError =
                                        if HttpStatus >= 400 then
                                            try Text.From(ResponseJson[error][message])
                                            otherwise
                                                "DeepSeek returned HTTP " &
                                                Number.ToText(HttpStatus) & "."
                                        else
                                            null,

                                    AssistantText =
                                        if ApiError = null then
                                            try
                                                Text.From(
                                                    ResponseJson[choices]{0}[message][content]
                                                )
                                            otherwise
                                                null
                                        else
                                            null,

                                    OutputJson =
                                        if AssistantText <> null and
                                           Text.Trim(AssistantText) <> "" then
                                            try Json.Document(AssistantText)
                                            otherwise null
                                        else
                                            null,

                                    CategoryCandidate =
                                        if OutputJson <> null then
                                            try Text.From(OutputJson[category])
                                            otherwise null
                                        else
                                            null,

                                    ValidationError =
                                        if ApiError <> null then
                                            ApiError
                                        else if AssistantText = null or
                                                Text.Trim(AssistantText) = "" then
                                            "The model returned empty content."
                                        else if OutputJson = null then
                                            "The model response was not valid JSON."
                                        else if CategoryCandidate = null then
                                            "The JSON response did not contain category."
                                        else if not List.Contains(
                                            AllowedCategories,
                                            CategoryCandidate
                                        ) then
                                            "The returned category was not allowed."
                                        else
                                            null
                                in
                                    [
                                        Category =
                                            if ValidationError = null
                                            then CategoryCandidate
                                            else null,
                                        HttpStatus = HttpStatus,
                                        Error = ValidationError,
                                        RawText = AssistantText
                                    ]
                    in
                        ResultFromRequest
        in
            Result
in
    fnDeepSeekClassifyFeedback
```

This version returns a record rather than silently placing error text inside the category column. That makes failures visible and prevents a value such as “ERROR 429” from being counted as a customer-feedback category.

The request uses deepseek-v4-flash with thinking disabled because this is a short classification task. Test deepseek-v4-pro only if your workload genuinely needs the additional capability and the extra cost/latency is acceptable.


#### 3. Set the web source credentials correctly

Microsoft states that POST requests made with Web.Contents can only be made with the web source set to Anonymous. In this example, “Anonymous” describes Power Query’s data-source authentication mode; the request itself still carries the DeepSeek bearer token in the Authorization header.

- Open File → Options and settings → Data source settings.

- Select https://api.deepseek.com.

- Edit permissions and choose Anonymous.

- Set the privacy level according to your organization’s data-governance policy.

Do not disable Power Query privacy protections simply to make a confidential-data workflow run. If the Formula Firewall blocks a combination of private and external sources, redesign the data flow or move the API call to a controlled staging service.

Power Query’s built-in web connector handles authentication responses specially. Outside a custom connector, do not rely on ManualStatusHandling to intercept 401 and 403 responses. The outer try captures ordinary request errors, but credential-dialog and service-refresh behavior can still differ. A reviewed custom connector or middleware gives you better authentication and diagnostic control.


#### 4. Invoke and expand the function

Assume the source table contains a column called CustomerFeedback. Add a custom column with:


```
= Table.AddColumn(
    PreviousStep,
    "DeepSeekResult",
    each fnDeepSeekClassifyFeedback(
        [CustomerFeedback],
        pDeepSeekApiKey
    ),
    type record
)
```

Expand DeepSeekResult into:

- Category

- HttpStatus

- Error

- RawText

Keep the diagnostic fields during testing. You may hide them from report consumers later, but retaining a controlled audit table is useful.


#### 5. Validate the result

Before publishing the report:

- manually label a representative test set;

- compare the model’s labels with the approved labels;

- inspect every non-null Error value;

- review edge cases, ambiguous text, and multilingual inputs;

- record the model ID, prompt version, and classification date; and

- decide who can correct a classification.

JSON validity is not semantic accuracy. A perfectly valid response such as {"category":"Praise"} can still be the wrong classification.


### Why this example is safe for a demo—not a production secret design

The code is intentionally transparent so analysts can understand the request and response. That also means the API key is supplied to M code. A PBIX parameter prevents accidental copying into every function call, but it does not make the key inaccessible to people who can inspect or edit the file.

Use this direct pattern only when all of the following are true:

- the data is non-sensitive and approved for the hosted DeepSeek API;

- the row count and refresh frequency are small;

- the PBIX is restricted to trusted users;

- the key can be rotated quickly; and

- errors and outputs are reviewed.

DeepSeek’s Open Platform Terms say developers must protect API keys and must not expose them in browser or client-side code. For a production BI workflow, store the key behind a server-side endpoint that Power BI is authorized to call.


### Production architecture for larger or sensitive workloads


```
Approved source data
        ↓
Redaction and validation
        ↓
Server-side enrichment job
        ↓
DeepSeek API
        ↓
Schema validation + human review
        ↓
Database or lakehouse table
        ↓
Power BI semantic model
```

This architecture allows the backend to manage secrets, stable row IDs, retries, throttling, content hashes, prompt versions, model versions, costs, and review status. Power BI then imports a deterministic table instead of invoking a language model during every report refresh.

A useful cache key is a hash of the normalized input plus the prompt version and model ID. Reuse the prior reviewed output only when all three match.


### Refresh, rate-limit, and cost controls

Power BI refresh can evaluate a query more than once for previews, schema discovery, or normal refresh behavior. A row-by-row web function can therefore create more API traffic than the visible number of table rows suggests.

Use these controls:

- filter to new or changed rows before calling the API;

- persist accepted results outside the PBIX;

- use a stable input hash to prevent duplicate work;

- keep prompts and outputs short;

- set a small max_tokens for classification;

- monitor token usage and error rates;

- throttle requests and use bounded retries in a backend service;

- never launch thousands of parallel calls from a desktop proof of concept; and

- check the official pricing page before estimating cost.

DeepSeek’s current rate-limit documentation uses account-level concurrency limits and returns HTTP 429 when the limit is exceeded. Limits and prices are operational facts, so link to the live documentation instead of hard-coding them into a long-lived Power BI report.


### Security and privacy checklist

- Minimize the payload: send only the text required for the classification.

- Remove identifiers: redact names, email addresses, account numbers, health information, and other sensitive fields before the request.

- Do not send secrets: exclude passwords, access tokens, private keys, unreleased code, and confidential documents.

- Review the provider terms: read DeepSeek’s current privacy policy and Open Platform Terms.

- Protect the API key: keep production credentials in a server-side secret store and rotate leaked keys.

- Respect Power Query privacy levels: do not bypass the Formula Firewall without understanding the data path.

- Validate output: allow-list categories and keep humans in the loop where labels affect people or material decisions.

- Minimize logs: retain enough information to audit the workflow without creating a second sensitive-data store.

- Document the system: record the model, prompt, data classes, retention, reviewers, and incident owner.


### Troubleshooting


Symptom | Likely cause | What to check
Credential prompt, 401, or “Authorization header” error | Wrong key or the web source is not set to Anonymous | Set https://api.deepseek.com to Anonymous, verify the bearer token, and rotate the key if exposure is possible
402 | Insufficient balance | Check the official developer console and billing account
400 or 422 | Invalid request body, field, or model name | Use a current model ID and compare the payload with the official API reference
429 | Concurrency limit reached | Reduce calls, throttle, cache, and retry later with bounded backoff
500 or 503 | Provider-side error or temporary overload | Check the official status page and retry safely outside the row-level report query
Empty content | JSON Output can occasionally return empty content | Retry the individual item, simplify the prompt, and keep an explicit error state
Invalid JSON | Truncation or malformed output | Include “JSON” and an example in the prompt, use response_format, and set a sufficient max_tokens
Works in Desktop but fails in the Service | Service credentials, gateway, privacy, or refresh configuration | Review semantic-model data-source credentials and refresh history; consider moving enrichment upstream
Formula.Firewall | Power Query is preventing an unsafe data combination | Review privacy levels and redesign the flow; do not disable protections casually


### Using DeepSeek to help with DAX

DeepSeek can draft or explain DAX, but it does not know your semantic model unless you provide the relevant tables, relationships, measures, and expected result. Treat generated DAX as a code-review starting point.

A useful prompt is:


```
You are reviewing a Power BI DAX measure.

Requirement:
[describe the business calculation]

Tables, columns, and relationships:
[provide only the necessary schema]

Existing measure:
[paste the measure]

Expected result and test cases:
[provide known examples]

Return:
1. the revised measure;
2. assumptions;
3. filter-context risks; and
4. three tests I should run in Power BI.
```

Run the proposed measure against known totals and edge cases before using it in a business report.


### FAQ


#### Does Power BI have an official DeepSeek connector?

No native DeepSeek connector is documented in Power BI. You can call the API with Power Query, use a governed intermediary, connect to a Microsoft Foundry deployment, or import results produced by another pipeline.


#### Which DeepSeek model should I use for Power BI classification?

Start with deepseek-v4-flash and disable thinking for short, deterministic classification. Test deepseek-v4-pro for harder tasks. Use the current official model list rather than legacy aliases.


#### Can I store the DeepSeek API key in a Power Query parameter?

You can use a parameter for a controlled proof of concept, but it is not a secure production secret store. Users who can inspect the PBIX or query may be able to obtain the value.


#### Can Power BI Service refresh this query?

It may work when the web source credentials and refresh settings are configured correctly, but a successful Desktop test does not guarantee Service behavior. Direct row-level AI calls are fragile at scale; production workflows should normally enrich and persist the data upstream.


#### Why return a record with an Error field?

It separates operational failures from valid business categories. This prevents failed API calls from silently becoming chart values and gives reviewers a clear exception queue.


#### Can I send customer or employee data to DeepSeek?

Not by default. Classify the data, remove identifiers, review DeepSeek’s policies and your legal obligations, and obtain organizational approval. DeepSeek’s hosted-service privacy policy says its services are not designed or intended to process sensitive personal data.


### Sources and verification notes

- DeepSeek: List Models

- DeepSeek: Create Chat Completion

- DeepSeek: JSON Output

- DeepSeek: Error Codes

- DeepSeek: Rate Limit & Isolation

- DeepSeek: Models & Pricing

- DeepSeek Open Platform Terms of Service

- DeepSeek Privacy Policy

- Microsoft: Web.Contents

- Microsoft: Power Query Web connector

- Microsoft: Power Query privacy levels

- Microsoft: Data refresh in Power BI

Editorial note: verify the M function in the current Power BI Desktop release and run a real test request before publication. Do not publish a live API key in code, screenshots, downloadable files, or page source.

## 外部链接
- [Web.Contents](https://learn.microsoft.com/en-us/powerquery-m/web-contents)
- [Open Platform Terms](https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html)
- [official pricing page](https://api-docs.deepseek.com/quick_start/pricing/)
- [DeepSeek: List Models](https://api-docs.deepseek.com/api/list-models/)
- [DeepSeek: Create Chat Completion](https://api-docs.deepseek.com/api/create-chat-completion/)
- [DeepSeek: JSON Output](https://api-docs.deepseek.com/guides/json_mode/)
- [DeepSeek: Error Codes](https://api-docs.deepseek.com/quick_start/error_codes/)
- [DeepSeek: Rate Limit & Isolation](https://api-docs.deepseek.com/quick_start/rate_limit/)
- [DeepSeek: Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- [DeepSeek Open Platform Terms of Service](https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html)
- [DeepSeek Privacy Policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html)
- [Microsoft: Web.Contents](https://learn.microsoft.com/en-us/powerquery-m/web-contents)
- [Microsoft: Power Query Web connector](https://learn.microsoft.com/en-us/power-query/connectors/web/web)
- [Microsoft: Power Query privacy levels](https://learn.microsoft.com/en-us/power-query/privacy-levels)
- [Microsoft: Data refresh in Power BI](https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-data)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fguide%2Fpower-bi-deepseek-integration%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fguide%2Fpower-bi-deepseek-integration%2F&text=DeepSeek%20Power%20BI%20Integration%3A%20Power%20Query%20Guide)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fguide%2Fpower-bi-deepseek-integration%2F&title=DeepSeek%20Power%20BI%20Integration%3A%20Power%20Query%20Guide)