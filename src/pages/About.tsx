import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-display font-bold mb-4 text-gradient">About Us</h1>
          <p className="text-muted-foreground text-lg">
            Discover the story behind Feature Dishes Restaurant
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-display font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2020, Feature Dishes Restaurant has been serving exceptional cuisine with
                a passion for quality and innovation. Our journey began with a simple vision: to
                create memorable dining experiences that combine traditional culinary techniques with
                modern flavors.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we continue to push boundaries, sourcing the finest ingredients and crafting
                dishes that delight our guests. Every plate that leaves our kitchen is a testament to
                our commitment to excellence.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-display font-bold mb-4">Our Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We believe that great food starts with great ingredients. That's why we partner with
                local farmers and suppliers to bring you the freshest seasonal produce, sustainably
                sourced meats, and artisanal products.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our culinary team, led by award-winning chefs, creates innovative dishes that honor
                classic techniques while embracing contemporary flavors. Each dish is carefully
                crafted to provide a perfect balance of taste, texture, and presentation.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-display font-bold text-center mb-8">Meet Our Chefs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-display font-semibold mb-2">Chef Alessandro</h3>
                <p className="text-primary font-semibold mb-2">Executive Chef</p>
                <p className="text-muted-foreground text-sm">
                  20+ years of culinary excellence, specializing in Italian and French cuisine
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-display font-semibold mb-2">Chef Maria</h3>
                <p className="text-primary font-semibold mb-2">Pastry Chef</p>
                <p className="text-muted-foreground text-sm">
                  Award-winning pastry chef creating artful desserts that taste as good as they look
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-display font-semibold mb-2">Chef James</h3>
                <p className="text-primary font-semibold mb-2">Sous Chef</p>
                <p className="text-muted-foreground text-sm">
                  Master of modern culinary techniques with a passion for seasonal ingredients
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-muted-foreground">123 Culinary Avenue, Food City, FC 12345</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">info@featuredishes.com</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold mb-2">Opening Hours</p>
                    <div className="text-muted-foreground space-y-1">
                      <p>Monday - Thursday: 11:00 AM - 10:00 PM</p>
                      <p>Friday - Saturday: 11:00 AM - 11:00 PM</p>
                      <p>Sunday: 12:00 PM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
