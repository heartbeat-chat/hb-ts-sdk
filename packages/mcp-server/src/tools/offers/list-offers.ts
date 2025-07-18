// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@heartbeat-chat/heartbeat-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Heartbeat from '@heartbeat-chat/heartbeat';

export const metadata: Metadata = {
  resource: 'offers',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/offers',
  operationId: 'listOffers',
};

export const tool: Tool = {
  name: 'list_offers',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a paginated list of offers in the community",
  inputSchema: {
    type: 'object',
    properties: {
      archived: {
        type: 'string',
        description: 'Filter by archived status',
        enum: ['all', 'active', 'archived'],
      },
      limit: {
        type: 'integer',
        description: 'Number of results to return (1-100)',
      },
      startingAfter: {
        type: 'string',
        description: 'Cursor for pagination - return results after this ID',
      },
    },
    required: [],
  },
};

export const handler = async (client: Heartbeat, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.offers.list(body));
};

export default { metadata, tool, handler };
