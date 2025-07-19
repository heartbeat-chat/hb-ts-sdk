// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@heartbeat-chat/heartbeat-mcp/filtering';
import { Metadata, asTextContentResult } from '@heartbeat-chat/heartbeat-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Heartbeat from '@heartbeat-chat/heartbeat';

export const metadata: Metadata = {
  resource: 'groups',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/groups',
  operationId: 'listGroups',
};

export const tool: Tool = {
  name: 'list_groups',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a paginated list of access groups in the community\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/group'\n      }\n    },\n    hasMore: {\n      type: 'boolean',\n      description: 'Whether there are more results available'\n    }\n  },\n  required: [    'data',\n    'hasMore'\n  ],\n  $defs: {\n    group: {\n      type: 'object',\n      description: 'An access group controls what a member can access in Heartbeat, but they\\'re also flexible tools for badges, tagging, automation (triggered on group join), and paywalled memberships/digital products.\\n\\nEach group supports:\\n- **Visibility:** Shown as badges, in profiles, or hidden.\\n- **Membership:** Admin-assigned, freely joinable, conditionally joinable (based on a list of groups/users), or auto-managed via filters (updated hourly).\\n- **Payments:** Groups can be paywalled using offers. Members gain access through active payment (or subscription), and lose it when subscriptions end (they keep it when one-time/installment payments end). One group can be in multiple offers. For example, a group might be a tier on one offer, a tier on another offer, and in a bundled offer. Group name and description are used in tier marketing.\\n\\nGroups have special behaviors and rules:\\n- **Sub-groups:** Groups can have sub-groups; membership flows upward. Members of a sub-group are also members of parent groups.\\n- **Course groups:** Every course auto-generates a group with the same name. It can\\'t be deleted unless the course is.\\n- **Restrictions:** Paid, automated, and course groups cannot be or have sub-groups (except for course cohorts, which are special system-generated sub-groups of course groups).\\n\\nGroups are the foundation of access, segmentation, and monetization in Heartbeat.\\n',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object.'\n        },\n        accessibleTo: {\n          type: 'array',\n          description: 'Unique identifiers of the `groups` and `users` that can access the group. Null means there are no access restrictions.',\n          items: {\n            type: 'object',\n            description: 'Represents a user or group selection for access control',\n            properties: {\n              id: {\n                type: 'string',\n                description: 'Unique identifier of the group or user'\n              },\n              type: {\n                type: 'string',\n                description: 'Whether this selection refers to a group or individual user',\n                enum: [                  'GROUP',\n                  'USER'\n                ]\n              }\n            },\n            required: [              'id',\n              'type'\n            ]\n          }\n        },\n        description: {\n          type: 'string',\n          description: 'Text shown for the group in embeds, My Groups page, and paid tier description.'\n        },\n        isJoinable: {\n          type: 'boolean',\n          description: 'Whether the group is joinable.'\n        },\n        name: {\n          type: 'string',\n          description: 'Group name as displayed in the community. Used in badges, profile popups, and as the tier name for paid groups.'\n        },\n        parentGroup: {\n          type: 'string',\n          description: 'Unique identifier of the parent group.'\n        }\n      },\n      required: [        'id',\n        'accessibleTo',\n        'description',\n        'isJoinable',\n        'name',\n        'parentGroup'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'integer',
        description: 'Number of results to return (1-100)',
      },
      parentGroupId: {
        type: 'string',
        description: 'Filter by parent group',
      },
      startingAfter: {
        type: 'string',
        description: 'Cursor for pagination - return results after this ID',
      },
      userId: {
        type: 'string',
        description: 'Filter groups that a user is a member of',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
};

export const handler = async (client: Heartbeat, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await maybeFilter(args, await client.groups.list(body)));
};

export default { metadata, tool, handler };
