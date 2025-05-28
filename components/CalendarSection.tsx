import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, MapPin } from 'lucide-react'; // Added MapPin for consistency
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
// Removed direct import of translations

// Define the event type structure
interface Event {
  id: string;
  titleKey: string; // Key for translation
  descriptionKey: string; // Key for translation
  date: Date;
  location: string; // Keep location potentially non-translatable or handle separately
  time: string;
  category: 'cultural' | 'sports' | 'religious' | 'local';
}

// Sample events data using translation keys
const sampleEvents: Event[] = [
  {
    id: '1',
    titleKey: 'events.sampleEvent1Title',
    descriptionKey: 'events.sampleEvent1Desc',
    date: new Date(new Date().getFullYear(), 6, 8), // July 8th
    location: 'Main Beach',
    time: '10:00 - 18:00',
    category: 'sports',
  },
  {
    id: '2',
    titleKey: 'events.sampleEvent2Title',
    descriptionKey: 'events.sampleEvent2Desc',
    date: new Date(new Date().getFullYear(), 7, 15), // August 15th
    location: 'Village Square',
    time: '20:00 - 23:00',
    category: 'cultural',
  },
  {
    id: '3',
    titleKey: 'events.sampleEvent3Title',
    descriptionKey: 'events.sampleEvent3Desc',
    date: new Date(new Date().getFullYear(), 5, 7), // July 7th
    location: 'Village Church',
    time: '09:00 - 13:00',
    category: 'religious',
  },
  {
    id: '4',
    titleKey: 'events.sampleEvent4Title',
    descriptionKey: 'events.sampleEvent4Desc',
    date: new Date(new Date().getFullYear(), 4, 28), // August 20th
    location: 'Market Street',
    time: '09:00 - 14:00',
    category: 'local',
  },
];

