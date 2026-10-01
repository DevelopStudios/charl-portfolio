# Charl Roux — Portfolio

Personal portfolio site for Charl Roux, Senior Frontend Engineer based in Ann Arbor, Michigan.
Open to full-time on-site, hybrid, or remote roles — US-authorized, no sponsorship needed.

**Live:** [charlportfolio.online](https://charlportfolio.online)

---

## Stack

Vanilla HTML, CSS, and JavaScript — no framework, no build step. Hosted on Kinsta.

To run it locally:

```sh
python3 -m http.server 4310
```

Then open <http://localhost:4310>.

---

## Projects

| Project | Stack | What's interesting |
|---------|-------|--------------------|
| [DocLocal](https://doclocal-1bb7p.kinsta.page) ([frontend](https://github.com/DevelopStudios/doclocal), [backend](https://github.com/DevelopStudios/doclocal-backend)) | Angular · TypeScript · WebGPU · Python · FastAPI · NVIDIA NIM | PDF Q&A with retrieval-augmented generation and clickable citations that jump to the highlighted passage. Live prototype runs in the browser (Transformers.js embeddings, WebLLM on WebGPU, one SharedWorker model across tabs); in development, a Python/FastAPI backend on NVIDIA NIM with streaming, cancellation, and session recovery |
| [Precision Ledger](https://precisionledger-j423d.kinsta.page/) | Angular · RxJS · WebSockets · TypeScript | 10,000-row virtual grid over a live Binance feed; an adjustable RxJS `bufferTime` window batches 500+ events/sec into one render per interval, OnPush + async pipe throughout |
| [InvoiceFlow](https://invoice-1qmx1.kinsta.page/) | Angular · CDK · TypeScript | Finite state machine (draft → pending → paid) at the service layer — invalid transitions are structurally impossible |
| [VaultKey](https://password-generator-duah3.kinsta.page) | Angular · Web Worker · WebLLM · Playwright | A local Qwen2.5 model in a Web Worker streams memorable word hooks without blocking the UI; Playwright E2E covers model start-up and the stream — no server, nothing leaves the device |
| [TalentBoard](https://devjobs-fe-a0h85.kinsta.page) | Angular · Orama · TypeScript | 1,000+ listings virtualized on a single page, hybrid full-text and vector search, filter state synced to the URL |

All five run in the browser — no server, no API key. DocLocal's in-development backend path
uses NVIDIA NIM cloud models, so document text and questions leave the device.
Its screenshot on the site (`assets/doclocal-nim-demo.png`) is the real UI, captured from a
mock-backed replay over a synthetic PDF.

---

## Skills

**7 years:** Angular (v2→v19) · TypeScript · RxJS · HTML · CSS  
**6 years:** Accessibility (ARIA, keyboard, axe)  
**5 years:** NgRx · Cypress / Jest  
**4 years:** CI/CD (GitHub Actions, Docker)  
**3 years:** Nx · Module Federation · Web Workers

**Current project work, no years claimed:** Python · FastAPI · Playwright

---

## Contact

[LinkedIn](https://www.linkedin.com/in/charl-roux-50b124122/) · [GitHub](https://github.com/DevelopStudios) · charlit641@gmail.com
