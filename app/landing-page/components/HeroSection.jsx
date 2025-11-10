import React from 'react';
import Link from "next/link";
import Icon from '../../../components/layout/AppIcon';
import Button from '../../../components/shared/button/page';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Find Your Dream Job with{' '}
            <span className="text-primary">JobEazy</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Connect with opportunities across Local, International, and Contract markets. 
            Join thousands of professionals who've found their perfect career match.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {/* Use Button as child without <a> */}
            <Link href="/user-registration" passHref>
              <Button 
                asChild
                variant="default" 
                size="lg"
                iconName="UserPlus"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                <span>Get Started - It's Free</span>
              </Button>
            </Link>

            <Link href="/user-registration" passHref>
              <Button 
                asChild
                variant="outline" 
                size="lg"
                iconName="Building2"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                <span>Post Jobs - For Employers</span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: 'MapPin', title: 'Nearby Jobs', desc: 'Find jobs in your city with top local companies', bg: 'bg-primary/10', color: 'text-primary' },
              { icon: 'Globe', title: 'International Careers', desc: 'Explore global opportunities with leading companies worldwide', bg: 'bg-accent/10', color: 'text-accent' },
              { icon: 'Clock', title: 'Contract Work', desc: 'Flexible contract positions for independent professionals', bg: 'bg-secondary/10', color: 'text-secondary' }
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className={`w-16 h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon name={item.icon} size={32} className={item.color} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
