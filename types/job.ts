
export interface HimalayasJob {
  title: string;
  excerpt: string;

  companyName: string;
  companySlug: string;
  companyLogo: string;

  employmentType: string;

  minSalary: number | null;
  maxSalary: number | null;
  salaryPeriod: string | null;
  currency: string | null;

  seniority: string[];

  locationRestrictions: string[];
  timezoneRestrictions: number[];

  categories: string[];
  parentCategories: string[];

  description: string;

  pubDate: number;
  expiryDate: number;

  applicationLink: string;
  guid: string;
}

export interface HimalayasResponse {
  comments: string;
  updatedAt: number;
  offset: number;
  limit: number;
  totalCount: number;
  nextCursor: string | null;
  jobs: HimalayasJob[];
}
