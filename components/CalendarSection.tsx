import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/context/translation';

// Define the event type structure
interface Event {
  id: string;
  title: string;
  date: Date;
  description: string;
  location: string;
  time: string;
  category: 'cultural' | 'sports' | 'religious' | 'local';
}

// Sample events data for demonstration
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Beach Volleyball Tournament',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 8),
    description: 'Annual beach volleyball tournament with teams from all over Greece.',
    location: 'Main Beach',
    time: '10:00 - 18:00',
    category: 'sports',
  },
  {
    id: '2',
    title: 'Cultural Evening',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
    description: 'Traditional Greek music, dance performances and local cuisine.',
    location: 'Village Square',
    time: '20:00 - 23:00',
    category: 'cultural',
  },
  {
    id: '3',
    title: 'Saint Kyriaki Celebration',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 7),
    description: 'Religious celebration honoring Saint Kyriaki with a special service and community gathering.',
    location: 'Village Church',
    time: '09:00 - 13:00',
    category: 'religious',
  },
  {
    id: '4',
    title: 'Local Products Fair',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
    description: 'Showcase of local products including olive oil, honey, and handcrafts.',
    location: 'Market Street',
    time: '09:00 - 14:00',
    category: 'local',
  },
];

export default function CalendarSection() {
  const { locale } = useLanguage() as { locale: 'en' | 'el' };
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Function to generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay() || 7; // Adjusting Sunday to be 7 instead of 0
    
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Create calendar grid including days from previous and next months
    const days = [];
    
    // Add days from previous month to fill the first week
    const prevMonthDays = firstDayOfWeek - 1;
    const prevMonth = new Date(year, month, 0);
    const prevMonthDaysCount = prevMonth.getDate();
    
    for (let i = prevMonthDays; i > 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDaysCount - i + 1),
        isCurrentMonth: false,
      });
    }
    
    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }
    
    // Add days from next month to complete the last week
    const totalDaysAfterLastDay = 42 - days.length; // 6 rows * 7 cols = 42 cells total
    
    for (let i = 1; i <= totalDaysAfterLastDay; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  
  const getMonthName = (date: Date) => {
    return date.toLocaleString(locale === 'el' ? 'el-GR' : 'en-US', { month: 'long' });
  };
  
  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  const getEventsForDate = (date: Date) => {
    return sampleEvents.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const events = getEventsForDate(date);
    if (events.length === 1) {
      setSelectedEvent(events[0]);
    }
  };
  
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'cultural': return 'bg-pink-500';
      case 'sports': return 'bg-green-500';
      case 'religious': return 'bg-blue-500';
      case 'local': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getCategoryName = (category: string) => {
    const categories = {
      cultural: { en: 'Cultural', el: 'Πολιτιστικό' },
      sports: { en: 'Sports', el: 'Αθλητισμός' },
      religious: { en: 'Religious', el: 'Θρησκευτικό' },
      local: { en: 'Local', el: 'Τοπικό' },
    };
    
    return categories[category as keyof typeof categories]?.[locale] || category;
  };
  
  const getDayLabel = (day: number) => {
    const days = {
      en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      el: ['Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ', 'Κυρ']
    };
    return days[locale][day];
  };
  
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  return (
    <section id="events" className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <CalendarIcon className="mx-auto h-10 w-10 text-blue-600" />
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {locale === 'en' ? 'Village Events Calendar' : 'Ημερολόγιο Εκδηλώσεων'}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {locale === 'en' 
              ? 'Discover and participate in local events happening in Olympiada'
              : 'Ανακαλύψτε και συμμετέχετε σε τοπικές εκδηλώσεις στην Ολυμπιάδα'}
          </p>
        </div>
        
        <div className="mt-10 bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={handlePreviousMonth}>&larr;</Button>
            <h3 className="text-xl font-bold">
              {getMonthName(currentMonth)} {currentMonth.getFullYear()}
            </h3>
            <Button variant="outline" onClick={handleNextMonth}>&rarr;</Button>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
              <div key={day} className="text-center py-2 font-medium text-sm">
                {getDayLabel(day)}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const events = getEventsForDate(day.date);
              return (
                <div 
                  key={index}
                  className={`min-h-[80px] p-1 border rounded ${
                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-100 text-gray-400'
                  } ${isToday(day.date) ? 'border-blue-500 border-2' : 'border-gray-200'}`}
                  onClick={() => day.isCurrentMonth && handleDateClick(day.date)}
                >
                  <div className="text-right mb-1">
                    <span className={`inline-block rounded-full w-7 h-7 text-sm ${
                      isToday(day.date) ? 'bg-blue-500 text-white' : ''
                    } text-center leading-7`}>
                      {day.date.getDate()}
                    </span>
                  </div>
                  
                  {events.length > 0 && day.isCurrentMonth && (
                    <div className="space-y-1">
                      {events.map((event) => (
                        <div 
                          key={event.id}
                          className={`text-xs p-1 rounded text-white truncate cursor-pointer ${getCategoryColor(event.category)}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEventClick(event);
                          }}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Calendar Legend */}
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center">
              <span className="w-3 h-3 inline-block bg-pink-500 rounded-full mr-1"></span>
              <span className="text-xs">{locale === 'en' ? 'Cultural' : 'Πολιτιστικά'}</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 inline-block bg-green-500 rounded-full mr-1"></span>
              <span className="text-xs">{locale === 'en' ? 'Sports' : 'Αθλητισμός'}</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 inline-block bg-blue-500 rounded-full mr-1"></span>
              <span className="text-xs">{locale === 'en' ? 'Religious' : 'Θρησκευτικά'}</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 inline-block bg-amber-500 rounded-full mr-1"></span>
              <span className="text-xs">{locale === 'en' ? 'Local' : 'Τοπικά'}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Detail Dialog */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedEvent.title}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                <span className={`inline-block px-2 py-1 rounded text-white text-xs ${getCategoryColor(selectedEvent.category)}`}>
                  {getCategoryName(selectedEvent.category)}
                </span>
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-2">
              <div className="flex items-start">
                <CalendarIcon className="w-5 h-5 mr-2 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">{selectedEvent.date.toLocaleDateString(locale === 'el' ? 'el-GR' : 'en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.time}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-600 mt-0.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <p>{selectedEvent.location}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">{locale === 'en' ? 'Description' : 'Περιγραφή'}</h4>
                <p className="text-muted-foreground">{selectedEvent.description}</p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <DialogClose asChild>
                <Button variant="outline">
                  {locale === 'en' ? 'Close' : 'Κλείσιμο'}
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}