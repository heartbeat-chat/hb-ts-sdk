// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@heartbeat-chat/heartbeat-mcp/filtering';
import { Metadata, asTextContentResult } from '@heartbeat-chat/heartbeat-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Heartbeat from '@heartbeat-chat/heartbeat';

export const metadata: Metadata = {
  resource: 'users',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/users/{user_id}',
  operationId: 'retrieveUser',
};

export const tool: Tool = {
  name: 'retrieve_users',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a single user by ID\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/user',\n  $defs: {\n    user: {\n      type: 'object',\n      description: 'The user object represents a user in a Heartbeat community. The user object always contains an **id** and **authEmail** key, as described below. A user can only be in one community.\\n',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'Date and time the user was created.',\n          format: 'date-time'\n        },\n        email: {\n          type: 'string',\n          description: 'Public-facing email shown in the community'\n        },\n        firstName: {\n          type: 'string',\n          description: 'User\\'s first name, as displayed in the community.'\n        },\n        groups: {\n          type: 'array',\n          description: 'Unique identifiers of the `groups` associated with a user. If null, the user is not in any groups.',\n          items: {\n            type: 'string'\n          }\n        },\n        lastName: {\n          type: 'string',\n          description: 'User\\'s last name, as displayed in the community.'\n        },\n        roleId: {\n          type: 'string',\n          description: 'The user\\'s current role, which defines their permissions.'\n        }\n      },\n      required: [        'id',\n        'createdAt',\n        'email',\n        'firstName',\n        'groups',\n        'lastName',\n        'roleId'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['user_id'],
  },
};

export const handler = async (client: Heartbeat, args: Record<string, unknown> | undefined) => {
  const { user_id, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.users.retrieve(user_id)));
};

export default { metadata, tool, handler };
