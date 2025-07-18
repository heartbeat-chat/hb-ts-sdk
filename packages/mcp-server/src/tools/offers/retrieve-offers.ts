// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'heartbeat-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Heartbeat from '@heartbeat-chat/heartbeat';

export const metadata: Metadata = {
  resource: 'offers',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/offers/{offer_id}',
  operationId: 'retrieveOffer',
};

export const tool: Tool = {
  name: 'retrieve_offers',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a single offer by ID",
  inputSchema: {
    type: 'object',
    properties: {
      offer_id: {
        type: 'string',
      },
    },
    required: ['offer_id'],
  },
};

export const handler = async (client: Heartbeat, args: Record<string, unknown> | undefined) => {
  const { offer_id, ...body } = args as any;
  return asTextContentResult(await client.offers.retrieve(offer_id));
};

export default { metadata, tool, handler };
