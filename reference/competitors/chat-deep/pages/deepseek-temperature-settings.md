# DeepSeek Temperature Settings: Top-P & Stop Tests

- **URL**: https://chat-deep.ai/docs/deepseek-temperature-settings/
- **Published**: 
- **Modified**: 
- **Category**: DeepSeek API Docs
- **Word count**: 4826
- **Code blocks**: 9
- **Description**: DeepSeek temperature settings tested live across temperature, top_p, and stop sequences, with repeated-run diversity, compliance, token, and cost results.

## H1


## H2 目录
- Which DeepSeek sampling setting should you use?
- Live benchmark results at a glance
- DeepSeek sampling settings quick reference
- Critical V4 caveat: thinking mode ignores temperature and top_p
- How we ran the live benchmark
- DeepSeek temperature benchmark: diversity versus adherence
- DeepSeek top_p benchmark
- Temperature versus top_p
- DeepSeek stop sequences tested
- max_tokens and boundary-validation results
- Reproducible Python example
- Reproducible Node.js stop-sequence example
- Recommended DeepSeek temperature settings by workload
- Token, cost, and timing observations
- Production checklist
- What this benchmark does not prove
- Frequently asked questions
- Official sources and evidence

## 正文
Independent live API benchmark | Tested July 25, 2026 | 93 requests | deepseek-v4-flash

DeepSeek temperature settings are easy to configure and easy to test incorrectly. The reason is specific to current DeepSeek V4: thinking mode is enabled by default, while DeepSeek’s official guide says temperature and top_p have no effect in thinking mode. A request can be accepted even though those sampling fields are not controlling the response.

We avoided that trap by explicitly disabling thinking mode and sending 93 sequential requests to the live Chat Completions endpoint. The run included repeated temperature and top-p sweeps, an exploratory joint matrix, stop-sequence fixtures, max_tokens controls, and invalid-boundary probes. We recorded every result, including malformed JSON and HTTP 400 responses.

The central finding was not that one number is universally “best.” On our fixed English naming task, broader settings generally produced more varied text, but the highest tested temperature also had the weakest strict-format adherence. Temperature 0 did not produce identical output in this run: four distinct normalized outputs appeared in six repeats. All 16 stop-sequence calls passed our exact content checks, while the 17-sequence request was rejected.


> Quick answer: For current DeepSeek V4, explicitly send "thinking":{"type":"disabled"} before expecting temperature or top_p to matter. Start with the official task guidance, change one sampling control at a time, and evaluate repeated outputs on your own prompts. Use stop for a generation boundary, not as a substitute for parsing or validation.


### Which DeepSeek sampling setting should you use?

There is no single setting that is best for every workload. The current DeepSeek Chat Completions reference documents:

- temperature: default 1, supported from 0 through 2.

- top_p: default 1, with a documented maximum of 1.

- stop: one string or an array containing up to 16 strings.

- thinking.type: enabled or disabled, with thinking enabled by default on current V4 models.

DeepSeek generally recommends changing temperature or top_p, not both. That advice is useful operationally: when only one variable changes, it is easier to connect an observed difference to the setting under test.

As a starting point, DeepSeek’s official temperature guidance recommends 0.0 for coding and math, 1.0 for data cleaning and analysis, 1.3 for general conversation and translation, and 1.5 for creative writing and poetry. Those values are starting points, not quality guarantees.

For a production system, choose the lowest-variance setting that still gives the range of responses your application needs. Then measure correctness, format compliance, safety, length, and cost on a representative evaluation set. Diversity alone is not quality.


### Live benchmark results at a glance


