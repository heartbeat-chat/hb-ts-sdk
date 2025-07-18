// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Users extends APIResource {
  /**
   * Retrieve a single user by ID
   */
  retrieve(userID: string, options?: RequestOptions): APIPromise<User> {
    return this._client.get(path`/users/${userID}`, options);
  }

  /**
   * Retrieve a paginated list of users in the community
   */
  list(
    query: UserListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UserListResponse> {
    return this._client.get('/users', { query, ...options });
  }
}

/**
 * The user object represents a user in a Heartbeat community. The user object
 * always contains an **id** and **authEmail** key, as described below. A user can
 * only be in one community.
 */
export interface User {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Date and time the user was created.
   */
  createdAt: string;

  /**
   * Public-facing email shown in the community
   */
  email: string;

  /**
   * User's first name, as displayed in the community.
   */
  firstName: string;

  /**
   * Unique identifiers of the `groups` associated with a user. If null, the user is
   * not in any groups.
   */
  groups: Array<string> | null;

  /**
   * User's last name, as displayed in the community.
   */
  lastName: string;

  /**
   * The user's current role, which defines their permissions.
   */
  roleId: string;
}

export interface UserListResponse {
  data: Array<User>;

  /**
   * Whether there are more results available
   */
  hasMore: boolean;
}

export interface UserListParams {
  /**
   * Filter users created after this date
   */
  createdAfter?: string;

  /**
   * Filter users created before this date
   */
  createdBefore?: string;

  /**
   * Filter by group membership
   */
  groupId?: string;

  /**
   * Number of results to return (1-100)
   */
  limit?: number;

  /**
   * Filter by user role
   */
  role?: string;

  /**
   * Cursor for pagination - return results after this ID
   */
  startingAfter?: string;
}

export declare namespace Users {
  export {
    type User as User,
    type UserListResponse as UserListResponse,
    type UserListParams as UserListParams,
  };
}
