// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@heartbeat-chat/heartbeat-mcp/filtering';
import { Metadata, asTextContentResult } from '@heartbeat-chat/heartbeat-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Heartbeat from '@heartbeat-chat/heartbeat';

export const metadata: Metadata = {
  resource: 'channels',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/channels',
  operationId: 'listChannels',
};

export const tool: Tool = {
  name: 'list_channels',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a paginated list of channels in the community\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/channel'\n      }\n    },\n    hasMore: {\n      type: 'boolean',\n      description: 'Whether there are more results available'\n    }\n  },\n  required: [    'data',\n    'hasMore'\n  ],\n  $defs: {\n    channel: {\n      type: 'object',\n      description: 'Channels are how users communicate with each other in a community. Channels can be one of three types:\\n\\n- **Thread Channels:** A channel where users can create posts, which can have replies, threading for comments and reactions. Thread channels uniquely can have pinned posts, which are stickied to the top of the channel. Non-pinned posts are displayed chronologically, most to least recent. Thread channels can also be read-only, with means only users with the create channels role permission can make posts. All other users with access to the channel can still leave reactions and comments on posts.\\n- **Chat Channels:** A channel where users can send messages, ideal for text-based or voice memo, synchronous communication. Messages are displated chronologically, most to least recent.\\n- **Voice Channels:** A channel where users can communicate with each other over audio and video within the community. Voice channels can have set attendee limits, which limit the maximum occupancy. Active attendees are visible to all users with access to the channel. When you\\'re active in a voice channel, you can toggle your microphone and camera inputs, sound output, share your screen, and leave.\\n',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the object'\n        },\n        accessibleTo: {\n          type: 'array',\n          description: 'Unique identifiers of the `groups` and `users` that can access the channel. Null means there are no access restrictions.',\n          items: {\n            type: 'object',\n            description: 'Represents a user or group selection for access control',\n            properties: {\n              id: {\n                type: 'string',\n                description: 'Unique identifier of the group or user'\n              },\n              type: {\n                type: 'string',\n                description: 'Whether this selection refers to a group or individual user',\n                enum: [                  'GROUP',\n                  'USER'\n                ]\n              }\n            },\n            required: [              'id',\n              'type'\n            ]\n          }\n        },\n        channelType: {\n          type: 'string',\n          description: 'Whether a channel is a thread channel, chat channel, or voice/video channel.',\n          enum: [            'thread',\n            'chat',\n            'voice'\n          ]\n        },\n        createdAt: {\n          type: 'string',\n          description: 'Timestamp when the channel was created.',\n          format: 'date-time'\n        },\n        emoji: {\n          type: 'string',\n          description: 'Emoji that represents the channel in the community interface.'\n        },\n        isReadOnly: {\n          type: 'boolean',\n          description: 'Whether a channel is read-only for users. If true, users can only comment and react in the channel. Admins and mods have full channel permissions.'\n        },\n        name: {\n          type: 'string',\n          description: 'Channel name, as displayed in the community.'\n        }\n      },\n      required: [        'id',\n        'accessibleTo',\n        'channelType',\n        'createdAt',\n        'emoji',\n        'isReadOnly',\n        'name'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      archived: {
        type: 'string',
        description: 'Filter by archived status',
        enum: ['all', 'active', 'archived'],
      },
      channelType: {
        type: 'string',
        description: 'Filter by channel type',
        enum: ['thread', 'chat', 'voice'],
      },
      limit: {
        type: 'integer',
        description: 'Number of results to return (1-100)',
      },
      startingAfter: {
        type: 'string',
        description: 'Cursor for pagination - return results after this ID',
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
  return asTextContentResult(await maybeFilter(args, await client.channels.list(body)));
};

export default { metadata, tool, handler };
