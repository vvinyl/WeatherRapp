// import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import './Content.Module.css';
import {Card, Button, InputGroup, Form} from 'react-bootstrap'
import {useState} from 'react';

export const Content = () => {
    const [city, setCity] = useState('');

    const [weatherData, setWeatherData] = useState(null);

    const handleSearch = async () => {
        if(!city) {
            return;
        }

        try {
            const apiKey = 'f6f720a0ef65ae2ccc4a2dbecd1a0ef3';
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

            if(!response.ok){
                throw new Error("Nie udało się pobrac danych pogodowych.")
            }

            const data = await response.json();
            setWeatherData(data);
        }catch(err){
            console.error("Błąd pobierania danych pogodowych: ", err);
            setWeatherData(null)
        }
    }



  return (
    <Card className="mainCard">
        <Card.Header>
        <InputGroup className="mb-3">
               <Form.Control
                 placeholder="Wpisz miasto"
                 value={city}
                 onChange={(e) => setCity(e.target.value)}
               />
               <Button onClick={handleSearch}>
                 Szukaj
               </Button>
             </InputGroup>
        </Card.Header>
        <Card.Body>
        {weatherData && (
            <>
                <p>Temp: {weatherData.main.temp}</p>
                <p>Wiatr: {weatherData.wind.speed}</p>
            </>
        )}
        </Card.Body>
    </Card>
  );
};
