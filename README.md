# AURA Restaurant — TypeScript Reservation System

https://samira-sadrolashrafi.github.io/restaurant-table-reservation/

A responsive Persian RTL restaurant website featuring an interactive table reservation system built with **TypeScript**.

The project combines a restaurant landing page with a client-side reservation interface where users can select tables, view their capacity, confirm reservations, review reserved tables, and clear reservations.

## Features

- Responsive Persian RTL restaurant interface
- Interactive table selection and reservation
- 12 dynamically generated restaurant tables
- Different table capacities: 2, 4, and 6 guests
- Multiple-table selection
- Automatic reservation cost calculation
- Selected and reserved table states
- Display of selected table number and capacity
- View currently reserved tables
- Clear existing reservations
- Confirmation and validation messages
- Responsive layouts for desktop, tablet, and mobile

## TypeScript Concepts

The reservation system was implemented using TypeScript and includes:

- Object-oriented programming with classes
- Abstract classes and inheritance
- Generic classes
- DOM manipulation
- Event handling

The `Reservable` abstract class defines the basic reservation behavior, while the `Table` class manages each table's information, reservation state, and UI updates.

A generic `Restaurant<T extends Reservable>` class is used to manage the restaurant's collection of tables.

## Reservation Flow

1. The application dynamically creates 12 tables.
2. Users can select one or more available tables.
3. The selected table's number and capacity are displayed.
4. The total reservation cost is calculated based on the number of selected tables.
5. After confirmation, selected tables become reserved.
6. Reserved tables can be viewed or cleared through the reservation controls.

## Tech Stack

- **TypeScript**
- **HTML5**
- **CSS3**
- **JavaScript** — compiled from TypeScript
- **Google Fonts — Vazirmatn**

## Project Structure

```text
ts_project/
├── app.ts
├── app.js
├── index.html
├── style.css
├── tsconfig.json
├── package.json
├── package-lock.json
└── .gitignore
```

## Getting Started

Install the project dependencies:

```bash
npm install
```

Compile TypeScript:

```bash
npm run build
```

For automatic compilation while developing:

```bash
npm run dev
```

Then open `index.html` in your browser.

## Notes

- This is a front-end project and does not use a backend or database.
- Reservation data is stored only in memory and resets when the page is refreshed.
- The reservation payment is simulated through a confirmation dialog; no real payment system is connected.

## Author

Samira Sadrolashrafi
