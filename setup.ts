const fs = require("fs");
const path = require("path");

const complexNavigation = [
  {
    group: "Home",
    pages: ["home"],
  },
  {
    group: "Get started",
    pages: [
      "guides/get-started/quickstart",
      "guides/get-started/key-concepts",
      "guides/get-started/build-a-rag-chatbot",
      "guides/get-started/authentication",
      "guides/get-started/examples",
    ],
  },
  {
    group: "Organizations",
    pages: [
      "guides/organizations/understanding-organizations",
      {
        group: "Manage billing",
        pages: [
          "guides/organizations/manage-billing/changing-your-billing-plan",
          "guides/organizations/manage-billing/setting-up-billing-through-aws-marketplace",
          "guides/organizations/manage-billing/setting-up-billing-through-azure-marketplace",
          "guides/organizations/manage-billing/setting-up-billing-through-gcp-marketplace",
          "guides/organizations/manage-billing/understanding-subscription-status",
        ],
      },
      {
        group: "Manage cost",
        pages: [
          "guides/organizations/manage-cost/understanding-cost",
          "guides/organizations/manage-cost/monitor-your-usage",
          "guides/organizations/manage-cost/manage-cost",
        ],
      },
      {
        group: "Configure single sign-on",
        pages: ["guides/organizations/configure-single-sign-on/okta"],
      },
      "guides/organizations/manage-organization-members",
    ],
  },
  {
    group: "Projects",
    pages: [
      "guides/projects/understanding-projects",
      "guides/projects/create-a-project",
      "guides/projects/manage-project-members",
      "guides/projects/rename-a-project",
      "guides/projects/set-a-project-pod-limit",
    ],
  },
  {
    group: "Indexes",
    pages: [
      "guides/indexes/understanding-indexes",
      "guides/indexes/create-an-index",
      "guides/indexes/migrate-a-pod-based-index-to-serverless",
      "guides/indexes/view-index-information",
      "guides/indexes/back-up-an-index",
      "guides/indexes/delete-an-index",
      "guides/indexes/use-namespaces",
      "guides/indexes/implement-multitenancy",
      "guides/indexes/choose-a-pod-type-and-size",
      "guides/indexes/configure-pod-based-indexes",
      "guides/indexes/scale-pod-based-indexes",
      "guides/indexes/understanding-collections",
    ],
  },
  {
    group: "Data",
    pages: [
      "guides/data/upsert-data",
      "guides/data/query-data",
      "guides/data/fetch-data",
      "guides/data/update-data",
      "guides/data/delete-data",
      "guides/data/list-record-ids",
      "guides/data/get-an-index-endpoint",
      "guides/data/filter-with-metadata",
      "guides/data/manage-rag-documents",
      {
        group: "Hybrid search and sparse vectors",
        pages: [
          "guides/data/understanding-hybrid-search",
          "guides/data/encode-sparse-vectors",
          "guides/data/upsert-sparse-dense-vectors",
          "guides/data/query-sparse-dense-vectors",
        ],
      },
      {
        group: "Use datasets",
        pages: [
          "guides/data/use-sample-datasets",
          "guides/data/use-public-pinecone-datasets",
          "guides/data/create-and-load-private-datasets",
        ],
      },
    ],
  },
  {
    group: "Inference",
    pages: [
      "guides/inference/understanding-inference",
      "guides/inference/generate-embeddings",
    ],
  },
  {
    group: "Assistant",
    pages: [
      "guides/assistant/understanding-assistant",
      "guides/assistant/create-assistant",
      "guides/assistant/list-assistants",
      "guides/assistant/check-assistant-status",
      "guides/assistant/upload-file",
      "guides/assistant/list-files",
      "guides/assistant/check-file-status",
      "guides/assistant/delete-file",
      "guides/assistant/chat-with-assistant",
      "guides/assistant/delete-assistant",
    ],
  },
  {
    group: "Operations",
    pages: [
      "guides/operations/migrate-to-the-new-api",
      "guides/operations/move-to-production",
      "guides/operations/performance-tuning",
      "guides/operations/enable-aws-privatelink",
      "guides/operations/monitoring",
    ],
  },
  {
    group: "REST APIs",
    pages: [
      "reference/api/introduction",
      "reference/api/versioning",
      {
        group: "Database API",
        version: "2024-07 latest",
        pages: [
          {
            group: "Data plane",
            pages: [
              "reference/api/2024-07/data-plane/upsert",
              "reference/api/2024-07/data-plane/query",
              "reference/api/2024-07/data-plane/fetch",
              "reference/api/2024-07/data-plane/update",
              "reference/api/2024-07/data-plane/delete",
              "reference/api/2024-07/data-plane/list",
              "reference/api/2024-07/data-plane/describeindexstats",
            ],
          },
          {
            group: "Control plane",
            pages: [
              "reference/api/2024-07/control-plane/list_indexes",
              "reference/api/2024-07/control-plane/create_index",
              "reference/api/2024-07/control-plane/describe_index",
              "reference/api/2024-07/control-plane/delete_index",
              "reference/api/2024-07/control-plane/configure_index",
              "reference/api/2024-07/control-plane/list_collections",
              "reference/api/2024-07/control-plane/create_collection",
              "reference/api/2024-07/control-plane/describe_collection",
              "reference/api/2024-07/control-plane/delete_collection",
            ],
          },
        ],
      },
      {
        group: "Database API",
        version: "2024-04",
        pages: [
          {
            group: "Data plane",
            pages: [
              "reference/api/2024-04/data-plane/upsert",
              "reference/api/2024-04/data-plane/query",
              "reference/api/2024-04/data-plane/fetch",
              "reference/api/2024-04/data-plane/update",
              "reference/api/2024-04/data-plane/delete",
              "reference/api/2024-04/data-plane/list",
              "reference/api/2024-04/data-plane/describeindexstats",
            ],
          },
          {
            group: "Control plane",
            pages: [
              "reference/api/2024-04/control-plane/list_indexes",
              "reference/api/2024-04/control-plane/create_index",
              "reference/api/2024-04/control-plane/describe_index",
              "reference/api/2024-04/control-plane/delete_index",
              "reference/api/2024-04/control-plane/configure_index",
              "reference/api/2024-04/control-plane/list_collections",
              "reference/api/2024-04/control-plane/create_collection",
              "reference/api/2024-04/control-plane/describe_collection",
              "reference/api/2024-04/control-plane/delete_collection",
            ],
          },
        ],
      },
      {
        group: "Inference API",
        version: "2024-07 latest",
        pages: ["reference/api/2024-07/inference/generate-embeddings"],
      },
      {
        group: "Inference API",
        version: "2024-04",
        pages: ["reference/api/2024-04/inference/generate-embeddings"],
      },
      {
        group: "Assistant API",
        version: "2024-07 latest",
        pages: [
          "reference/api/2024-07/assistant/list-assistants",
          "reference/api/2024-07/assistant/create-assistant",
          "reference/api/2024-07/assistant/describe-assistant",
          "reference/api/2024-07/assistant/delete-assistant",
          "reference/api/2024-07/assistant/list-files",
          "reference/api/2024-07/assistant/create-file",
          "reference/api/2024-07/assistant/describe-file",
          "reference/api/2024-07/assistant/delete-file",
          "reference/api/2024-07/assistant/chat-completion-assistant",
        ],
      },
      {
        group: "Assistant API",
        version: "2024-04",
        pages: [
          "reference/api/2024-04/assistant/list-assistants",
          "reference/api/2024-04/assistant/create-assistant",
          "reference/api/2024-04/assistant/describe-assistant",
          "reference/api/2024-04/assistant/delete-assistant",
          "reference/api/2024-04/assistant/list-files",
          "reference/api/2024-04/assistant/create-file",
          "reference/api/2024-04/assistant/describe-file",
          "reference/api/2024-04/assistant/delete-file",
          "reference/api/2024-04/assistant/chat-completion-assistant",
        ],
      },
    ],
  },
  {
    group: "Clients",
    pages: [
      "reference/pinecone-clients",
      "reference/python-client",
      "reference/node-client",
      "reference/java-client",
      "reference/go-client",
    ],
  },
  {
    group: "Tools",
    pages: [
      "reference/tools/pinecone-datasets",
      "reference/tools/pinecone-text-client",
      "reference/tools/pinecone-spark-connector",
    ],
  },
  {
    group: "Architecture",
    pages: [
      "reference/architecture/serverless-architecture",
      "reference/architecture/pod-based-architecture",
    ],
  },
  {
    group: "Miscellaneous",
    pages: [
      "reference/quotas-and-limits",
      "reference/known-limitations",
      "reference/security",
    ],
  },
  {
    group: "Examples",
    pages: [
      "examples/notebooks",
      "examples/sample-apps",
      "examples/reference-architectures",
    ],
  },
  {
    group: "Models",
    pages: ["models/overview"],
  },
  {
    group: "",
    pages: ["integrations/overview"],
  },
  {
    group: "Connect an integration",
    pages: [
      {
        group: "Data sources",
        pages: [
          "integrations/airbyte",
          "integrations/apify",
          "integrations/confluent",
          "integrations/databricks",
          "integrations/elasticsearch",
          "integrations/estuary",
          "integrations/fleak",
          "integrations/flowise",
          "integrations/gathr",
          "integrations/snowflake",
          "integrations/streamnative",
          "integrations/unstructured",
        ],
      },
      {
        group: "Frameworks",
        pages: [
          "integrations/amazon-bedrock",
          "integrations/amazon-sagemaker",
          "integrations/context-data",
          "integrations/haystack",
          "integrations/instill",
          "integrations/langchain",
          "integrations/llamaindex",
          "integrations/octoai",
        ],
      },
      {
        group: "Infrastructure",
        pages: [
          "integrations/aws",
          "integrations/azure",
          "integrations/gcp",
          "integrations/github-copilot",
          "integrations/pulumi",
          "integrations/terraform",
          "integrations/vercel",
        ],
      },
      {
        group: "Models",
        pages: [
          "integrations/anyscale",
          "integrations/cohere",
          "integrations/jina",
          "integrations/voyage",
          "integrations/hugging-face-inference-endpoints",
          "integrations/openai",
        ],
      },
      {
        group: "Observability",
        pages: [
          "integrations/datadog",
          "integrations/langtrace",
          "integrations/new-relic",
          "integrations/traceloop",
          "integrations/trulens",
        ],
      },
    ],
  },
  {
    group: "Build an integration",
    pages: [
      "integrations/build-integration/become-a-partner",
      "integrations/build-integration/attribute-usage-to-your-integration",
      "integrations/build-integration/connect-your-users-to-pinecone",
    ],
  },
  {
    group: "",
    pages: [
      "troubleshooting/contact-support",
      "troubleshooting/how-to-work-with-support",
      "troubleshooting/pinecone-support-slas",
    ],
  },
  {
    group: "Account management",
    pages: [
      "troubleshooting/login-code-issues",
      "troubleshooting/custom-data-processing-agreements",
      "troubleshooting/delete-your-account",
      "troubleshooting/billing-disputes-and-refunds",
    ],
  },
  {
    group: "Indexes",
    pages: [
      "troubleshooting/available-cloud-regions",
      "troubleshooting/export-indexes",
      "troubleshooting/wait-for-index-creation",
      "troubleshooting/select-index-type-and-size",
      "troubleshooting/how-and-when-to-increase-index-size",
      "troubleshooting/use-namespaces-instead-of-several-indexes",
      "troubleshooting/namespaces-vs-metadata-filtering",
      "troubleshooting/restrictions-on-index-names",
      "troubleshooting/return-all-vectors-in-an-index",
      "troubleshooting/vertically-downscaling",
      "troubleshooting/delete-a-namespace",
      "troubleshooting/pods-are-full",
    ],
  },
  {
    group: "Data",
    pages: [
      "troubleshooting/parallel-queries",
      "troubleshooting/minimize-latencies",
      "troubleshooting/embedding-values-changed-when-upserted",
      "troubleshooting/how-and-when-to-add-replicas",
      "troubleshooting/keep-customer-data-separate",
      "troubleshooting/limitations-of-querying-by-id",
      "troubleshooting/create-and-manage-vectors-with-metadata",
      "troubleshooting/handle-deletes-by-metadata",
      "troubleshooting/metadata-reconfiguration",
      "troubleshooting/metadata-string-value-returned-as-datetime",
      "troubleshooting/remove-metadata-field",
    ],
  },
  {
    group: "Common errors",
    pages: [
      "troubleshooting/index-creation-error-missing-spec",
      "troubleshooting/index-creation-error-max-serverless",
      "troubleshooting/serverless-index-connection-errors",
      "troubleshooting/error-handshake-read-failed",
      "troubleshooting/pinecone-attribute-errors-with-langchain",
      "troubleshooting/error-cannot-import-name-pinecone",
      "troubleshooting/module-pinecone-has-no-attribute-init",
    ],
  },
  {
    group: "Miscellaneous",
    pages: [
      "troubleshooting/best-practices",
      "troubleshooting/differences-between-lexical-semantic-search",
      "troubleshooting/nodejs-troubleshooting",
      "troubleshooting/cors-issues",
      "troubleshooting/debug-model-vs-pinecone-recall-issues",
      "troubleshooting/non-indexed-field-filter-issues",
      "troubleshooting/unable-to-pip-install",
    ],
  },
  {
    group: "Release notes",
    pages: ["release-notes/2024", "release-notes/2023", "release-notes/2022"],
  },
  {
    group: "Policies",
    pages: ["release-notes/api-lifecycle-policy"],
  },
];

// Function to create directories recursively
function createDirectoryRecursively(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    return;
  }
  createDirectoryRecursively(path.dirname(directoryPath));
  fs.mkdirSync(directoryPath);
}

// Function to create .mdx file
function createMdxFile(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      `# ${path.basename(filePath, ".mdx")}\n`,
      "utf8"
    );
  }
}

// Function to process pages
function processPages(pages, basePath = "") {
  pages.forEach((page) => {
    if (typeof page === "string") {
      const fullPath = path.join(basePath, page + ".mdx");
      createDirectoryRecursively(path.dirname(fullPath));
      createMdxFile(fullPath);
    } else if (page.pages) {
      processPages(page.pages, "");
    }
  });
}

// Start processing the navigation array
complexNavigation.forEach((section) => {
  processPages(section.pages, "");
});

console.log("MDX files created successfully.");
