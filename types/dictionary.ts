export interface Dictionary {
  layout: {
    navbar: {
      topbar: {
        basedIn: string;
        city: string;
        socialLinks: string;
        rss: string;
        status: string;
        settings: {
          title: string;
          theme: string;
          language: string;
          fontSize: string;
          close: string;
          system: string;
          default: string;
        };
      };
      menu: {
        showcase: {
          label: string;
          items: {
            featured: { title: string; desc: string };
            fullstack: { title: string; desc: string };
            design: { title: string; desc: string };
            opensource: { title: string; desc: string };
            uiKit: { title: string; desc: string };
            archive: { title: string; desc: string };
            saas: { title: string; desc: string };
            ecommerce: { title: string; desc: string };
          };
        };
        products: {
          label: string;
          items: {
            workspace: { title: string; desc: string };
            saas: { title: string; desc: string };
            mobile: { title: string; desc: string };
            figma: { title: string; desc: string };
            microTools: { title: string; desc: string };
            apis: { title: string; desc: string };
          };
        };
        clientPortal: {
          label: string;
          items: {
            login: { title: string; desc: string };
            services: { title: string; desc: string };
            workflow: { title: string; desc: string };
            pricing: { title: string; desc: string };
            meeting: { title: string; desc: string };
            proposal: { title: string; desc: string };
          };
        };
        media: {
          label: string;
          items: {
            masabasi: { title: string; desc: string };
            archive: { title: string; desc: string };
            podcast: { title: string; desc: string };
            blog: { title: string; desc: string };
            social: { title: string; desc: string };
            apply: { title: string; desc: string };
            systemDesign: { title: string; desc: string };
            uiUx: { title: string; desc: string };
          };
        };
        academy: {
          label: string;
          items: {
            journey: { title: string; desc: string };
            certs: { title: string; desc: string };
            reading: { title: string; desc: string };
          };
        };
        ecosystem: {
          label: string;
          items: {
            status: { title: string; desc: string };
            architecture: { title: string; desc: string };
          };
        };
        about: {
          label: string;
          items: {
            story: { title: string; desc: string };
            experience: { title: string; desc: string };
            education: { title: string; desc: string };
            resume: { title: string; desc: string };
            contact: { title: string; desc: string };
          };
        };
      };
      actions: {
        login: string;
        contact: string;
      };
    };
    footer: {
      brand: {
        description: string;
      };
      sections: {
        explore: {
          title: string;
          items: {
            featured: string;
            fullstack: string;
            opensource: string;
            uiKit: string;
          };
        };
        services: {
          title: string;
          items: {
            fullstack: string;
            uiux: string;
            pricing: string;
            meeting: string;
            portal: string;
          };
        };
        company: {
          title: string;
          items: {
            about: string;
            blog: string;
            resume: string;
            contact: string;
            status: string;
          };
        };
      };
      bottom: {
        rights: string;
        links: {
          contact: string;
          privacy: string;
          terms: string;
          sitemap: string;
        };
      };
    };
  };
  shared: {
    blogCard: {
      readTime: string;
    };
    projectCard: {
      year: string;
      viewDetails: string;
    };
    projectSheet: {
      problem: string;
      solution: string;
      designProcess: string;
      technicalArchitecture: string;
      lessonsLearned: string;
      role: string;
      features: string;
      gallery: string;
      technologies: string;
      links: {
        demo: string;
        repo: string;
        caseStudy: string;
      };
      client: string;
    };
  };
  home: {
    hero: {
      greeting: string;
      name: string;
      subtitle: string;
      buttons: {
        start: string;
        browse: string;
      };
    };
    howItWorks: {
      title: string;
      highlight: string;
      subtitle: string;
      steps: { title: string }[];
    };
    courses: {
      title: string;
      highlight: string;
      subtitle: string;
      buttons: {
        seeAll: string;
        browse: string;
        buy: string;
      };
      items: {
        titlePrefix: string;
        keyword: string;
        titleSuffix: string;
        description: string;
      }[];
    };
    youtube: {
      title: string;
      highlight: string;
      subtitle: string;
      videos: { title: string }[];
    };
  };
  about: {
    hero: {
      title: string;
      highlight: string;
      description: string;
      badge: string;
    };
    journey: {
      title: string;
      highlight: string;
      paragraphs: string[];
    };
    engineeringDesign: {
      title: string;
      highlight: string;
      engineering: {
        title: string;
        description: string;
        list: string[];
      };
      design: {
        title: string;
        description: string;
        list: string[];
      };
      philosophy: string;
    };
    values: {
      title: string;
      highlight: string;
      subtitle: string;
      items: {
        title: string;
        description: string;
      }[];
    };
    interests: {
      title: string;
      highlight: string;
      items: {
        label: string;
        desc: string;
      }[];
    };
  };
}
