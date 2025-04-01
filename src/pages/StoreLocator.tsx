import { useEffect, useState } from "react";
import { Container, Card, Typography, Button } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import useAlert from "@/store/alertStore";

const center = { lat: 38.8608, lng: 65.7847 }; 
const storeLocation = { lat: 38.8615, lng: 65.7833 }; 

export default function StoreLocator() {
    const { showAlert } = useAlert()
 
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userCoords = { lat: latitude, lng: longitude };
          calculateDistance(userCoords, center);
        },
        () => showAlert("Location isn't found", "red"),
        { enableHighAccuracy: true }
      );
    } else {
          showAlert("Your browser doesn't supper geolocation",'red');
    }
  };

  const calculateDistance = (userCoords: { lat: number; lng: number }, centerCoords: { lat: number; lng: number }) => {
    const R = 6371; 
    const dLat = ((centerCoords.lat - userCoords.lat) * Math.PI) / 180;
    const dLng = ((centerCoords.lng - userCoords.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userCoords.lat * Math.PI) / 180) *
        Math.cos((centerCoords.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    setDistance(parseFloat(distance.toFixed(2))); 
  };

  return (
    <Container maxWidth="md" style={{ textAlign: "center", margin: "20px auto" }}>
      <iframe
        src={`https://www.google.com/maps?q=${storeLocation.lat},${storeLocation.lng}&output=embed`}
        width="100%"
        height="400px"
        style={{ border: 0 }}
        loading="lazy"
        title="Store Location"
      ></iframe>

      <Card variant="outlined" style={{ marginTop: "20px", padding: "20px" }} data-aos="fade-up">
        <Typography variant="h6">Do‘kon ma’lumotlari</Typography>
        <Typography variant="body1">📍 Manzil: Qarshi, O‘zbekiston</Typography>
        <Typography variant="body1">🕒 Ish vaqti: 09:00 - 22:00</Typography>
        <Typography variant="body1">📞 Telefon: +998 90 123 45 67</Typography>
        {distance !== null && (
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            🛣 Sizning joyingizdan Qarshi markazigacha: {distance} km
          </Typography>
        )}
        <Button variant="contained" color="primary" onClick={handleGetLocation} sx={{ margin: "10px auto", backgroundColor : '#002E58' }}>
          Mening joylashuvimni aniqlash
        </Button>
      </Card>
    </Container>
  );
}
