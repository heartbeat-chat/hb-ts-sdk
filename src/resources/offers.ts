// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as OffersAPI from './offers';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Offers extends APIResource {
  /**
   * Retrieve a single offer by ID
   */
  retrieve(offerID: string, options?: RequestOptions): APIPromise<Offer> {
    return this._client.get(path`/offers/${offerID}`, options);
  }

  /**
   * Retrieve a paginated list of offers in the community
   */
  list(
    query: OfferListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OfferListResponse> {
    return this._client.get('/offers', { query, ...options });
  }
}

/**
 * Offers define how communities are monetized in Heartbeat. Each offer represents
 * a way for members to pay for access to one or more groups, which grant access to
 * gated community content. Heartbeat manages group membership automatically based
 * on the member's payment status
 *
 * Offers support a wide range of business models, including but not limited to:
 *
 * - Freemium Memberships
 * - Freemium with paid digital products
 * - Paid-Only Single-Tier Memberships
 * - Paid-Only Multi-Tier Memberships
 *
 * Admins can choose to paywall specific content or restrict access to the entire
 * community when payment ends.
 *
 * To support a wide range of business models, offers come in four types:
 *
 * - **Waitlist:** Capture interest before subscriptions start and access is
 *   granted. May collect a partial or full upfront payment. Converts into a
 *   single-tier offer at launch.
 * - **Single-Tier:** One group, with one or more payment options. Only one group
 *   is allowed per tier option.
 * - **Multi-Tier:** More than one tier option (users can only be in one tier at a
 *   time), each with one or more payment options. Only one group is allowed per
 *   tier option.
 * - **Bundled:** One payment grants access to more than one group.
 *
 * Offers support these payment formats:
 *
 * - **Recurring subscriptions:** Access ends automatically after cancellation or
 *   payment failure, at the end of the billing cycle.
 * - **One-time payments:** Permanent access after payment is complete.
 * - **Installments:** One-time payments spread across a finite number of
 *   installments. Access begins after the first payment; full ownership is granted
 *   after the final installment. If payment fails mid-plan, access is revoked.
 * - **Name-your-price:** Admins set a minimum and suggested price; users choose
 *   what to pay. Supported for all payment types.
 *
 * Each tier can also include a free trial, granting time-limited access before
 * payment is required.
 */
export interface Offer {
  /**
   * Unique identifier of the offer.
   */
  id: string;

  /**
   * Unique identifiers of the `groups` and `users` that can access the offer. Null
   * means there are no access restrictions.
   */
  accessibleTo: Array<Offer.AccessibleTo> | null;

  /**
   * Whether an offer is archived or active. If archived, no new users may join the
   * offer but existing active users can stay.
   */
  archived: boolean;

  /**
   * Number of days after a user becomes active on the offer before their access is
   * automatically revoked. If set, the user is removed after the specified number of
   * days. For subscriptions, this also cancels the active subscription. If null,
   * access continues until the user cancels or payment fails.
   */
  autoRevokeAccess: number | null;

  /**
   * The days until expiration for the offer. When an offer expires, no new users can
   * access the offer.
   */
  expirationDate: string | null;

  /**
   * the number of free trial days associated with an offer
   */
  freeTrialDays: number | null;

  /**
   * Indicates when payment info is collected during a free trial. true -- Payment is
   * collected **upfront**; users are auto-charged when the trial ends; false --
   * Payment is collected **after** the trial; users must enter payment details when
   * the trial expires.
   */
  isPaymentRequiredForTrial: boolean;

  /**
   * Whether this offer uses pay-what-you-want pricing, allowing users to choose
   * their own price above the minimum amount.
   */
  isPayWhatYouWant: boolean;

  /**
   * The offer name, as displayed in the community.
   */
  name: string;

  /**
   * The type of offer
   */
  product: Offer.UnionMember0 | Offer.UnionMember1 | Offer.UnionMember2;

  /**
   * The number of allowable purchases on an offer. If the limit is reached, no new
   * users are allowed to purchase the offer. If null, there is no limit.
   */
  purchaseLimit: number | null;

  /**
   * Whether to show a community-wide paywall when a user cancels their active
   * payment on an offer. If false, only remove them from the offer groups.
   */
  showCommunityPaywall: boolean;

  /**
   * Defines in-community upsell configuration for this offer. When set, locked
   * content (e.g. channels, docs, courses, events) shows an **upsell view** instead
   * of its actual content. The upsell can include a title, description, video, CTA
   * button text, and testimonial. If null, upsells are disabled for this offer, and
   * paywalled content will remain hidden unless another associated offer has upsells
   * enabled.
   */
  upsell: Offer.Upsell | null;
}

export namespace Offer {
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

  export interface UnionMember0 {
    groupId: string;

    priceOptions: Array<OffersAPI.PriceOption>;

    type: 'SINGLE_GROUP';
  }

  export interface UnionMember1 {
    tiers: Array<UnionMember1.Tier>;

    type: 'TIERED';

    freeTierGroupId?: string | null;
  }

  export namespace UnionMember1 {
    export interface Tier {
      groupId: string;

      priceOptions: Array<Tier.PriceOption>;

      freeTrialDays?: number | null;

      /**
       * Upsell configuration for this tier
       */
      upsell?: Tier.Upsell | null;
    }

    export namespace Tier {
      export interface PriceOption {
        /**
         * The price amount
         */
        amount: number;

