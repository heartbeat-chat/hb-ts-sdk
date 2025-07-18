// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class SignupPages extends APIResource {
  /**
   * Retrieve a single sign up page by ID
   */
  retrieve(signupPageID: string, options?: RequestOptions): APIPromise<SignupPage> {
    return this._client.get(path`/signup_pages/${signupPageID}`, options);
  }

  /**
   * Retrieve a paginated list of sign up pages in the community
   */
  list(
    query: SignupPageListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SignupPageListResponse> {
    return this._client.get('/signup_pages', { query, ...options });
  }
}

/**
 * Sign up pages are customizable entry points that let new users join a community,
 * and allow existing users to unlock access to groups or offers.
 *
 * Each sign up page can optionally be linked to an offer, in which case it
 * triggers a checkout flow during the sign up process.
 *
 * Here is the typical flow for a new user visiting a sign up link:
 *
 * 1. (If custom landing page is enabled) Custom Landing Page
 * 2. Email submission
 * 3. (If an offer is linked) Offer tier selection and checkout
 * 4. Onboarding
 *
 * Sign up pages act as versatile funnels for growing and segmenting your
 * community. It empowers admins to create sales funnels, custom onboarding
 * experiences, and content gating in a single flow.
 *
 * Heartbeat automatically creates a sign up page when an admin creates a course or
 * offer. But an admin can create as many as they'd like. Any edits made to sign up
 * pages take effect for all future uses.
 */
export interface SignupPage {
  /**
   * Unique identifier for the object
   */
  id: string;

  /**
   * Whether an sign up page is archived or active. If archived, no new users may use
   * the sign up page.
   */
  archived: boolean;

  /**
   * The date the sign up page was created
   */
  createdAt: string;

  /**
   * Unique identifiers of the groups someone will immediately be added to using this
   * sign up page.
   */
  freeGroups: Array<string>;

  /**
   * Whether the sign up page requires pre-approval before use or is evergreen. If
   * true, only an admin-set list of emails may use this sign up page. If false,
   * anyone may use the sign up page. Emails that are sent the sign up page via the
   * Heartbeat platform using the email invite option will automatically be
   * pre-approved.
   */
  isPrivate: boolean;

  /**
   * Landing page configuration
   */
  landingPage: SignupPage.LandingPage | null;

  /**
   * Unique identifier of the offer someone will need to purchase to complete sign
   * up. If set, the sign up page triggers the checkout flow for the offer after
   * email submission. If an existing user is already signed in, they will go skip
   * email submission and go to checkout. If null, no payment is required when using
   * this sign up page.
   */
  paywall: SignupPage.UnionMember0 | SignupPage.UnionMember1 | null;

  /**
   * Unique identifier of the role someone will receive when using this sign up page.
   */
  roleId: string;

  /**
   * a unique user-facing code appended to the end of the sign up page URL that
   * identifies the sign up page.
   */
  url: string;
}

export namespace SignupPage {
  /**
   * Landing page configuration
   */
  export interface LandingPage {
    /**
     * The text on the button that navigates to the next step in the sign up process.
     * For new users, this is the email submission step.
     */
    buttonText?: string;

    /**
     * The rich-text description on the custom landing page, which is typically an
     * explanation of the value and purpose of the community.
     */
    description?: string;

    /**
     * The title of the description section on the custom landing page.
     */
    descriptionTitle?: string;

    /**
     * The title of the footer before the final CTA on the custom landing page.
     */
    footerTitle?: string;

    /**
     * Whether to display images of community members on the custom landing page and
     * during checkout or hide it.
     */
    showSocialProof?: boolean;

    /**
     * The subtitle of the custom landing page, positioned below the title at the top
     * of the page.
     */
    subtitle?: string;

    /**
     * A testimonial meant to build trust and increase credibility for visitors on the
     * custom landing page. It consists of a plain-text quote, name of the person that
     * said the quote, and image.
     */
    testimonial?: unknown | null;

    /**
     * The H1 of the custom landing page.
     */
    title?: string;

    /**
     * The embed code for the video to be displayed on the custom landing page.
     */
    video?: unknown | null;
  }

  export interface UnionMember0 {
    offerId: string;

    type: 'OFFER';
  }

  export interface UnionMember1 {
    type: 'WAITLIST';

    waitlistId: string;
  }
}

export interface SignupPageListResponse {
  data: Array<SignupPage>;

  /**
   * Whether there are more results available
   */
  hasMore: boolean;
}

export interface SignupPageListParams {
  /**
   * Filter by archived status
   */
  archived?: 'all' | 'active' | 'archived';

  /**
   * Number of results to return (1-100)
   */
  limit?: number;

  /**
   * Filter by associated offer
   */
  paywallOfferId?: string;

  /**
   * Cursor for pagination - return results after this ID
   */
  startingAfter?: string;
}

export declare namespace SignupPages {
  export {
    type SignupPage as SignupPage,
    type SignupPageListResponse as SignupPageListResponse,
    type SignupPageListParams as SignupPageListParams,
  };
}
