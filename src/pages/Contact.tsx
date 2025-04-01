import { useState } from "react";
import { Container, TextField, Button, Typography, Card } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import useAlert from "@/store/alertStore";

export default function ContactPage() {
    const { showAlert } = useAlert()
  const [formData, setFormData] = useState({ name: "", email: "", question: "" });
  const [loading, setLoading] = useState(false);

  AOS.init({ duration: 1000 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const telegramBotToken = "7233756330:AAH_B4OyL4YYOhLmdIH-Ewbjb1loksFJ3h0";
    const chatId = "8158030030";
    const text = `📩 Yangi xabar!%0A👤 Ism: ${formData.name}%0A📧 Email: ${formData.email}%0A❓ Savol: ${formData.question}`;
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${text}`;

    try {
      await fetch(url);
      showAlert("your message have been sent successfully!", 'green')
      setFormData({ name: "", email: "", question: "" });
    } catch (error) {
        showAlert("Failure", 'red')
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", margin: "20px auto" }}>
      <Card variant="outlined" style={{ padding: "20px" }} data-aos="fade-up">
        <Typography variant="h5" gutterBottom>Contact Us</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Your Name"
            name="name"
            fullWidth
            required
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Your Email"
            name="email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Your Question"
            name="question"
            multiline
            rows={4}
            fullWidth
            required
            margin="normal"
            value={formData.question}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth disabled={loading} sx={{bgcolor : '#002E58', color : '#fff'}}>
            {loading ? "Sending..." : "Submit"}
          </Button>
        </form>
      </Card>
    </Container>
  );
}