        /**
         * Three-letter currency code
         */
        currency: string;

        /**
         * Payment frequency configuration
         */
        frequency: PriceOption.Type | PriceOption.UnionMember1 | PriceOption.UnionMember2;

        /**
         * Suggested amount for name-your-price offers
         */
        suggestedAmount?: number | null;
      }

      export namespace PriceOption {
        export interface Type {
          type: 'ONE_TIME';
        }

        export interface UnionMember1 {
          interval: 'MONTHLY' | 'YEARLY';

          type: 'RECURRING';

          /**
           * Upfront amount for recurring subscriptions
           */
          upfrontAmount?: number | null;
        }

        export interface UnionMember2 {
          interval: 'MONTHLY' | 'YEARLY';

          /**
           * Number of installment cycles
           */
          numCycles: number;

          type: 'INSTALLMENT_PLAN';
        }
      }

      /**
       * Upsell configuration for this tier
       */
      export interface Upsell {
        /**
         * The body content as sanitized HTML
         */
        body: string;

        /**
         * The text for the CTA button
         */
        buttonText: string;

        /**
         * The header text for the upsell
         */
        header: string;

        /**
         * Testimonial to build trust and credibility
         */
        testimonial?: Upsell.Testimonial | null;

        /**
         * Video embed configuration supporting link, embed HTML, or Mux video
         */
        video?: Upsell.UnionMember0 | Upsell.UnionMember1 | Upsell.UnionMember2 | null;
      }

      export namespace Upsell {
        /**
         * Testimonial to build trust and credibility
         */
        export interface Testimonial {
          /**
           * URL of the testimonial author's image
           */
          imageUrl: string;

          /**
           * Name of the person giving the testimonial
           */
          name: string;

          /**
           * The testimonial text
           */
          text: string;
        }

        export interface UnionMember0 {
          type: 'LINK';

          url: string;
        }

        export interface UnionMember1 {
          html: string;

          type: 'EMBED';
        }

        export interface UnionMember2 {
          type: 'MUX_VIDEO';

          videoID: string;
        }
      }
    }
  }

  export interface UnionMember2 {
    description: string;

    groups: Array<string>;

    name: string;

    priceOptions: Array<OffersAPI.PriceOption>;

    type: 'BUNDLE';
  }

  /**
   * Defines in-community upsell configuration for this offer. When set, locked
   * content (e.g. channels, docs, courses, events) shows an **upsell view** instead
   * of its actual content. The upsell can include a title, description, video, CTA
   * button text, and testimonial. If null, upsells are disabled for this offer, and
   * paywalled content will remain hidden unless another associated offer has upsells
   * enabled.
   */
  export interface Upsell {
    /**
     * The body content as sanitized HTML
     */
    body: string;

    /**
     * The text for the CTA button
     */
    buttonText: string;

    /**
     * The header text for the upsell
     */
    header: string;

    /**
     * Testimonial to build trust and credibility
     */
    testimonial?: Upsell.Testimonial | null;

    /**
     * Video embed configuration supporting link, embed HTML, or Mux video
     */
    video?: Upsell.UnionMember0 | Upsell.UnionMember1 | Upsell.UnionMember2 | null;
  }

  export namespace Upsell {
    /**
     * Testimonial to build trust and credibility
     */
    export interface Testimonial {
      /**
       * URL of the testimonial author's image
       */
      imageUrl: string;

      /**
       * Name of the person giving the testimonial
       */
      name: string;

      /**
       * The testimonial text
       */
      text: string;
    }

    export interface UnionMember0 {
      type: 'LINK';

      url: string;
    }

    export interface UnionMember1 {
      html: string;

      type: 'EMBED';
    }

    export interface UnionMember2 {
      type: 'MUX_VIDEO';

      videoID: string;
    }
  }
}

export interface PriceOption {
  /**
   * The price amount
   */
  amount: number;

  /**
   * Three-letter currency code
   */
  currency: string;

  /**
   * Payment frequency configuration
   */
  frequency: PriceOption.Type | PriceOption.UnionMember1 | PriceOption.UnionMember2;

  /**
   * Suggested amount for name-your-price offers
   */
  suggestedAmount?: number | null;
}

export namespace PriceOption {
  export interface Type {
    type: 'ONE_TIME';
  }

  export interface UnionMember1 {
    interval: 'day' | 'month' | 'year' | 'week' | 'quarter';

    type: 'RECURRING';

    /**
     * Upfront amount for recurring subscriptions
     */
    upfrontAmount?: number | null;
  }

  export interface UnionMember2 {
    interval: 'day' | 'month' | 'year' | 'week' | 'quarter';

    /**
     * Number of installment cycles
     */
    numCycles: number;

    type: 'INSTALLMENT_PLAN';
  }
}

export interface OfferListResponse {
  data: Array<Offer>;

  /**
   * Whether there are more results available
   */
  hasMore: boolean;
}

export interface OfferListParams {
  /**
   * Filter by archived status
   */
  archived?: 'all' | 'active' | 'archived';

  /**
   * Number of results to return (1-100)
   */
  limit?: number;

  /**
   * Cursor for pagination - return results after this ID
   */
  startingAfter?: string;
}

export declare namespace Offers {
  export {
    type Offer as Offer,
    type PriceOption as PriceOption,
    type OfferListResponse as OfferListResponse,
    type OfferListParams as OfferListParams,
  };
}
