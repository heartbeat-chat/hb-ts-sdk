// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Channels extends APIResource {
  /**
   * Retrieve a single channel by ID
   */
  retrieve(channelID: string, options?: RequestOptions): APIPromise<Channel> {
    return this._client.get(path`/channels/${channelID}`, options);
  }

  /**
   * Retrieve a paginated list of channels in the community
   */
  list(
    query: ChannelListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ChannelListResponse> {
    return this._client.get('/channels', { query, ...options });
  }
}

/**
 * Channels are how users communicate with each other in a community. Channels can
 * be one of three types:
 *
 * - **Thread Channels:** A channel where users can create posts, which can have
 *   replies, threading for comments and reactions. Thread channels uniquely can
 *   have pinned posts, which are stickied to the top of the channel. Non-pinned
 *   posts are displayed chronologically, most to least recent. Thread channels can
 *   also be read-only, with means only users with the create channels role
 *   permission can make posts. All other users with access to the channel can
 *   still leave reactions and comments on posts.
 * - **Chat Channels:** A channel where users can send messages, ideal for
 *   text-based or voice memo, synchronous communication. Messages are displated
 *   chronologically, most to least recent.
 * - **Voice Channels:** A channel where users can communicate with each other over
 *   audio and video within the community. Voice channels can have set attendee
 *   limits, which limit the maximum occupancy. Active attendees are visible to all
 *   users with access to the channel. When you're active in a voice channel, you
 *   can toggle your microphone and camera inputs, sound output, share your screen,
 *   and leave.
 */
export interface Channel {
  /**
   * Unique identifier for the object
   */
  id: string;

  /**
   * Unique identifiers of the `groups` and `users` that can access the channel. Null
   * means there are no access restrictions.
   */
  accessibleTo: Array<Channel.AccessibleTo> | null;

  /**
   * Whether a channel is a thread channel, chat channel, or voice/video channel.
   */
  channelType: 'thread' | 'chat' | 'voice';

  /**
   * Timestamp when the channel was created.
   */
  createdAt: string;

  /**
   * Emoji that represents the channel in the community interface.
   */
  emoji: string;

  /**
   * Whether a channel is read-only for users. If true, users can only comment and
   * react in the channel. Admins and mods have full channel permissions.
   */
  isReadOnly: boolean;

  /**
   * Channel name, as displayed in the community.
   */
  name: string;
}

export namespace Channel {
  /**
   * Represents a user or group selection for access control
   */
  export interface AccessibleTo {
    /**
     * Unique identifier of the group or user
     */
    id: string;

    /**
     * Whether this selection refers to a group or individual user
     */
    type: 'GROUP' | 'USER';
  }
}

export interface ChannelListResponse {
  data: Array<Channel>;

  /**
   * Whether there are more results available
   */
  hasMore: boolean;
}

export interface ChannelListParams {
  /**
   * Filter by archived status
   */
  archived?: 'all' | 'active' | 'archived';

  /**
   * Filter by channel type
   */
  channelType?: 'thread' | 'chat' | 'voice';

  /**
   * Number of results to return (1-100)
   */
  limit?: number;

  /**
   * Cursor for pagination - return results after this ID
   */
  startingAfter?: string;
}

export declare namespace Channels {
  export {
    type Channel as Channel,
    type ChannelListResponse as ChannelListResponse,
    type ChannelListParams as ChannelListParams,
  };
}
