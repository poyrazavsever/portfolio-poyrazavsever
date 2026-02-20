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
  academy: {
    hero: {
      title: string;
      highlight: string;
      description: string;
      badge: string;
    };
    certifications: {
      hero: {
        title: string;
        highlight: string;
        description: string;
        badge: string;
      };
      labels: {
        issued: string;
        showCredential: string;
      };
      items: {
        title: string;
        organization: string;
        issueDate: string;
        tags: string[];
      }[];
    };
    readingList: {
      hero: {
        title: string;
        highlight: string;
        description: string;
        badge: string;
      };
      tabs: {
        books: string;
        videos: string;
      };
      labels: {
        viewOnAmazon: string;
        status: {
          read: string;
          reading: string;
          queue: string;
          watched: string;
          watching: string;
        };
      };
      books: {
        title: string;
        author: string;
        category: string;
      }[];
      videos: {
        title: string;
        author: string;
        platform: string;
      }[];
    };
  };
  career: {
    education: {
      hero: {
        title: string;
        highlight: string;
        description: string;
        badge: string;
      };
      title: string;
      titleHighlight: string;
      items: {
        id: string;
        role: string;
        company: string;
        date: string;
        description?: string[];
        skills?: string[];
      }[];
    };
    experience: {
      hero: {
        title: string;
        highlight: string;
        description: string;
        badge: string;
      };
      workTitle: string;
      workTitleHighlight: string;
      volunteerTitle: string;
      volunteerTitleHighlight: string;
      work: {
        id: string;
        role: string;
        company: string;
        date: string;
        location?: string;
        type?: string;
        description?: string[];
        skills?: string[];
      }[];
      volunteer: {
        id: string;
        role: string;
        company: string;
        date: string;
        type?: string;
        description?: string[];
        skills?: string[];
      }[];
    };
  };
  contact: {
    hero: {
      title: string;
      highlight: string;
      description: string;
      badge: string;
    };
    info: {
      title: string;
      description: string;
      emailLabel: string;
      locationLabel: string;
      locationValue: string;
      availabilityLabel: string;
      availabilityValue: string;
    };
    form: {
      title: string;
      description: string;
      labels: {
        name: string;
        email: string;
        topic: string;
        date: string;
        time: string;
        message: string;
      };
      placeholders: {
        name: string;
        email: string;
        topic: string;
        date: string;
        time: string;
        message: string;
      };
      topics: {
        project: string;
        consulting: string;
        speaking: string;
        other: string;
      };
      buttonText: string;
    };
  };
  ecosystem: {
    hero: {
      title: string;
      highlight?: string;
      subtitle: string;
      meta: string;
      badge: string;
    };
    vision: {
      title: string;
      description: string;
    };
    hub: {
      title: string;
      description: string;
      caption: string;
    };
    subdomains: {
      title: string;
      items: {
        name: string;
        description: string;
      }[];
    };
    journeys: {
      title: string;
      description: string;
      caption: string;
    };
    plan: {
      title: string;
      description: string;
    };
    diagrams: {
      ecosystem: {
        user: string;
        hub: string;
        subdomains: string;
      };
      journeys: {
        user: string;
        hub: string;
        portal: string;
        labs: string;
        step1: string;
        step2: string;
        clientOpt: string;
        login: string;
        tracking: string;
        learnerOpt: string;
        access: string;
        examples: string;
      };
    };
  };
}