![Live evidence dashboard for 93 calls: 88 HTTP 200, 5 HTTP 400, 0 transport failures, 7475 prompt tokens, 2134 completion tokens, and 0 reasoning tokens.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

The benchmark ran from 2026-07-25T18:21:19.104Z to 2026-07-25T18:23:03.569Z against:


```
POST https://api.deepseek.com/chat/completions
model: deepseek-v4-flash
thinking: disabled
stream: false
concurrency: 1
retries: 0
```


Result | Observed value
Planned and attempted calls | 93
HTTP 200 responses | 88
Boundary probes returning HTTP 400 | 5
Transport failures | 0
Calls meeting every preregistered check | 82 / 93
Valid-setting calls meeting every suite check | 77 / 88
Prompt tokens | 7,475
Completion tokens | 2,134
Reasoning tokens | 0
Provider-reported cache-hit input tokens | 0
Calculated cost at the dated Flash rates | $0.00164402
Observed system fingerprints | 1

All five boundary probes returned HTTP 400. Four directly out-of-contract probes had preregistered client-error expectations; the top_p: -0.01 probe was observational and its pass condition required only one recorded HTTP response in one attempt, not a particular status. Eleven HTTP 200 sampling responses missed at least one strict JSON content rule. The stop and max_tokens suites passed every predefined check.

The combined 82 / 93 figure is not a model-accuracy percentage. It mixes generation-contract checks with probes that were expected to produce client errors. For the repeated sampling matrix alone, 55 of 66 responses passed the full content contract.

All 88 successful responses returned deepseek-v4-flash. They reported one fingerprint:


```
fp_8b330d02d0_prod0820_fp8_kvcache_20260402
```

That fingerprint and every numerical result are dated observations. A later backend, model revision, account, or prompt can behave differently.


### DeepSeek sampling settings quick reference


Control | What it changes | Current contract and practical note
thinking.type | Selects thinking or non-thinking mode | Current V4 defaults to enabled. Disable it for temperature or top-p tuning.
temperature | Changes how concentrated or varied token selection is | Default 1; documented range 0 to 2. Lower is generally more focused; higher is generally more varied.
top_p | Limits selection to a cumulative probability mass | Default 1; documented maximum 1. Conservative production tests normally use positive values up to 1.
stop | Ends visible generation when a configured sequence is encountered | One string or up to 16 strings. A natural completion can also report finish_reason: "stop".
max_tokens | Caps generated tokens | A low cap can produce finish_reason: "length" and incomplete output.
response_format | Requests JSON output | It does not replace application-level parsing and schema validation.
presence_penalty | Legacy tuning field | The current reference marks it deprecated and says it has no effect.
frequency_penalty | Legacy tuning field | The current reference marks it deprecated and says it has no effect.

The contracts above come from the current Create Chat Completion and Thinking Mode documentation.


### Critical V4 caveat: thinking mode ignores temperature and top_p


![Explainer contrasting DeepSeek thinking mode, where official documentation says temperature and top-p do not take effect, with the benchmark's explicit disabled setting and zero observed reasoning tokens.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

DeepSeek V4 Flash and V4 Pro support thinking and non-thinking operation, and the current Models and Pricing page says thinking is enabled by default. The official Thinking Mode guide lists temperature, top_p, presence_penalty, and frequency_penalty as unsupported in thinking mode. For compatibility, those fields can be accepted without an error, but DeepSeek says they have no effect.

This request is therefore not a valid V4 temperature experiment:


```
{
  "model": "deepseek-v4-flash",
  "messages": [
    {"role": "user", "content": "Write one product tagline."}
  ],
  "temperature": 1.5
}
```

It omits thinking, so the current default applies. The corrected request is:


```
{
  "model": "deepseek-v4-flash",
  "messages": [
    {"role": "user", "content": "Write one product tagline."}
  ],
  "thinking": {"type": "disabled"},
  "temperature": 1.5,
  "max_tokens": 48
}
```

Every valid benchmark request explicitly used non-thinking mode. Every successful row also checked that reasoning_content was absent and the provider-reported reasoning-token count was zero. The complete run returned zero reasoning tokens.

We did not use a small thinking-mode sample to “prove” the documented no-effect rule. Repeated outputs can differ for many reasons, and a finite output comparison cannot reveal the internal sampler. The official contract is the authority for thinking-mode support.


### How we ran the live benchmark


#### One fixed, machine-scored task

All 66 sampling requests used byte-identical English messages. The task asked for one fictional privacy-note app name and a six-to-twelve-word tagline in a JSON object with exactly two keys, in a fixed order:


```
[
  {
    "role": "system",
    "content": "You are a product-naming assistant. Obey the JSON contract exactly. Use English words and ASCII punctuation only."
  },
  {
    "role": "user",
    "content": "Invent one original name and one six-to-twelve-word tagline for a fictional privacy-first note-taking app. Return one JSON object with exactly two string keys in this order: \"name\" and \"tagline\". Do not use Markdown or add any other text."
  }
]
```

We also sent response_format: {"type":"json_object"} and capped each sampling output at 80 tokens. A contract pass required valid JSON, only the name and tagline keys in the required order, nonempty strings, a six-to-twelve-word normalized tagline, strings containing at least one ASCII letter and only the allowed ASCII characters, a stop finish reason, consistent usage equations, and no reasoning output.

This is intentionally stricter than “the server returned JSON-looking text.” It separates response diversity from application compliance.


#### Preregistered request matrix


Suite | Settings | Repeats | Calls
Temperature sweep | 0, 0.5, 1, 1.5, 2; top_p omitted | 6 each | 30
Top-p sweep | 0.1, 0.3, 0.7, 1; temperature omitted | 6 each | 24
Joint exploration | (0.2, 0.2), (0.2, 0.9), (1.5, 0.2), (1.5, 0.9) | 3 each | 12
Stop sequences | Five repeated fixtures plus one 16-string case | Varies | 16
max_tokens controls | Tight and roomy caps | 3 each | 6
Validation probes | Temperature, top-p, and stop-count boundaries | 1 each | 5
Total |  |  | 93

The single-parameter sweeps omitted the other sampling field, allowing its documented default of 1 to apply. Joint settings were exploratory because DeepSeek recommends adjusting only one of the two controls.

Requests ran sequentially with no retries. Conditions were rotated in a deterministic, balanced order so that one setting was not always tested first or last. The ordering algorithm did not seed the model. The current Chat Completions schema does not document a seed request field, and we did not send one.


#### What the diversity metrics mean

For each condition, we normalized responses that returned HTTP 200, parsed as JSON, and produced a nonempty normalized output. This valid-JSON diversity pool can therefore include a response that failed another rule, such as the tagline word limit or ASCII-punctuation requirement. We counted distinct outputs and calculated mean pairwise Jaccard distances:

- Word-set Jaccard distance of 0 means two samples used identical word sets.

- Values nearer 1 mean lower word overlap.

- Character-trigram distance adds a spelling-sensitive comparison.

- Contract pass rate measures rule adherence, not subjective quality.

The metrics compare responses only within the same setting and identical prompt. They do not measure factual accuracy, originality, safety, or whether a product name can legally be used.


### DeepSeek temperature benchmark: diversity versus adherence


![Temperature sweep from 0 to 2 with six repeats per setting, showing unique valid-JSON output ratio, full contract pass counts, and pairwise word Jaccard distance.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

Temperature was the only sampling field sent in this sweep. top_p was omitted and therefore used its documented default of 1.


Temperature | Strict contract passes | Valid-JSON diversity samples | Distinct outputs | Mean word Jaccard distance | Median completion tokens
0 | 6 / 6 | 6 | 4 / 6 | 0.542 | 29
0.5 | 6 / 6 | 6 | 4 / 6 | 0.491 | 29
1 | 5 / 6 | 6 | 6 / 6 | 0.818 | 29
1.5 | 5 / 6 | 5 | 5 / 5 | 0.918 | 28.5
2 | 2 / 6 | 5 | 5 / 5 | 0.984 | 39.5

Three observations matter.

First, temperature 0 did not produce byte-identical results. Six calls generated four distinct normalized name-and-tagline combinations, although all six used the same normalized product name. This is direct evidence against treating 0 as a reproducibility guarantee for this task and run.

Second, the valid-JSON samples became less textually similar at the middle and high settings. At temperature 1, all six valid-JSON responses were distinct. At 1.5, all five valid-JSON responses were distinct. At 2, five valid-JSON responses were distinct and the mean word-set distance reached 0.984.

Third, higher diversity did not mean stronger compliance. Both 0 and 0.5 passed the strict content contract six out of six times. Temperature 2 passed only twice. Its failures included taglines outside the requested word range, non-ASCII punctuation, and one malformed JSON response. Median completion tokens also rose to 39.5, compared with 29 at temperatures 0, 0.5, and 1.

For transparency, these are the first scheduled responses from selected conditions rather than hand-picked “best” examples:


Condition | First observed name | First observed tagline | Contract result
Temperature 0 | Cloaknote | Your thoughts, your data, your privacy, no compromises. | Pass
Temperature 1 | VaultNotes | Your thoughts encrypted, your privacy respected, always. | Pass
Temperature 1.5 | LockWord | Your thoughts lock tight decoded only by your eyes | Pass
Temperature 2 | Vaultlink Nodes | Lock every glance with byte-safe stenography for kept walls full is thin accord de jail. | Fail: word count

This does not establish a universal threshold where DeepSeek quality declines. It shows a tradeoff in six repeats of one constrained naming prompt. A coding evaluator, translation corpus, or customer-support rubric can produce a different curve.


#### Is temperature 0 deterministic?

No current DeepSeek document promises that it is. The official wording describes lower values as more focused and deterministic, which is directional rather than a byte-for-byte guarantee. Our temperature-zero sample repeated some outputs but still produced four distinct normalized responses in six calls.

If exact reproducibility matters, cache an approved response or make the downstream operation deterministic. Do not rely on sampling settings alone.


### DeepSeek top_p benchmark


![Top-p sweep at 0.1, 0.3, 0.7, and 1 with six repeats per setting, showing unique valid-JSON output ratio, full contract pass counts, and pairwise word Jaccard distance.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

top_p is nucleus sampling: the model considers tokens within a cumulative probability mass. A smaller value narrows that candidate mass; a value of 1 leaves the full documented mass available. In this sweep, temperature was omitted and used its default of 1.


top_p | Strict contract passes | Valid-JSON diversity samples | Distinct outputs | Mean word Jaccard distance | Median completion tokens
0.1 | 6 / 6 | 6 | 2 / 6 | 0.262 | 29
0.3 | 5 / 6 | 6 | 3 / 6 | 0.424 | 29
0.7 | 3 / 6 | 6 | 6 / 6 | 0.735 | 30.5
1 | 6 / 6 | 6 | 6 / 6 | 0.790 | 29

The narrowest tested value, 0.1, produced only two distinct normalized outputs, and all six responses used the same normalized name. At 0.3, three outputs were distinct. Both 0.7 and 1 produced six distinct outputs.

Adherence was not monotonic. top_p: 0.7 passed only three of six strict contracts, mainly because of a too-long tagline or non-ASCII punctuation, while top_p: 1 passed all six. With six repeats per value, this is a warning against turning one run into a permanent rule. The more defensible conclusion is that narrowing top_p reduced observed diversity at 0.1 and 0.3 on this prompt.

The current rendered Chat Completions schema prints a default of 1 and a maximum of 1, but it does not print an explicit lower bound. We therefore treated negative top_p as an observational semantic-boundary probe, not as a direct test of a printed minimum. The live API rejected both -0.01 and 1.01 with HTTP 400; its dated error message described the accepted range as (0, 1.0]. That observed validation message can change and should not be substituted for the published schema.


### Temperature versus top_p

Both controls influence the set of plausible next tokens, but they are different levers:

- Temperature changes how concentrated the relative token probabilities are.

- Top-p limits selection to tokens inside a cumulative probability-mass cutoff.

Use temperature when you want a familiar low-to-high variation control and the official workload presets are a useful starting point. Use top-p when you specifically want to narrow the candidate probability mass. In either case, hold the other control at its default while evaluating.

Our exploratory joint matrix illustrates why changing both makes diagnosis harder:


Temperature | top_p | Strict passes | Distinct valid-JSON outputs
0.2 | 0.2 | 2 / 3 | 2 / 3
0.2 | 0.9 | 3 / 3 | 2 / 3
1.5 | 0.2 | 3 / 3 | 1 / 3
1.5 | 0.9 | 3 / 3 | 3 / 3

At temperature 1.5, the three valid-JSON samples changed from three distinct outputs at top_p: 0.9 to one repeated output at top_p: 0.2. That is an interesting interaction in three calls, not a recommended preset or proof of the sampler’s internal implementation.


### DeepSeek stop sequences tested


![Stop-sequence matrix showing 16 of 16 adherence checks passed with zero stop-marker or forbidden-suffix leaks; a 17-sequence request returned HTTP 400.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

The stop field accepts one string or an array of up to 16 strings according to the Chat Completions reference. We designed fixtures with a required prefix, a stop marker, and a forbidden suffix. The preregistered scorer required all of the following:

- The expected prefix appeared.

- Every configured stop string was absent from returned content.

- Every post-stop forbidden fragment was absent.

- finish_reason was stop.

- The common HTTP, usage, and non-thinking checks passed.

For most truncation fixtures, that automated content rule used a prefix check rather than exact equality. We therefore performed a separate row-by-row audit of the raw returned content; all 16 responses exactly matched their intended pre-stop strings.


Fixture | Calls | First returned content | Marker leaks | Suffix leaks | Exact passes
Single string: " STOP_A7" | 3 | ALPHA | 0 | 0 | 3 / 3
Array: [" STOP_B"," STOP_A"] | 3 | RED | 0 | 0 | 3 / 3
Newline marker: "\nHALT_NOW" | 3 | FIRST_LINE | 0 | 0 | 3 / 3
Marker inside an identifier | 3 | PREFIX | 0 | 0 | 3 / 3
Absent-marker control | 3 | CONTROL_OK | 0 | 0 | 3 / 3
Maximum 16-string array | 1 | BEFORE | 0 | 0 | 1 / 1
Total valid stop calls | 16 |  | 0 | 0 | 16 / 16

In the array fixture, the prompt was:


```
Write exactly these five space-separated tokens: RED STOP_A GREEN STOP_B BLUE
```

The array listed STOP_B before STOP_A, but the returned content was RED. In this fixture, generation stopped at the first marker encountered in generated text, not the first item in the request array. This single case does not define universal precedence for overlapping, Unicode, or tokenization-sensitive strings.

The absent-marker control is equally important. It returned CONTROL_OK and still reported finish_reason: "stop" because the model ended naturally. DeepSeek documents the same finish reason for natural completion and a supplied stop. Applications therefore cannot use finish_reason alone to prove that a custom delimiter fired.

The 16-string request returned HTTP 200 and passed. A 17-string array returned HTTP 400 with a sanitized invalid_request_error stating that the stop array was too long. We did not test streaming, case variations, Unicode normalization, or overlapping markers, so the result should not be generalized to those cases.

Treat stop strings as an output boundary, not a security control. Always validate the returned content before executing code, displaying structured data, or writing to a database.


### max_tokens and boundary-validation results


![Comparison of three max-tokens 8 calls that each returned eight tokens with finish reason length and three max-tokens 32 controls that returned COLOR_BLUE in five tokens with finish reason stop.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

Three requests asked for a twenty-item color list with max_tokens: 8. All three stopped at exactly eight completion tokens with finish_reason: "length". Three roomy controls asked for COLOR_BLUE with max_tokens: 32; all three returned the exact text in five completion tokens and ended with stop.

The five invalid or semantic-boundary probes all returned HTTP 400:


Probe | Observed status | Sanitized result
temperature: -0.01 | 400 | API reported valid range [0, 2]
temperature: 2.01 | 400 | API reported valid range [0, 2]
top_p: -0.01 | 400 | API reported observed range (0, 1.0]
top_p: 1.01 | 400 | API reported observed range (0, 1.0]
17 stop strings | 400 | API reported stop array too long

These are dated server responses, not promises that error wording will remain unchanged.


### Reproducible Python example

This standard-library example changes temperature while leaving top_p omitted. It keeps the API key in an environment variable and explicitly disables thinking:


```
import json
import os
import urllib.request

url = "https://api.deepseek.com/chat/completions"
payload = {
    "model": "deepseek-v4-flash",
    "messages": [
        {
            "role": "system",
            "content": (
                "Return valid JSON with exactly the requested keys. "
                "Use English and ASCII punctuation."
            ),
        },
        {
            "role": "user",
            "content": (
                'Invent one app name. Return JSON like {"name":"Example"}.'
            ),
        },
    ],
    "thinking": {"type": "disabled"},
    "temperature": 0.2,
    "max_tokens": 48,
    "response_format": {"type": "json_object"},
}

request = urllib.request.Request(
    url,
    data=json.dumps(payload).encode("utf-8"),
    method="POST",
    headers={
        "Authorization": f"Bearer {os.environ['DEEPSEEK_API_KEY']}",
        "Content-Type": "application/json",
    },
)

with urllib.request.urlopen(request, timeout=120) as response:
    completion = json.load(response)

text = completion["choices"][0]["message"]["content"]
result = json.loads(text)
assert list(result) == ["name"]
print(result["name"])
```

For a top-p experiment, remove "temperature": 0.2 and send "top_p": 0.3. Do not change both fields in the same A/B test.

The official JSON Output guide says to set response_format: {"type":"json_object"}, explicitly include the word json in a system or user message, provide an example of the desired JSON shape, and set max_tokens high enough to avoid truncation. Even then, application validation remains necessary. Our strict sampling suite saw two malformed JSON responses at higher temperature conditions and several valid JSON objects that failed the tagline contract.


### Reproducible Node.js stop-sequence example

This example uses the built-in fetch available in current Node.js releases:


```
const response = await fetch(
  "https://api.deepseek.com/chat/completions",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek-v4-flash",
      messages: [
        {
          role: "user",
          content:
            "Write exactly these three space-separated tokens: " +
            "ALPHA STOP_A7 OMEGA",
        },
      ],
      thinking: { type: "disabled" },
      temperature: 0,
      stop: [" STOP_A7"],
      max_tokens: 32,
      stream: false,
    }),
  },
);

const body = await response.json();
if (!response.ok) {
  throw new Error(`DeepSeek returned HTTP ${response.status}`);
}

const choice = body.choices[0];
if (choice.message.content !== "ALPHA") {
  throw new Error("Unexpected stop-sequence result");
}
if (choice.message.content.includes("STOP_A7")) {
  throw new Error("Stop marker leaked into returned content");
}

console.log({
  content: choice.message.content,
  finishReason: choice.finish_reason,
  usage: body.usage,
  systemFingerprint: body.system_fingerprint,
});
```

Checking both content and finish_reason follows the lesson from the absent-marker control: a natural completion can also return stop.


### Recommended DeepSeek temperature settings by workload


![Decision guide mapping five production goals to starting settings and live evidence: temperature 0, top-p 0.1, top-p 1, temperature 1.5, and stop plus max-tokens controls.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

Use this table as a starting point, then run an application-specific evaluation. The numeric recommendations in the first column come from DeepSeek’s official temperature page; the validation advice reflects the risks demonstrated in our live test.


Workload | Official starting temperature | Production guidance
Coding and math | 0.0 | Run unit tests or exact-answer checks. Do not assume byte-identical reruns.
Data cleaning and analysis | 1.0 | Validate types, ranges, required fields, and calculations.
General conversation | 1.3 | Test tone, policy adherence, escalation, and response length.
Translation | 1.3 | Evaluate terminology, omissions, names, numbers, and locale rules.
Creative writing and poetry | 1.5 | Expect broader wording; keep hard format constraints separately validated.
Strict JSON or extraction | No separate official preset | Begin conservatively, use JSON Output correctly, and enforce an application schema.

Our small naming benchmark supports a cautious workflow rather than replacing the official table. Temperatures 0 and 0.5 delivered six of six strict contract passes. Temperature 2 produced the highest observed textual distance but only two of six strict passes. If your business requirement is machine-readable output, maximize validated success first and diversity second.


### Token, cost, and timing observations

DeepSeek does not price temperature or top-p as separate features. Cost depends on reported input and output tokens. At the V4 Flash prices checked on July 25, 2026, the rates were:


Usage class | Price per 1M tokens
Cache-hit input | $0.0028
Cache-miss input | $0.14
Output | $0.28

The run reported 7,475 cache-miss input tokens, zero cache-hit input tokens, and 2,134 output tokens. The calculation was:


```
7,475 x $0.14 / 1,000,000
+ 0 x $0.0028 / 1,000,000
+ 2,134 x $0.28 / 1,000,000
= $0.00164402
```

Repeated prompts did not produce provider-reported cache-hit tokens in this run. That is an observation, not evidence that cache hits are unavailable generally.

Temperature 2 used a median of 39.5 completion tokens in the six-call condition, while the other temperature medians ranged from 28.5 to 29. This shows how a sampling choice can affect cost indirectly when it changes output length. Six calls are too few to predict a stable billing multiplier.

For generation timing, we recomputed the distribution from the 88 HTTP 200 responses and excluded the five fast validation errors. We measured two distinct time fields:

- Median response-header availability: 289.284 ms.

- Median full-body completion: 1,175.867 ms.

- Full-body p95 by nearest rank: 1,521.255 ms.

- Maximum full-body time: 1,767.170 ms.

These are sequential observations from the benchmark runner. They are not streaming time to first token, and they should not be treated as a service-level benchmark for other locations, accounts, or prompts.


### Production checklist

- Use a current canonical model ID and record it with the test date.

- Explicitly select thinking or non-thinking mode.

- For sampling control, send thinking.type: "disabled".

- Change temperature or top-p, not both, during a diagnostic test.

- Use repeated, representative prompts instead of one attractive example.

- Score correctness and format adherence separately from diversity.

- Set max_tokens deliberately and handle finish_reason: "length".

- Validate JSON and every business rule after parsing.

- Inspect content as well as finish_reason when using stop sequences.

- Keep API keys in environment variables or a secret manager.

- Log the requested model, returned model, fingerprint, usage, and UTC time.

- Re-run the evaluation after model, fingerprint, prompt, or product changes.

Use our DeepSeek platform hub to navigate current guides and live tools, then keep this benchmark’s dated controls beside your application-specific evaluation.


### What this benchmark does not prove

This was one fixed English product-naming prompt on one model, endpoint, account, fingerprint, and date. Six repeats per single-parameter condition are descriptive, not a large statistical sample.

The results do not reveal DeepSeek’s internal sampler, establish a hidden seed, prove deterministic behavior at temperature 0, or rank subjective creativity. They do not generalize stop handling to streaming, case differences, Unicode normalization, overlapping sequences, all prompts, or future model revisions.

The joint matrix had only three samples per combination and was explicitly exploratory. Pricing, validation, fingerprints, limits, and model behavior can change. Re-test the current API and your real workload before making a production decision.


### Frequently asked questions


#### What are the best DeepSeek temperature settings?

There is no universal best value. DeepSeek recommends 0.0 for coding and math, 1.0 for data cleaning and analysis, 1.3 for general conversation and translation, and 1.5 for creative writing and poetry. Treat those as starting points and select a production value using repeated tests on your own tasks.


#### What is the default DeepSeek temperature?

The current DeepSeek Chat Completions reference documents a default temperature of 1 and a supported range from 0 through 2.


#### What temperature should I use for DeepSeek coding?

DeepSeek’s official task table recommends 0.0 for coding and math. Still compile the result, run tests, validate dependencies, and review security-sensitive changes. Temperature 0 is not a documented guarantee of identical output.


#### What is the difference between DeepSeek temperature and top_p?

Temperature changes how concentrated the relative token probabilities are. Top-p restricts selection to a cumulative probability mass. They can both alter observed variety, but DeepSeek generally recommends adjusting one rather than both.


#### Should I change temperature and top_p together?

Usually no. DeepSeek recommends changing temperature or top-p, not both. Holding one at its default makes an A/B test easier to interpret. Our joint matrix was exploratory, not a set of recommended presets.


#### Do temperature and top_p work in DeepSeek thinking mode?

No. The current DeepSeek Thinking Mode guide says both are unsupported and have no effect in thinking mode, although sending them does not cause an error. Current V4 thinking is enabled by default, so explicitly disable it for a sampling test.


#### Why did DeepSeek accept my temperature setting without changing the output?

First check thinking.type. If thinking mode is enabled or omitted on current V4, DeepSeek documents temperature and top-p as accepted for compatibility but ineffective. Repeated identical outputs can also occur in non-thinking mode, especially with narrow settings.


#### How many stop sequences does the DeepSeek API support?

The current Chat Completions reference accepts one stop string or an array of up to 16. Our live request with 16 returned HTTP 200; the 17-string probe returned HTTP 400.


#### Does DeepSeek return the matched stop sequence in the response?

In all 13 stop-hit calls in this benchmark, the configured marker was absent and no forbidden suffix leaked. Three absent-marker controls also passed. This is observed behavior for the tested fixtures, not a universal contract for every marker, model, or future backend.


#### What finish reason does a DeepSeek stop sequence produce?

The response can report finish_reason: "stop". DeepSeek uses the same value when the model ends naturally, so that field alone does not prove a custom stop sequence was encountered. Validate the returned content too.


#### Does a higher DeepSeek temperature cost more?

Temperature is not separately priced. It can change cost indirectly if it changes output length. In this small run, temperature 2 had a median of 39.5 completion tokens, compared with roughly 29 for most lower-temperature conditions.


#### Can DeepSeek temperature make output deterministic?

Do not assume so. The current schema does not document a seed field or promise byte-identical output at temperature 0. Our six temperature-zero calls produced four distinct normalized outputs.


#### Are presence_penalty and frequency_penalty supported by DeepSeek V4?

The current Chat Completions reference marks both parameters deprecated and says they have no effect. They are not useful current V4 sampling controls.


#### Do DeepSeek stop sequences work with streaming?

The current API reference accepts both stop and stream, but this benchmark used non-streaming requests only. It does not provide live evidence about streamed marker reconstruction, chunk boundaries, or time to first token.


### Official sources and evidence

Product contracts and pricing in this article were checked against first-party DeepSeek documentation on July 25, 2026:

- Create Chat Completion – request fields, finish reasons, usage, and response schema.

- Thinking Mode – default V4 mode and unsupported sampling fields.

- The Temperature Parameter – official workload recommendations.

- Models and Pricing – current models, limits, and dated token prices.

- JSON Output – JSON-mode requirements and cautions.

- DeepSeek Change Log – current V4 release context.

The benchmark package preserves the ordered call plan, sanitized row-level JSON, a flat CSV, summary aggregates, prompt hashes, response hashes, timestamps, token usage, and every predefined check. It contains no API key or account balance.

One logging caveat: four descriptive expected_contract fields for array-based stop fixtures contain a [CIRCULAR] serialization marker caused by repeated object references. The executed arrays remain intact in each saved request body, and the raw responses and adherence checks are unaffected.

## 内部链接
- [DeepSeek platform hub](https://chat-deep.ai/)

## 外部链接
- [DeepSeek Chat Completions reference](https://api-docs.deepseek.com/api/create-chat-completion/)
- [official temperature guidance](https://api-docs.deepseek.com/quick_start/parameter_settings/)
- [Create Chat Completion](https://api-docs.deepseek.com/api/create-chat-completion/)
- [Thinking Mode](https://api-docs.deepseek.com/guides/thinking_mode/)
- [Models and Pricing page](https://api-docs.deepseek.com/quick_start/pricing/)
- [official Thinking Mode guide](https://api-docs.deepseek.com/guides/thinking_mode/)
- [Chat Completions reference](https://api-docs.deepseek.com/api/create-chat-completion/)
- [official JSON Output guide](https://api-docs.deepseek.com/guides/json_mode/)
- [official temperature page](https://api-docs.deepseek.com/quick_start/parameter_settings/)
- [V4 Flash prices](https://api-docs.deepseek.com/quick_start/pricing/)
- [Create Chat Completion](https://api-docs.deepseek.com/api/create-chat-completion/)
- [Thinking Mode](https://api-docs.deepseek.com/guides/thinking_mode/)
- [The Temperature Parameter](https://api-docs.deepseek.com/quick_start/parameter_settings/)
- [Models and Pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- [JSON Output](https://api-docs.deepseek.com/guides/json_mode/)
- [DeepSeek Change Log](https://api-docs.deepseek.com/updates/)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-temperature-settings%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-temperature-settings%2F&text=DeepSeek%20Temperature%2C%20Top-P%2C%20Stop%20Sequences%2C%20and%20Sampling%20Settings)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-temperature-settings%2F&title=DeepSeek%20Temperature%2C%20Top-P%2C%20Stop%20Sequences%2C%20and%20Sampling%20Settings)