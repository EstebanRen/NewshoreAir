export interface FlightData {
    departureStation: string;
    arrivalStation: string;
    flightCarrier: string;
    flightNumber: string;
    price: number;
}
export interface FormFlightData {
    originStation: string;
    arrivalStation: string;
    scales: string;
}
export class Journey {
    flights: Flight[];
    origin: string;
    destination: string;
    price: number;

    constructor(flights: Flight[], origin: string, destination: string, price: number) {
        this.flights = flights;
        this.origin = origin;
        this.destination = destination;
        this.price = price;
    }
}

export class Flight {
    transports: Transport;
    origin: string;
    destination: string;
    price: number;

    constructor(transports: Transport, origin: string, destination: string, price: number) {
        this.transports = transports;
        this.origin = origin;
        this.destination = destination;
        this.price = price;
    }
}

export class Transport {
    flightCarrier: string;
    flightNumber: string;

    constructor(flightCarrier: string, flightNumber: string) {
        this.flightCarrier = flightCarrier;
        this.flightNumber = flightNumber;
    }
}