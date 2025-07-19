// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Groups extends APIResource {
  /**
   * Retrieve a single group by ID
   */
  retrieve(groupID: string, options?: RequestOptions): APIPromise<Group> {
    return this._client.get(path`/groups/${groupID}`, options);
  }

  /**
   * Retrieve a paginated list of access groups in the community
   */
  list(
    query: GroupListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<GroupListResponse> {
    return this._client.get('/groups', { query, ...options });
  }
}

/**
 * An access group controls what a member can access in Heartbeat, but they're also
 * flexible tools for badges, tagging, automation (triggered on group join), and
 * paywalled memberships/digital products.
 *
 * Each group supports:
 *
 * - **Visibility:** Shown as badges, in profiles, or hidden.
 * - **Membership:** Admin-assigned, freely joinable, conditionally joinable (based
 *   on a list of groups/users), or auto-managed via filters (updated hourly).
 * - **Payments:** Groups can be paywalled using offers. Members gain access
 *   through active payment (or subscription), and lose it when subscriptions end
 *   (they keep it when one-time/installment payments end). One group can be in
 *   multiple offers. For example, a group might be a tier on one offer, a tier on
 *   another offer, and in a bundled offer. Group name and description are used in
 *   tier marketing.
 *
 * Groups have special behaviors and rules:
 *
 * - **Sub-groups:** Groups can have sub-groups; membership flows upward. Members
 *   of a sub-group are also members of parent groups.
 * - **Course groups:** Every course auto-generates a group with the same name. It
 *   can't be deleted unless the course is.
 * - **Restrictions:** Paid, automated, and course groups cannot be or have
 *   sub-groups (except for course cohorts, which are special system-generated
 *   sub-groups of course groups).
 *
 * Groups are the foundation of access, segmentation, and monetization in
 * Heartbeat.
 */
export interface Group {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Unique identifiers of the `groups` and `users` that can access the group. Null
   * means there are no access restrictions.
   */
  accessibleTo: Array<Group.AccessibleTo> | null;

  /**
   * Text shown for the group in embeds, My Groups page, and paid tier description.
   */
  description: string;

  /**
   * Whether the group is joinable.
   */
  isJoinable: boolean;

  /**
   * Group name as displayed in the community. Used in badges, profile popups, and as
   * the tier name for paid groups.
   */
  name: string;

  /**
   * Unique identifier of the parent group.
   */
  parentGroup: string | null;
}

export namespace Group {
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

export interface GroupListResponse {
  data: Array<Group>;

  /**
   * Whether there are more results available
   */
  hasMore: boolean;
}

export interface GroupListParams {
  /**
   * Number of results to return (1-100)
   */
  limit?: number;

  /**
   * Filter by parent group
   */
  parentGroupId?: string;

  /**
   * Cursor for pagination - return results after this ID
   */
  startingAfter?: string;

  /**
   * Filter groups that a user is a member of
   */
  userId?: string;
}

export declare namespace Groups {
  export {
    type Group as Group,
    type GroupListResponse as GroupListResponse,
    type GroupListParams as GroupListParams,
  };
}