export default function CalendarSection() {
  const { locale, t } = useLanguage(); // Get t function
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isCalendarAnimating, setIsCalendarAnimating] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  // Function to generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    // Ensure Sunday (0) becomes 7, Monday (1) stays 1, etc.
    const firstDayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay();
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const days = [];
    const prevMonth = new Date(year, month, 0);
    const prevMonthDaysCount = prevMonth.getDate();

    // Days from previous month
    for (let i = firstDayOfWeek - 1; i > 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDaysCount - i + 1),
        isCurrentMonth: false,
      });
    }

    // Days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Days from next month (ensure 6 rows total = 42 cells)
    const totalDays = days.length;
    const daysToAdd = totalDays <= 35 ? 42 - totalDays : 35 - totalDays; // Handle 5 or 6 row months

    for (let i = 1; i <= daysToAdd; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Use built-in localization for month name
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
    // If only one event, open it directly. If multiple, maybe just highlight the day?
    if (events.length === 1) {
      setSelectedEvent(events[0]);
    } else {
        setSelectedEvent(null); // Clear selection if multiple or none
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

  // Get category name using translation
  const getCategoryName = (category: string) => {
    const key = `events.category${category.charAt(0).toUpperCase() + category.slice(1)}`;
    return t(key) || category; // Fallback to raw category name
  };

  // Get day label using translation
  const getDayLabel = (dayIndex: number) => {
    // Map index (0-6) to key suffix (Mon-Sun)
    const dayKeys = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const key = `events.day${dayKeys[dayIndex]}`;
    return t(key);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setIsCalendarAnimating(true);
    setTimeout(() => {
      if (direction === 'prev') {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
      } else {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
      }
      setIsCalendarAnimating(false);
    }, 150);
  };

  return (
    <section id="events" className="py-16 md:py-24">
      <div className="container mx-auto px-4"> {/* Added px-4 for padding */}
        <div className="mx-auto max-w-3xl text-center">
          <CalendarIcon className="mx-auto h-10 w-10 text-blue-600" />
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('events.calendarTitle')} {/* Use t function */}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t('events.calendarDescription')} {/* Use t function */}
          </p>
        </div>

        <div className="mt-10 bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleMonthChange('prev')}
              className="hover:bg-blue-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </Button>
            
            <h3 className={`text-xl font-semibold transition-opacity duration-150 ${
              isCalendarAnimating ? 'opacity-50' : 'opacity-100'
            }`}>
              {getMonthName(currentMonth)} {currentMonth.getFullYear()}
            </h3>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleMonthChange('next')}
              className="hover:bg-blue-50 transition-colors"
            >
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </Button>
          </div>

          {/* Enhanced calendar grid with hover effects */}
          <div className={`grid grid-cols-7 gap-2 transition-opacity duration-150 ${
            isCalendarAnimating ? 'opacity-50' : 'opacity-100'
          }`}>
            {/* Day headers */}
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="p-2 text-center font-medium text-gray-500 text-sm">
                {getDayLabel(Number(day))}
              </div>
            ))}
            
            {/* Calendar days with enhanced interactions */}
            {calendarDays.map((day, index) => {
              const eventsOnDate = getEventsForDate(day.date);
              const isCurrent = day.date.getMonth() === currentMonth.getMonth();
              const isHovered = hoveredDate?.toDateString() === day.date.toDateString();
              
              return (
                <div
                  key={index}
                  className={`min-h-[80px] p-2 border rounded-lg transition-all duration-200 ${
                    isCurrent 
                      ? 'bg-white hover:bg-blue-50 border-gray-200 hover:border-blue-300 cursor-pointer' 
                      : 'bg-gray-50 border-gray-100'
                  } ${isHovered ? 'shadow-md scale-105' : ''}`}
                  onMouseEnter={() => isCurrent && setHoveredDate(day.date)}
                  onMouseLeave={() => setHoveredDate(null)}
                  onClick={() => isCurrent && handleDateClick(day.date)}
                >
                  <div className={`text-right mb-1 text-xs font-medium ${isCurrent ? 'text-gray-700' : 'text-gray-400'}`}> {/* Adjusted style */}
                    <span className={`inline-flex items-center justify-center rounded-full w-6 h-6 ${ // Adjusted size/display
                      isToday(day.date) && isCurrent ? 'bg-blue-600 text-white font-semibold' : ''
                    }`}>
                      {day.date.getDate()}
                    </span>
                  </div>

                  {eventsOnDate.length > 0 && isCurrent && (
                    <div className="space-y-1 mt-1">
                      {eventsOnDate.slice(0, 2).map((event) => ( // Limit displayed events initially
                        <div
                          key={event.id}
                          className={`text-xs px-1.5 py-0.5 rounded text-white truncate cursor-pointer ${getCategoryColor(event.category)} hover:opacity-80`}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent day click when clicking event
                            handleEventClick(event);
                          }}
                          title={t(event.titleKey)} // Add tooltip
                        >
                          {t(event.titleKey)} {/* Use t function */}
                        </div>
                      ))}
                      {eventsOnDate.length > 2 && (
                           <div className="text-xs text-center text-blue-600 cursor-pointer hover:underline" onClick={(e) => { e.stopPropagation(); handleDateClick(day.date); }}>
                                +{eventsOnDate.length - 2} more
                           </div>
                       )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Calendar Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2"> {/* Centered legend */}
            <div className="flex items-center">
              <span className={`w-3 h-3 inline-block ${getCategoryColor('cultural')} rounded-full mr-1.5`}></span>
              <span className="text-xs text-gray-700">{t('events.legendCultural')}</span> {/* Use t */}
            </div>
            <div className="flex items-center">
              <span className={`w-3 h-3 inline-block ${getCategoryColor('sports')} rounded-full mr-1.5`}></span>
              <span className="text-xs text-gray-700">{t('events.legendSports')}</span> {/* Use t */}
            </div>
            <div className="flex items-center">
              <span className={`w-3 h-3 inline-block ${getCategoryColor('religious')} rounded-full mr-1.5`}></span>
              <span className="text-xs text-gray-700">{t('events.legendReligious')}</span> {/* Use t */}
            </div>
            <div className="flex items-center">
              <span className={`w-3 h-3 inline-block ${getCategoryColor('local')} rounded-full mr-1.5`}></span>
              <span className="text-xs text-gray-700">{t('events.legendLocal')}</span> {/* Use t */}
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Dialog */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="sm:max-w-lg p-4 sm:p-6 max-h-[85vh] overflow-y-auto"> {/* Adjusted padding & added max-height/overflow */}
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl font-semibold">{t(selectedEvent.titleKey)}</DialogTitle> {/* Adjusted text size */}
              <DialogDescription className="pt-1">
                <span className={`inline-block px-2 py-0.5 rounded text-white text-xs font-medium ${getCategoryColor(selectedEvent.category)}`}>
                  {getCategoryName(selectedEvent.category)}
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 sm:space-y-4 mt-4"> {/* Adjusted spacing */}
              <div className="flex items-start">
                <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-blue-600 mt-1 flex-shrink-0" /> {/* Adjusted size/margin */}
                <div>
                  <p className="font-medium text-gray-800 text-sm sm:text-base">{selectedEvent.date.toLocaleDateString(locale === 'el' ? 'el-GR' : 'en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{selectedEvent.time}</p> {/* Adjusted text size */}
                </div>
              </div>

              <div className="flex items-start">
                 <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-blue-600 mt-1 flex-shrink-0" /> {/* Adjusted size/margin */}
                <p className="text-gray-800 text-sm sm:text-base">{selectedEvent.location}</p> {/* Adjusted text size */}
              </div>

              <div>
                <h4 className="font-medium mb-1 text-gray-800 text-sm sm:text-base">{t('events.dialogDescriptionLabel')}</h4> {/* Adjusted text size */}
                <p className="text-muted-foreground text-xs sm:text-sm">{t(selectedEvent.descriptionKey)}</p> {/* Adjusted text size */}
              </div>
            </div>

            <div className="mt-5 sm:mt-6 flex justify-end"> {/* Adjusted margin top */}
              <DialogClose asChild>
                <Button variant="outline" size="sm" className="w-full sm:w-auto"> {/* Full width on mobile, adjusted size */}
                  {t('common.close')}
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}