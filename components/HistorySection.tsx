"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { History, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// History section content type
type HistoricalPeriod = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  facts: string[];
};

export default function HistorySection() {
  const { t, locale } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openSections, setOpenSections] = useState<{ timeline: boolean }>({
    timeline: false,
  });

  // Add historical period details for the popup
  const historicalPeriods: HistoricalPeriod[] = [
    {
      title: "General",
      shortDescription: "A brief overview of Olympiada's history",
      fullDescription:
        "The village was established in 1923, by Greek refugees from Minor Asia. The name is due to mother of Alexander the Great, Olympias, who was exiled in Ancient Stageira (even though others say she was exiled in Kafkanas Island).",
      image: "/assets/gallery/image4.jpg",
      facts: [
        "Established in 1923 by Greek refugees",
        "Named after Olympias, mother of Alexander the Great",
        "Located near the ancient city of Stageira",
        "Rich in archaeological and cultural heritage",
        "Beautiful natural surroundings with beaches and mountains",
      ],
    },
    {
      title: "Ancient Stagira",
      shortDescription: "Birthplace of Aristotle and important ancient city",
      fullDescription:
        "Ancient Stagira is known for being the birthplace of Aristotle, the greatest philosopher of ancient times and the tutor of Alexander the Great. The city was founded in ca. 655 B.C. by colonists from the island of Andros. Down to the Persian Wars, Stagira was a free, independent and prosperous city. After the Persians retreated, it became an ally both to the Athenians and later to the Spartans until the city was occupied by king Philip II of Macedon in 349 B.C. A few years after the destruction, however, Philip himself repopulated the city in return for Aristotle’s, tutoring of his son Alexander. Yet Stagira never recovered its former brilliance and it is henceforth mentioned by ancient authors only on a few occasions, invariably in connection with the great philosopher. An enchanting later written tradition records that after Aristotle died, the inhabitants of Stagira transferred and buried his relics inside the city, in a place called “the Aristoteleion”, a large altar was erected on his grave, and an annual festival was instituted in his honour, called the 'Aristoteleia'.",
      image: "/assets/ancientstageira/primer.jpg",
      facts: [
        "Birthplace of Aristotle, the philosopher",
        "Founded around 655 B.C. by colonists from Andros",
        "Independent city-state until conquered by Philip II",
        "Known for its annual festival in honor of Aristotle",
        "Archaeological site with ruins and artifacts",
      ],
    },
    {
      title: "Kafkanas Island",
      shortDescription: "Exiled Olympias and Byzantine influence",
      fullDescription:
        "Kafkanas Island is a small island across Olympiada. It is also known by its ancient name Kapros which was also the name of they bay and Stageira's port, Kapros Limani. According to legend, Olympias, the fourth wife of Philip II of Macedon and mother of Alexander the Great, was exiled to this island by Cassander, after he had defeated and captured her at Pydna in 316 B.C.",
      image: "/assets/gallery/image3.jpg",
      facts: [
        "Small island near Olympiada",
        "Ancient name: Kapros",
        "Legendary exile of Olympias",
        "Historical significance as a port of Stageira",
        "Part of the region's rich Byzantine heritage",
      ],
    },
  ];

  // Effect for mobile detection
  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initially
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <section id="history" className="bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <History className="mx-auto h-10 w-10 text-blue-600" />
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Rich in History
          </h2>
          <p className="mt-4 text-muted-foreground">
            Explore the fascinating past of Olympiada, from ancient Stagira to
            modern times
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold">Ancient Stagira</h3>
            <p className="mt-2 text-muted-foreground">
              Just a short distance from Olympiada lies Ancient Stagira, the
              birthplace of Aristotle, one of history's greatest philosophers.
              Explore the archaeological site and walk in the footsteps of this
              influential thinker.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold">Byzantine Era</h3>
            <p className="mt-2 text-muted-foreground">
              During the Byzantine period, the region flourished as an important
              cultural and religious center. Discover the remnants of Byzantine
              churches and monasteries that dot the landscape around Olympiada.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold">Modern Revival</h3>
            <p className="mt-2 text-muted-foreground">
              In recent decades, Olympiada has transformed from a quiet fishing
              village into a beloved destination that carefully balances tourism
              with preserving its authentic character and traditions.
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
            Learn More About Our History
          </Button>
        </div>
      </div>

      {/* History Detailed Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className={
            isMobile
              ? "sm:max-w-[90%] max-h-[85vh] overflow-y-auto"
              : "sm:max-w-[800px] md:max-w-[900px] max-h-[80vh] overflow-y-auto"
          }
        >
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl">
              The Rich History of Olympiada
            </DialogTitle>
            <DialogDescription>
              Discover the fascinating historical journey of our village through
              the ages
            </DialogDescription>
          </DialogHeader>

          <div className="my-6">
            <Accordion type="single" collapsible className="w-full">
              {historicalPeriods.map((period, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium py-4">
                    <div className="w-full text-left flex flex-col sm:flex-row sm:items-baseline">
                      <span className="sm:w-40 font-medium flex-shrink-0">
                        {period.title}
                      </span>
                      <span className="text-sm text-muted-foreground mt-1 sm:mt-0">
                        {period.shortDescription}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <div className="relative h-52 w-full">
                        <Image
                          src={period.image}
                          alt={period.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>

                      <div className="mt-4">
                        <p className="text-muted-foreground">
                          {period.fullDescription}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-blue-600 mb-2">
                          Key Facts
                        </h4>
                        <ul className="space-y-1">
                          {period.facts.map((fact, i) => (
                            <li key={i} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Collapsible Historical Timeline */}
          <div className="mt-6 border-t pt-6">
            <div className="rounded-md border overflow-hidden">
              <button
                onClick={() =>
                  setOpenSections({
                    ...openSections,
                    timeline: !openSections.timeline,
                  })
                }
                className="w-full p-4 flex justify-between items-center text-left bg-gray-50 hover:bg-gray-100"
              >
                <h3 className="text-lg font-medium">Historical Timeline</h3>
                {openSections.timeline ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0" />
                )}
              </button>

              {openSections.timeline && (
                <div className="p-4 border-t">
                  <div className="space-y-8 relative">
                  <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-blue-200 transform md:translate-x-[-1px]"></div>

                    {/* 655 BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                        <div className="font-bold">655 BC</div>
                        <p className="text-sm text-muted-foreground">
                          Stageira founded on the North Hill of the Liotopi peninsula by colonists from Andros, later joined by settlers from Chalcis, Euboea.
                        </p>
                      </div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                      </div>
                    </div>

                    {/* 6th century BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                        <div className="font-bold">6th century BC</div>
                        <p className="text-sm text-muted-foreground">
                          Stageira mints its own coins. A number of substantial buildings added, including a large Archaic temple.
                        </p>
                      </div>
                    </div>

                    {/* 514-513 BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                        <div className="font-bold">514 - 513 BC</div>
                        <p className="text-sm text-muted-foreground">
                          Megabazos, a general of Persian king Darius I, conquers Thrace.
                        </p>
                      </div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                      </div>
                    </div>

                    {/* 500 BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                        <div className="font-bold">Around 500 BC</div>
                        <p className="text-sm text-muted-foreground">
                          The city walls extended around the North Hill.
                        </p>
                      </div>
                    </div>

                    {/* 492-490 BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                        <div className="font-bold">492 - 490 BC</div>
                        <p className="text-sm text-muted-foreground">
                          The first Persian invasion of Greece. Mardonius, son-in-law of King Darius, reconquers Thrace and Halkidiki and subjugates Macedon.
                        </p>
                      </div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                      </div>
                    </div>

                    {/* 490 BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                        <div className="font-bold">490 BC</div>
                        <p className="text-sm text-muted-foreground">
                          Darius' second attack on Greece is repulsed at the Battle of Marathon.
                        </p>
                      </div>
                    </div>

                    {/* 483-479 BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                        <div className="font-bold">483 - 479 BC</div>
                        <p className="text-sm text-muted-foreground">
                          The second Persian invasion of Greece. Xerxes builds a canal across the isthmus between Halkidiki and the Athos peninsula.
                        </p>
                      </div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                      </div>
                    </div>

                    {/* 480 BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                        <div className="font-bold">480 BC</div>
                        <p className="text-sm text-muted-foreground">
                          Xerxes I arrives in Halkidiki with his invasion army, marching past Stageira. The Persians are defeated at the naval Battle of Salamis.
                        </p>
                      </div>
                    </div>

                    {/* 479 BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                        <div className="font-bold">479 BC</div>
                        <p className="text-sm text-muted-foreground">
                          Xerxes returns to Asia. Mardonius is defeated at the Battle of Plataea. The last Persian forces are driven out of Thrace.
                        </p>
                      </div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                      </div>
                    </div>

                    {/* 477 BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                        <div className="font-bold">Around 477 BC</div>
                        <p className="text-sm text-muted-foreground">
                          Stageira becomes a member of the Delian League, an anti-Persian alliance headed by Athens.
                        </p>
                      </div>
                    </div>

                    {/* 430 BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                        <div className="font-bold">Around 430 BC</div>
                        <p className="text-sm text-muted-foreground">
                          The Halkidikian city of Olynthos forms the "Chalcidian League" in defiance of the Delian League. Stageira may have become a member.
                        </p>
                      </div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                      </div>
                    </div>

                    {/* 424 BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                        <div className="font-bold">424 BC</div>
                        <p className="text-sm text-muted-foreground">
                          The Spartan general Brasidas persuades Stageira and other cities of Halkidiki to revolt against Athens and the Delian League.
                        </p>
                      </div>
                    </div>

                    {/* 384 BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                        <div className="font-bold">384 BC</div>
                        <p className="text-sm text-muted-foreground">
                          The philosopher Aristotle is born in Stageira.
                        </p>
                      </div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                      </div>
                    </div>

                    {/* 348 BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                        <div className="font-bold">348 BC</div>
                        <p className="text-sm text-muted-foreground">
                          Philip II of Macedon conquers Halkidiki. He destroys Stageira and sells its inhabitants into slavery.
                        </p>
                      </div>
                    </div>

                    {/* 343 BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                        <div className="font-bold">343 BC</div>
                        <p className="text-sm text-muted-foreground">
                          Aristotle appointed by Philip II to be the tutor to his son Alexander (later Alexander the Great). Either Philip or Alexander rebuilds Stageira.
                        </p>
                      </div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                      </div>
                    </div>

                    {/* 316 BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                        <div className="font-bold">316 BC</div>
                        <p className="text-sm text-muted-foreground">
                          According to legend, Olympias, the mother of Alexander the Great is imprisoned in Stageira or on the island of Kapros by Cassander.
                        </p>
                      </div>
                    </div>

                    {/* 300 BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                        <div className="font-bold">Around 300 BC</div>
                        <p className="text-sm text-muted-foreground">
                          The mines around Stageira have been dug as far as the ground water level, beyond which it becomes impossible to excavate ore.
                        </p>
                      </div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                      </div>
                    </div>

                    {/* 168 BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                        <div className="font-bold">168 BC</div>
                        <p className="text-sm text-muted-foreground">
                          Macedonia is conquered by Rome.
                        </p>
                      </div>
                    </div>

                    {/* 7 BC */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                        <div className="font-bold">Around 7 BC</div>
                        <p className="text-sm text-muted-foreground">
                          The Greek geographer Strabo reports that Stageira is deserted.
                        </p>
                      </div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                      </div>
                    </div>

                    {/* 10th-11th centuries */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                        <div className="font-bold">10th-11th centuries AD</div>
                        <p className="text-sm text-muted-foreground">
                          Middle Byzantine fortress built on the North Hill of Stageira, which by this time is known as Livasdias or Lipsada.
                        </p>
                      </div>
                    </div>

                    {/* 1430 AD */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                        <div className="font-bold">1430 AD</div>
                        <p className="text-sm text-muted-foreground">
                          Ottoman Turks conquer Halkidiki. Gold and silver mining in the Stageira area continues through the Ottoman period.
                        </p>
                      </div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                      </div>
                    </div>

                    {/* 1912 */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                        <div className="font-bold">1912</div>
                        <p className="text-sm text-muted-foreground">
                          Macedonia gains independence from Ottoman Turkey and becomes part of the modern Greek state.
                        </p>
                      </div>
                    </div>

                    {/* 1923 */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                        <div className="font-bold">1923-1924</div>
                        <p className="text-sm text-muted-foreground">
                          Greek refugees from Agia Kyriaki in Asia Minor settle in Olympiada.
                        </p>
                      </div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                      </div>
                    </div>

                    {/* 1968 */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                        <div className="font-bold">1968</div>
                        <p className="text-sm text-muted-foreground">
                          Following the chance find of a kouros statue, Dr. Fotios Petsas makes the first excavations at Ancient Stageira.
                        </p>
                      </div>
                    </div>

                    {/* 1990 */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                        <div className="font-bold">1990</div>
                        <p className="text-sm text-muted-foreground">
                          Greek archaeologist Dr. Kostas Sismanidis leads the first systematic investigations at Stageira, confirming the site as the location of the ancient city.
                        </p>
                      </div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                      </div>
                    </div>

                    {/* 1999 */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                        <div className="font-bold">1999</div>
                        <p className="text-sm text-muted-foreground">
                          Dr. Kostas Sismanidis investigates the site of Stageira's ancient mines and discovers remains of ancient settlements.
                        </p>
                      </div>
                    </div>

                    {/* 2011 */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                        <div className="font-bold">2011</div>
                        <p className="text-sm text-muted-foreground">
                          Following administrative reform, Stageira becomes part of the Halkidiki municipality of Aristotelis (formerly Stagira-Akanthos).
                        </p>
                      </div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                      </div>
                    </div>

                    {/* Present */}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                      <div className="md:w-1/2 md:pl-8 relative">
                        <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                        <div className="font-bold">Present Day</div>
                        <p className="text-sm text-muted-foreground">
                          Olympiada has developed into a small seaside resort. Archaeological investigations continue at the site of Ancient Stageira.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button onClick={() => setIsDialogOpen(false)} variant="outline">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
