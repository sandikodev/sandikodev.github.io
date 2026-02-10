export interface TAuthor {
  body: string;
  collection: string;
  data: {
    description: string;
    image: string;
    social: {
      facebook: string;
      instagram: string;
      twitter: string;
    };
    title: string;
  };
  id: string;
  render: () => Promise<{ Content: any }>;
  slug: string;
}

export interface TPost {
  body: string;
  collection: string;
  data: {
    authors: string[];
    categories: string[];
    date: any;
    description: string;
    draft: boolean;
    image: string;
    tags: string[];
    title: string;
  };
  id: string;
  render: () => Promise<{ Content: any }>;
  slug: string;
}
