// import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import "./Content.Module.css";
import { Card, Button, Form, Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

// gify
import Rain from "../../assets/gifs/drizzle.gif";
import Clear from "../../assets/gifs/clear.gif";
import Clouds from "../../assets/gifs/clouds.gif";
import Foggy from "../../assets/gifs/fog.gif";
import Snow from "../../assets/gifs/snow.gif";

export const Content = () => {
  const [city, setCity] = useState("");

  const [weatherData, setWeatherData] = useState(null);

  // funkcja obsługująca szukajkę wysyłająca żądanie do API
  const handleSearch = async () => {
    if (!city) {
      return;
    }

    try {
      const apiKey = "f6f720a0ef65ae2ccc4a2dbecd1a0ef3";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Nie udało się pobrac danych pogodowych.");
      }

      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    } catch (err) {
      console.error("Błąd pobierania danych pogodowych: ", err);
      setWeatherData(null);
    }
  };

  // funkcja zarządająca gifami
  const getGif = () => {
    if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
      return null;
    }

    const main = weatherData.weather[0].main;

    switch (main) {
      case "Rain":
        return Rain;
      case "Snow":
        return Snow;
      case "Drizzle":
        return Rain;
      case "Clear":
        return Clear;
      case "Clouds":
        return Clouds;
      case "Mist":
        return Foggy;
      default:
        return null;
    }
  };

  const weatherGif = getGif();

  return (
    <Container className="card">
      <Card className="mainCard">
        <Card.Body>
          <Row className="mb-4">
            <Col xs={12} md={6}>
              <Form.Control
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input"
              />
            </Col>
            <Col xs={12} md={6} className="d-flex align-items-center">
              <Button
                onClick={handleSearch}
                className="button"
              >
                Search
                <FaMagnifyingGlass className="icon"/>
              </Button>
            </Col>
          </Row>

          {weatherData && (
            <Row>
              <Col xs={12} md={6} className="details">
                <h3 style={{ fontWeight: "bold" }}>
                  {weatherData.name.toUpperCase()}
                </h3>
                <p>Temperature: {weatherData.main.temp} °C</p>
                <p>Wind: {weatherData.wind.speed} m/s</p>
                <p>Pressure: {weatherData.main.pressure} hPa</p>
              </Col>
              <Col
                xs={12}
                md={6}
                className="d-flex justify-content-center align-items-center gifColumn"
              >
                {weatherGif && (
                  <img
                    src={weatherGif}
                    alt={weatherData.weather[0].main}
                    style={{
                      borderRadius: "50%",
                      width: 300,
                      height: 300}}
                  />
                )}
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};