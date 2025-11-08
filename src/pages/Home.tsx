import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, Star, UtensilsCrossed } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
}

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    loadFeaturedItems();
  }, []);

  const loadFeaturedItems = async () => {
    const { data } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_featured', true)
      .eq('is_available', true)
      .limit(3);

    if (data) setFeaturedItems(data);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-restaurant-dark via-restaurant-charcoal to-background">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-gradient">
            Feature Dishes Restaurant
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Experience culinary excellence with every bite
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/menu">
              <Button size="lg" className="text-lg">
                View Menu <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/reservations">
              <Button size="lg" variant="outline" className="text-lg">
                Book a Table
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">Featured Dishes</h2>
            <p className="text-muted-foreground text-lg">Our chef's special selections</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-smooth">
                <div className="h-48 bg-muted flex items-center justify-center">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <UtensilsCrossed className="h-16 w-16 text-muted-foreground" />
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="text-sm font-semibold text-primary">Featured</span>
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">{item.name}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</span>
                    <Link to="/menu">
                      <Button>Order Now</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground text-lg">What makes us special</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Quality Ingredients</h3>
              <p className="text-muted-foreground">
                We source only the finest, freshest ingredients for our dishes
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Expert Chefs</h3>
              <p className="text-muted-foreground">
                Our experienced culinary team brings passion to every plate
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Quick and reliable delivery right to your door
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
