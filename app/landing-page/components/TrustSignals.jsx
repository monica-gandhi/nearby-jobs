import React from 'react';
import Icon from '../../../components/layout/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const stats = [
  { label: 'Active Jobs', value: '10,000+', icon: 'Briefcase' },
  { label: 'Companies', value: '2,500+', icon: 'Building2' },
  { label: 'Job Seekers', value: '50,000+', icon: 'Users' },
  { label: 'Success Stories', value: '15,000+', icon: 'Star' }];


  const companies = [
  {
    name: 'TechCorp',
    logo: "https://images.unsplash.com/photo-1731991437098-416510b6f5da",
    alt: 'TechCorp company logo with modern blue and white design'
  },
  {
    name: 'InnovateLab',
    logo: "https://images.unsplash.com/photo-1624674150511-1b1c9cf0ed2b",
    alt: 'InnovateLab company logo featuring geometric patterns in green'
  },
  {
    name: 'GlobalSoft',
    logo: "https://images.unsplash.com/photo-1657870913409-c54bc5bc050b",
    alt: 'GlobalSoft company logo with minimalist typography in black'
  },
  {
    name: 'DataFlow',
    logo: "https://images.unsplash.com/photo-1558655146-6c222b05fce4",
    alt: 'DataFlow company logo showing abstract data visualization elements'
  },
  {
    name: 'CloudTech',
    logo: "https://images.unsplash.com/photo-1728410539013-ad662a093c68",
    alt: 'CloudTech company logo with cloud-inspired design in blue tones'
  },
  {
    name: 'NextGen',
    logo: "https://images.unsplash.com/photo-1719891940645-84c490dd1405",
    alt: 'NextGen company logo featuring futuristic font and orange accent'
  }];


  const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    company: 'TechCorp',
    avatar: "https://images.unsplash.com/photo-1668911240686-fe09797b3043",
    avatarAlt: 'Professional headshot of Sarah Johnson, young woman with brown hair in business attire',
    content: "JobEazy helped me land my dream job in just 2 weeks. The platform\'s filtering system made it easy to find exactly what I was looking for."
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'InnovateLab',
    avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f",
    avatarAlt: 'Professional headshot of Michael Chen, Asian man with glasses in navy blue suit',
    content: "The international job opportunities on JobEazy opened doors I never knew existed. Now I'm working remotely for a global company."
  },
  {
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    company: 'GlobalSoft',
    avatar: "https://images.unsplash.com/photo-1563220599-bc8cb877de5d",
    avatarAlt: 'Professional headshot of Emily Rodriguez, Hispanic woman with long dark hair smiling',
    content: "As a freelancer, the contract job section has been invaluable. I've built a steady client base through the platform."
  }];


  return (
    <section className="bg-muted/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Trusted by Professionals Worldwide
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of job seekers and employers who have found success through our platform
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats?.map((stat, index) =>
            <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={stat?.icon} size={24} className="text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
                <div className="text-sm text-muted-foreground">{stat?.label}</div>
              </div>
            )}
          </div>
        </div>

        {/* Companies Section */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-foreground text-center mb-8">
            Trusted by Leading Companies
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {companies?.map((company, index) =>
            <div key={index} className="flex items-center justify-center p-4 bg-card rounded-lg border border-border hover:shadow-elevation-1 transition-micro">
                <Image
                src={company?.logo}
                alt={company?.alt}
                className="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-micro" />

              </div>
            )}
          </div>
        </div>

        {/* Testimonials Section */}
        <div>
          <h3 className="text-2xl font-bold text-foreground text-center mb-12">
            Success Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials?.map((testimonial, index) =>
            <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.avatarAlt}
                  className="w-12 h-12 rounded-full object-cover" />

                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial?.role} at {testimonial?.company}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial?.content}"</p>
                <div className="flex items-center mt-4">
                  {[...Array(5)]?.map((_, i) =>
                <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default TrustSignals;