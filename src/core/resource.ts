// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Heartbeat } from '../client';

export abstract class APIResource {
  protected _client: Heartbeat;

  constructor(client: Heartbeat) {
    this._client = client;
  }
}
