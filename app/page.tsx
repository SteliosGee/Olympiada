import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Anchor, SailboatIcon as Boat, Calendar, Camera, History, MapPin, Menu, Utensils } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <header className="sticky top-0 z-50 bg-white shadow-sm w-full bg-opacity-80">
        <div className="flex py-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold ml-20">
            <Anchor className="h-6 w-6" />
            <span>Olympiada</span>
          </Link>
          <nav className="hidden md:flex gap-4 ml-auto mr-20">
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="./pages" className="text-sm font-medium hover:underline underline-offset-4">
              History
            </Link>
            <Link href="#activities" className="text-sm font-medium hover:underline underline-offset-4">
              Activities
            </Link>
            <Link href="#accommodations" className="text-sm font-medium hover:underline underline-offset-4">
              Stay
            </Link>
            <Link href="#gallery" className="text-sm font-medium hover:underline underline-offset-4">
              Gallery
            </Link>
            <Link href="#dining" className="text-sm font-medium hover:underline underline-offset-4">
              Dining
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh]">
          <Image
            src="/assets/banner.jpg"
            alt="Olympiada Village"
            layout="fill"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to Olympiada
            </h1>
            <p className="mt-4 max-w-2xl text-lg sm:text-xl">
              Discover the hidden gem of the Mediterranean coast, where history meets natural beauty
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="#accommodations">Book Your Stay</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 text-white hover:bg-white/20">
                <Link href="#about">Explore</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Our Village</h2>
                <p className="mt-4 text-muted-foreground">
                  Nestled along the pristine coastline, Olympiada is a charming village that offers a perfect blend of
                  traditional Greek culture, stunning natural landscapes, and modern amenities. Named after Alexander
                  the Great's mother, Olympias, our village has a rich history dating back to ancient times.
                </p>
                <p className="mt-4 text-muted-foreground">
                  With crystal-clear waters, golden sandy beaches, and lush green mountains as a backdrop, Olympiada
                  provides the ideal setting for a relaxing and memorable vacation. Our friendly locals welcome visitors
                  with open arms and are eager to share their traditions and way of life.
                </p>
                <div className="mt-6 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>Halkidiki Peninsula, Northern Greece</span>
                </div>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="Olympiada Village View"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section id="history" className="bg-slate-50 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <History className="mx-auto h-10 w-10 text-blue-600" />
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Rich in History</h2>
              <p className="mt-4 text-muted-foreground">
                Explore the fascinating past of Olympiada, from ancient Stagira to modern times
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-bold">Ancient Stagira</h3>
                <p className="mt-2 text-muted-foreground">
                  Just a short distance from Olympiada lies Ancient Stagira, the birthplace of Aristotle, one of
                  history's greatest philosophers. Explore the archaeological site and walk in the footsteps of this
                  influential thinker.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-bold">Byzantine Era</h3>
                <p className="mt-2 text-muted-foreground">
                  During the Byzantine period, the region flourished as an important cultural and religious center.
                  Discover the remnants of Byzantine churches and monasteries that dot the landscape around Olympiada.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-bold">Modern Revival</h3>
                <p className="mt-2 text-muted-foreground">
                  In recent decades, Olympiada has transformed from a quiet fishing village into a beloved destination
                  that carefully balances tourism with preserving its authentic character and traditions.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button asChild variant="outline">
                <Link href="#history">Learn More About Our History</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section id="activities" className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <Boat className="mx-auto h-10 w-10 text-blue-600" />
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Summer Activities</h2>
              <p className="mt-4 text-muted-foreground">
                From relaxing on pristine beaches to exploring ancient ruins, Olympiada offers activities for everyone
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Swimming"
                  width={600}
                  height={400}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-bold">Swimming & Sunbathing</h3>
                  <p className="mt-2">Enjoy our crystal-clear waters and golden sandy beaches</p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Hiking"
                  width={600}
                  height={400}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-bold">Hiking & Nature Walks</h3>
                  <p className="mt-2">Explore scenic trails through olive groves and coastal paths</p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Water Sports"
                  width={600}
                  height={400}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-bold">Water Sports</h3>
                  <p className="mt-2">Try kayaking, paddleboarding, and snorkeling in our bay</p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Archaeological Tours"
                  width={600}
                  height={400}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-bold">Archaeological Tours</h3>
                  <p className="mt-2">Visit Ancient Stagira and other historical sites nearby</p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Boat Tours"
                  width={600}
                  height={400}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-bold">Boat Tours</h3>
                  <p className="mt-2">Discover hidden coves and beaches along the coastline</p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Local Festivals"
                  width={600}
                  height={400}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-bold">Local Festivals</h3>
                  <p className="mt-2">Experience traditional Greek celebrations and music</p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button asChild>
                <Link href="#activities">View All Activities</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Accommodations Section */}
        <section id="accommodations" className="bg-slate-50 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <Calendar className="mx-auto h-10 w-10 text-blue-600" />
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Where to Stay</h2>
              <p className="mt-4 text-muted-foreground">
                From cozy family-run guesthouses to modern apartments, find your perfect accommodation in Olympiada
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card shadow-sm">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Beachfront Villa"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">Beachfront Villa</h3>
                  <p className="mt-2 text-muted-foreground">
                    Luxurious villa with direct beach access, perfect for families or groups
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                      <span>Up to 8 guests</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                      <span>Private pool</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                      <span>Fully equipped kitchen</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Button className="w-full">Book Now</Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card shadow-sm">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Traditional Guesthouse"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">Traditional Guesthouse</h3>
                  <p className="mt-2 text-muted-foreground">
                    Charming rooms in a family-run guesthouse with authentic Greek hospitality
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                      <span>Double or twin rooms</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                      <span>Homemade breakfast</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                      <span>Garden terrace</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Button className="w-full">Book Now</Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card shadow-sm">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Modern Apartments"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">Modern Apartments</h3>
                  <p className="mt-2 text-muted-foreground">
                    Contemporary apartments with all amenities, just a short walk from the beach
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                      <span>1-3 bedroom options</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                      <span>Fully equipped kitchen</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                      <span>Sea view balconies</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Button className="w-full">Book Now</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button asChild variant="outline">
                <Link href="#accommodations">View All Accommodations</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <Camera className="mx-auto h-10 w-10 text-blue-600" />
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Gallery</h2>
              <p className="mt-4 text-muted-foreground">Explore the beauty of Olympiada through our photo gallery</p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              <div className="group relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Olympiada Beach"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="group relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Village View"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="group relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Traditional Food"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="group relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Ancient Stagira"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="group relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Sunset View"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="group relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Local Festival"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="group relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Mountain View"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="group relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Beach Activities"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button asChild>
                <Link href="#gallery">View Full Gallery</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Dining Section */}
        <section id="dining" className="bg-slate-50 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <Utensils className="mx-auto h-10 w-10 text-blue-600" />
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Beach Bars & Restaurants
              </h2>
              <p className="mt-4 text-muted-foreground">
                Savor authentic Greek cuisine and refreshing drinks with stunning sea views
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card shadow-sm">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Seaside Taverna"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">Seaside Taverna</h3>
                  <p className="mt-2 text-muted-foreground">
                    Traditional Greek taverna serving fresh seafood and local specialties
                  </p>
                  <div className="mt-4 flex items-center gap-1">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-sm text-muted-foreground">(120 reviews)</span>
                  </div>
                  <div className="mt-4">
                    <Button asChild variant="outline" className="w-full">
                      <Link href="#dining">View Menu</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card shadow-sm">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Blue Wave Beach Bar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">Blue Wave Beach Bar</h3>
                  <p className="mt-2 text-muted-foreground">
                    Trendy beach bar offering cocktails, light meals, and sunset views
                  </p>
                  <div className="mt-4 flex items-center gap-1">
                    <span className="text-yellow-500">★★★★☆</span>
                    <span className="text-sm text-muted-foreground">(85 reviews)</span>
                  </div>
                  <div className="mt-4">
                    <Button asChild variant="outline" className="w-full">
                      <Link href="#dining">View Menu</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card shadow-sm">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Olive Garden Restaurant"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">Olive Garden Restaurant</h3>
                  <p className="mt-2 text-muted-foreground">
                    Elegant dining experience with Mediterranean cuisine and local wines
                  </p>
                  <div className="mt-4 flex items-center gap-1">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-sm text-muted-foreground">(98 reviews)</span>
                  </div>
                  <div className="mt-4">
                    <Button asChild variant="outline" className="w-full">
                      <Link href="#dining">View Menu</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button asChild>
                <Link href="#dining">View All Dining Options</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-16 text-white md:py-24">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Plan Your Visit to Olympiada
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              Experience the magic of our coastal village. Book your stay now and create memories that will last a
              lifetime.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Link href="#accommodations">Book Accommodation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-blue-700">
                <Link href="#contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-slate-50 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                <Anchor className="h-6 w-6" />
                <span>Olympiada</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                A charming coastal village in Halkidiki, Greece, offering natural beauty, rich history, and authentic
                experiences.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#history" className="text-sm text-muted-foreground hover:text-foreground">
                    History
                  </Link>
                </li>
                <li>
                  <Link href="#activities" className="text-sm text-muted-foreground hover:text-foreground">
                    Activities
                  </Link>
                </li>
                <li>
                  <Link href="#accommodations" className="text-sm text-muted-foreground hover:text-foreground">
                    Stay
                  </Link>
                </li>
                <li>
                  <Link href="#gallery" className="text-sm text-muted-foreground hover:text-foreground">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="#dining" className="text-sm text-muted-foreground hover:text-foreground">
                    Dining
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Contact</h3>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Olympiada, Halkidiki, Greece</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-4 w-4">✉️</span>
                  <span>info@olympiada-village.gr</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-4 w-4">📞</span>
                  <span>+30 23760 51234</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="mt-4 flex gap-4">
                <Link href="#" className="rounded-full bg-slate-200 p-2 hover:bg-slate-300">
                  <span className="sr-only">Facebook</span>
                  <span className="h-5 w-5">📱</span>
                </Link>
                <Link href="#" className="rounded-full bg-slate-200 p-2 hover:bg-slate-300">
                  <span className="sr-only">Instagram</span>
                  <span className="h-5 w-5">📸</span>
                </Link>
                <Link href="#" className="rounded-full bg-slate-200 p-2 hover:bg-slate-300">
                  <span className="sr-only">Twitter</span>
                  <span className="h-5 w-5">🐦</span>
                </Link>
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link href="#newsletter">Subscribe to Newsletter</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Olympiada Village. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

