import { useEffect, useState } from "react";
import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import Frame from "./pages/Frame";
import AuditoriumRental from "./pages/AuditoriumRental";
import ClassroomBooking from "./pages/ClassroomBooking";
import LoginContainer from "./pages/LoginContainer";
import Invitation from "./pages/Invitation";
import EventDetails from "./pages/EventDetails";
import ContactUs from "./pages/ContactUs";
import RoomBooking from "./pages/RoomBooking";
import Cover from "./pages/Cover";
import CalendarComponent from "./components/CalendarComponent";
import AddEventForm from "./components/AddEventForm";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Login";
        metaDescription = "Login to access the booking system.";
        break;
      case "/auditorium-rental":
        title = "Auditorium Rental";
        metaDescription = "Rent an auditorium for your events.";
        break;
      case "/classroom-booking":
        title = "Classroom Booking";
        metaDescription = "Book a classroom for your sessions.";
        break;
      case "/invitation-screen":
        title = "Invitation";
        metaDescription = "Send and manage your invitations.";
        break;
      case "/events":
        title = "Events";
        metaDescription = "View event details.";
        break;
      case "/contact-us":
        title = "Contact Us";
        metaDescription = "Get in touch with us.";
        break;
      case "/room-booking":
        title = "Room Booking";
        metaDescription = "Book a room for your needs.";
        break;
      case "/calendar":
        title = "Calendar";
        metaDescription = "View and manage your calendar.";
        break;
      default:
        title = "Booking System";
        metaDescription = "Manage your bookings and events.";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector('head > meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  const handleEventAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <Routes>
      <Route path="/" element={<LoginContainer />} />
      <Route path="/frame" element={<Frame />} />
      <Route
        path="/auditorium-rental"
        element={<AuditoriumRental onAddEvent={handleEventAdded} />}
      />
      <Route path="/classroom-booking" element={<ClassroomBooking />} />
      <Route path="/invitation-screen" element={<Invitation />} />
      <Route path="/events" element={<EventDetails />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/room-booking" element={<RoomBooking />} />
      <Route path="/calendar" element={
        <>
          <CalendarComponent key={refresh} />
          <AddEventForm onEventAdded={handleEventAdded} />
        </>
      } />
    </Routes>
  );
}

export default App;
