export const checksums = {
  "blog": "v3.5.0--Dx1G8rgpBngMGJee98vP2Mt1XxeH1X1UppLzOr6gT1M",
  "projects": "v3.5.0--8fqSLNwV9PkUvD7zGbApLROt0nOEf-pKA_QHPcU058A",
  "docs": "v3.5.0--bmhn4r2xDIwoP8RxZxIpHU8mtuRuHnMh91EWS9R3dB4",
  "labs": "v3.5.0--VWvAkOp_4kqF5bcNfOE9H0Wka9wlKvxhLz4sORA_iyE",
  "home": "v3.5.0--i85j8LGy6Q-TJzlteTb1zziGfCjX7g_fDFN0a1sjx-0",
  "settings": "v3.5.0--7NdHW3U4wwSq3Ia4uCr0UVNrNwsOoJSUDSevpNoDzt0"
}
export const checksumsStructure = {
  "blog": "D1nqOjw9cSJ92Hk2kh1TzwwAK0r722yUjtEHToUmqGI",
  "projects": "1joIppyCmuFo62RcOAzNT7hJCumb1dxSy_R6tYl44KU",
  "docs": "fletLM_fWcFCfR0fBo-nsvWiomWbRXWWKOwsO6sn56w",
  "labs": "IA7318SIMAnuJVIwwKXY6-D649IlKXot3TzcLsBVdR8",
  "home": "mk-tLIReAPgs28M1s8MdR795Twcc4eXp3Dv3oYnGS4E",
  "settings": "HRPrPWOq90oDSymRhxY64nXZuq9JhSLBKqaYKakfBIo"
}

export const tables = {
  "blog": "_content_blog",
  "projects": "_content_projects",
  "docs": "_content_docs",
  "labs": "_content_labs",
  "home": "_content_home",
  "settings": "_content_settings",
  "info": "_content_info"
}

export default {
  "blog": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "author": "string",
      "body": "json",
      "canonical": "string",
      "category": "string",
      "date": "string",
      "description": "string",
      "excerpt": "string",
      "extension": "string",
      "lab": "string",
      "meta": "json",
      "navigation": "json",
      "noindex": "boolean",
      "ogDescription": "string",
      "ogImage": "string",
      "ogTitle": "string",
      "path": "string",
      "readingTime": "string",
      "seo": "json",
      "seoDescription": "string",
      "seoTitle": "string",
      "slug": "string",
      "status": "string",
      "stem": "string",
      "tags": "json",
      "type": "string",
      "updatedAt": "string"
    }
  },
  "projects": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "body": "json",
      "canonical": "string",
      "date": "string",
      "description": "string",
      "docsFolder": "string",
      "docsPath": "string",
      "docsPaths": "json",
      "extension": "string",
      "lab": "string",
      "meta": "json",
      "navigation": "json",
      "noindex": "boolean",
      "ogDescription": "string",
      "ogImage": "string",
      "ogTitle": "string",
      "path": "string",
      "relatedArticles": "json",
      "relatedBlogSlugs": "json",
      "relatedDocs": "json",
      "relatedPosts": "json",
      "seo": "json",
      "seoDescription": "string",
      "seoTitle": "string",
      "slug": "string",
      "stack": "json",
      "status": "string",
      "stem": "string",
      "summary": "string",
      "tags": "json",
      "type": "string",
      "updatedAt": "string",
      "year": "number"
    }
  },
  "docs": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "body": "json",
      "canonical": "string",
      "date": "string",
      "description": "string",
      "docsFolder": "string",
      "extension": "string",
      "lab": "string",
      "meta": "json",
      "navigation": "json",
      "noindex": "boolean",
      "ogDescription": "string",
      "ogImage": "string",
      "ogTitle": "string",
      "order": "number",
      "path": "string",
      "project": "string",
      "projectSlug": "string",
      "section": "string",
      "seo": "json",
      "seoDescription": "string",
      "seoTitle": "string",
      "slug": "string",
      "status": "string",
      "stem": "string",
      "tags": "json",
      "updatedAt": "string"
    }
  },
  "labs": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "accent": "string",
      "body": "json",
      "canonical": "string",
      "description": "string",
      "extension": "string",
      "featured": "boolean",
      "meta": "json",
      "navigation": "json",
      "noindex": "boolean",
      "ogDescription": "string",
      "ogImage": "string",
      "ogTitle": "string",
      "openQuestions": "json",
      "order": "number",
      "path": "string",
      "relatedTags": "json",
      "roadmap": "json",
      "seo": "json",
      "seoDescription": "string",
      "seoTitle": "string",
      "shortTitle": "string",
      "slug": "string",
      "status": "string",
      "stem": "string"
    }
  },
  "home": {
    "type": "data",
    "fields": {
      "id": "string",
      "extension": "string",
      "meta": "json",
      "stem": "string"
    }
  },
  "settings": {
    "type": "data",
    "fields": {
      "id": "string",
      "extension": "string",
      "meta": "json",
      "stem": "string"
    }
  },
  "info": {
    "type": "data",
    "fields": {}
  }
}