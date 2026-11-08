// Add only certificates that you have actually earned. Each record appears on the Credentials section.
export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  image?: string;
};

export const certificates: Certificate[] = [];
