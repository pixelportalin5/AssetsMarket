export const ROLE_SLUGS = {
  ADMIN: "ADMIN",
  MODERATOR: "MODERATOR",
  SELLER: "SELLER",
  ADVERTISER: "ADVERTISER",
  BUYER: "BUYER",
} as const;

export type RoleSlug = (typeof ROLE_SLUGS)[keyof typeof ROLE_SLUGS];

export const REGISTERABLE_ROLE_SLUGS = [
  ROLE_SLUGS.SELLER,
  ROLE_SLUGS.ADVERTISER,
  ROLE_SLUGS.BUYER,
] as const;

export type RegisterableRoleSlug = (typeof REGISTERABLE_ROLE_SLUGS)[number];

export const SEED_ROLES: Array<{ slug: RoleSlug; name: string; description: string }> = [
  { slug: ROLE_SLUGS.ADMIN, name: "Administrator", description: "Full platform access" },
  { slug: ROLE_SLUGS.MODERATOR, name: "Moderator", description: "Content and user moderation" },
  { slug: ROLE_SLUGS.SELLER, name: "Seller", description: "List and sell advertising assets" },
  { slug: ROLE_SLUGS.ADVERTISER, name: "Advertiser", description: "Book and run campaigns" },
  { slug: ROLE_SLUGS.BUYER, name: "Buyer", description: "Browse and purchase inventory" },
];
