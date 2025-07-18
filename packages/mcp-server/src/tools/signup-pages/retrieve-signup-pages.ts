// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'heartbeat-mcp/filtering';
import { Metadata, asTextContentResult } from 'heartbeat-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Heartbeat from '@heartbeat-chat/heartbeat';

export const metadata: Metadata = {
  resource: 'signup_pages',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/signup_pages/{signup_page_id}',
  operationId: 'retrieveSignupPage',
};

export const tool: Tool = {
  name: 'retrieve_signup_pages',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a single sign up page by ID\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/signup_page',\n  $defs: {\n    signup_page: {\n      type: 'object',\n      description: 'Sign up pages are customizable entry points that let new users join a community, and allow existing users to unlock access to groups or offers.\\n\\nEach sign up page can optionally be linked to an offer, in which case it triggers a checkout flow during the sign up process.\\n\\nHere is the typical flow for a new user visiting a sign up link:\\n1. (If custom landing page is enabled) Custom Landing Page\\n2. Email submission\\n3. (If an offer is linked) Offer tier selection and checkout\\n4. Onboarding\\n\\nSign up pages act as versatile funnels for growing and segmenting your community. It empowers admins to create sales funnels, custom onboarding experiences, and content gating in a single flow.\\n\\nHeartbeat automatically creates a sign up page when an admin creates a course or offer. But an admin can create as many as they\\'d like. Any edits made to sign up pages take effect for all future uses.\\n',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object'\n        },\n        archived: {\n          type: 'boolean',\n          description: 'Whether an sign up page is archived or active. If archived, no new users may use the sign up page.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date the sign up page was created',\n          format: 'date-time'\n        },\n        freeGroups: {\n          type: 'array',\n          description: 'Unique identifiers of the groups someone will immediately be added to using this sign up page.',\n          items: {\n            type: 'string'\n          }\n        },\n        isPrivate: {\n          type: 'boolean',\n          description: 'Whether the sign up page requires pre-approval before use or is evergreen. If true, only an admin-set list of emails may use this sign up page. If false, anyone may use the sign up page. Emails that are sent the sign up page via the Heartbeat platform using the email invite option will automatically be pre-approved.'\n        },\n        landingPage: {\n          type: 'object',\n          description: 'Landing page configuration',\n          properties: {\n            buttonText: {\n              type: 'string',\n              description: 'The text on the button that navigates to the next step in the sign up process. For new users, this is the email submission step.'\n            },\n            description: {\n              type: 'string',\n              description: 'The rich-text description on the custom landing page, which is typically an explanation of the value and purpose of the community.'\n            },\n            descriptionTitle: {\n              type: 'string',\n              description: 'The title of the description section on the custom landing page.'\n            },\n            footerTitle: {\n              type: 'string',\n              description: 'The title of the footer before the final CTA on the custom landing page.'\n            },\n            showSocialProof: {\n              type: 'boolean',\n              description: 'Whether to display images of community members on the custom landing page and during checkout or hide it.'\n            },\n            subtitle: {\n              type: 'string',\n              description: 'The subtitle of the custom landing page, positioned below the title at the top of the page.'\n            },\n            testimonial: {\n              type: 'object',\n              description: 'A testimonial meant to build trust and increase credibility for visitors on the custom landing page. It consists of a plain-text quote, name of the person that said the quote, and image.'\n            },\n            title: {\n              type: 'string',\n              description: 'The H1 of the custom landing page.'\n            },\n            video: {\n              type: 'object',\n              description: 'The embed code for the video to be displayed on the custom landing page.'\n            }\n          }\n        },\n        paywall: {\n          anyOf: [            {\n              type: 'object',\n              properties: {\n                offerId: {\n                  type: 'string'\n                },\n                type: {\n                  type: 'string',\n                  enum: [                    'OFFER'\n                  ]\n                }\n              },\n              required: [                'offerId',\n                'type'\n              ]\n            },\n            {\n              type: 'object',\n              properties: {\n                type: {\n                  type: 'string',\n                  enum: [                    'WAITLIST'\n                  ]\n                },\n                waitlistId: {\n                  type: 'string'\n                }\n              },\n              required: [                'type',\n                'waitlistId'\n              ]\n            }\n          ],\n          description: 'Unique identifier of the offer someone will need to purchase to complete sign up. If set, the sign up page triggers the checkout flow for the offer after email submission. If an existing user is already signed in, they will go skip email submission and go to checkout. If null, no payment is required when using this sign up page.'\n        },\n        roleId: {\n          type: 'string',\n          description: 'Unique identifier of the role someone will receive when using this sign up page.'\n        },\n        url: {\n          type: 'string',\n          description: 'a unique user-facing code appended to the end of the sign up page URL that identifies the sign up page.'\n        }\n      },\n      required: [        'id',\n        'archived',\n        'createdAt',\n        'freeGroups',\n        'isPrivate',\n        'landingPage',\n        'paywall',\n        'roleId',\n        'url'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      signup_page_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['signup_page_id'],
  },
};

export const handler = async (client: Heartbeat, args: Record<string, unknown> | undefined) => {
  const { signup_page_id, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.signupPages.retrieve(signup_page_id)));
};

export default { metadata, tool, handler };
