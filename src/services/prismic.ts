import * as Prismic from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';

export function getPrismicClient(req?: any) {
  const prismic = Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    ...req,
    accessToken: process.env.PRISMIC_ACESS_TOKEN,
  });

  enableAutoPreviews({
    client: prismic,
    previewData: req?.previewData,
    req,
  });

  return prismic;
}
