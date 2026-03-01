export interface SectorTemplateConfig {
  sector: string;
  selectors: {
    name: string;
    title: string;
    company: string;
    profileImage: string;
    backgroundImage: string;
    servicesContainer: string;
    testimonialsTrack: string;
    galleryContainer: string;
    certificatesContainer: string;
  };
  templates: {
    serviceItem: string;
    testimonialItem: string;
    galleryItem: string;
    certificateItem: string;
  };
  cssVariables: {
    primaryColor: string;
  };
}

// Configuración para cada rubro
export const TEMPLATE_CONFIGS: Record<string, SectorTemplateConfig> = {
  restaurant: {
    sector: "restaurant",
    selectors: {
      name: ".name",
      title: ".title",
      company: ".company",
      profileImage: ".profile-image img",
      backgroundImage: ".bg-image",
      servicesContainer: ".menu-grid",
      testimonialsTrack: ".testimonials-track",
      galleryContainer: ".gallery",
      certificatesContainer: ".certifications"
    },
    templates: {
      serviceItem: `
        <div class="menu-item">
          <i class="fas {{icon}}"></i>
          <div class="menu-info">
            <h4>{{name}}</h4>
            {{#if price}}<span class="price">{{price}}</span>{{/if}}
          </div>
          {{#if description}}<p class="menu-desc">{{description}}</p>{{/if}}
        </div>
      `,
      testimonialItem: `
        <div class="testimonial-card">
          <div class="testimonial-stars">{{stars}}</div>
          <div class="testimonial-text">"{{content}}"</div>
          <div class="testimonial-author">— {{name}}</div>
        </div>
      `,
      galleryItem: `<div class="gallery-item"><img src="{{imageUrl}}" alt="{{caption}}"></div>`,
      certificateItem: `
        <div class="cert-badge">
          <i class="fas fa-certificate"></i>
          <div>{{name}}{{#if licenseNumber}}<br><small>{{licenseNumber}}</small>{{/if}}</div>
        </div>
      `
    },
    cssVariables: { primaryColor: "--accent" }
  },
  
  construction: {
    sector: "construction",
    selectors: {
      name: ".name",
      title: ".title",
      company: ".company",
      profileImage: ".profile-image img",
      backgroundImage: ".bg-image",
      servicesContainer: ".services-grid",
      testimonialsTrack: ".testimonials-track",
      galleryContainer: ".gallery",
      certificatesContainer: ".certifications"
    },
    templates: {
      serviceItem: `
        <div class="service-card">
          <i class="fas {{icon}}"></i>
          <span>{{name}}</span>
        </div>
      `,
      testimonialItem: `
        <div class="testimonial-card">
          <div class="testimonial-stars">{{stars}}</div>
          <div class="testimonial-text">"{{content}}"</div>
          <div class="testimonial-author">— {{name}}</div>
        </div>
      `,
      galleryItem: `<div class="gallery-item"><img src="{{imageUrl}}" alt="{{caption}}"></div>`,
      certificateItem: `
        <div class="cert-badge">
          <i class="fas fa-certificate"></i>
          <div>{{name}}{{#if licenseNumber}}<br><small>{{licenseNumber}}</small>{{/if}}</div>
        </div>
      `
    },
    cssVariables: { primaryColor: "--accent" }
  },
  
  "real-estate": {
    sector: "real-estate",
    selectors: {
      name: ".name",
      title: ".title",
      company: ".company",
      profileImage: ".profile-image img",
      backgroundImage: ".bg-image",
      servicesContainer: ".services-grid",
      testimonialsTrack: ".testimonials-track",
      galleryContainer: ".gallery",
      certificatesContainer: ".certifications"
    },
    templates: {
      serviceItem: `
        <div class="service-card">
          <i class="fas {{icon}}"></i>
          <span>{{name}}</span>
        </div>
      `,
      testimonialItem: `
        <div class="testimonial-card">
          <div class="testimonial-stars">{{stars}}</div>
          <div class="testimonial-text">"{{content}}"</div>
          <div class="testimonial-author">— {{name}}</div>
        </div>
      `,
      galleryItem: `
        <div class="gallery-item">
          <img src="{{imageUrl}}" alt="{{caption}}">
          {{#if price}}<span class="property-price">{{price}}</span>{{/if}}
        </div>
      `,
      certificateItem: `
        <div class="cert-badge">
          <i class="fas fa-certificate"></i>
          <div>{{name}}{{#if licenseNumber}}<br><small>{{licenseNumber}}</small>{{/if}}</div>
        </div>
      `
    },
    cssVariables: { primaryColor: "--terracotta" }
  },
  
  cleaning: {
    sector: "cleaning",
    selectors: {
      name: ".name",
      title: ".title",
      company: ".company",
      profileImage: ".profile-image img",
      backgroundImage: ".bg-image",
      servicesContainer: ".services-grid",
      testimonialsTrack: ".testimonials-track",
      galleryContainer: ".gallery",
      certificatesContainer: ".certifications"
    },
    templates: {
      serviceItem: `
        <div class="service-card">
          <i class="fas {{icon}}"></i>
          <span>{{name}}</span>
        </div>
      `,
      testimonialItem: `
        <div class="testimonial-card">
          <div class="testimonial-stars">{{stars}}</div>
          <div class="testimonial-text">"{{content}}"</div>
          <div class="testimonial-author">— {{name}}</div>
        </div>
      `,
      galleryItem: `<div class="gallery-item"><img src="{{imageUrl}}" alt="{{caption}}"></div>`,
      certificateItem: `
        <div class="cert-badge">
          <i class="fas fa-certificate"></i>
          <div>{{name}}{{#if licenseNumber}}<br><small>{{licenseNumber}}</small>{{/if}}</div>
        </div>
      `
    },
    cssVariables: { primaryColor: "--orange" }
  },
  
  general: {
    sector: "general",
    selectors: {
      name: ".name",
      title: ".title",
      company: ".company",
      profileImage: ".profile-image img",
      backgroundImage: ".bg-image",
      servicesContainer: ".services-grid",
      testimonialsTrack: ".testimonials-track",
      galleryContainer: ".gallery",
      certificatesContainer: ".certifications"
    },
    templates: {
      serviceItem: `
        <div class="service-card">
          <i class="fas {{icon}}"></i>
          <span>{{name}}</span>
        </div>
      `,
      testimonialItem: `
        <div class="testimonial-card">
          <div class="testimonial-stars">{{stars}}</div>
          <div class="testimonial-text">"{{content}}"</div>
          <div class="testimonial-author">— {{name}}</div>
        </div>
      `,
      galleryItem: `<div class="gallery-item"><img src="{{imageUrl}}" alt="{{caption}}"></div>`,
      certificateItem: `
        <div class="cert-badge">
          <i class="fas fa-certificate"></i>
          <div>{{name}}{{#if licenseNumber}}<br><small>{{licenseNumber}}</small>{{/if}}</div>
        </div>
      `
    },
    cssVariables: { primaryColor: "--accent" }
  }
};

export function getSectorConfig(sector: string): SectorTemplateConfig {
  return TEMPLATE_CONFIGS[sector] || TEMPLATE_CONFIGS.general;
}
