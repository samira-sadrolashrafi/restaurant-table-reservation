"use strict";
class Reservable {
}
class Table extends Reservable {
    constructor(row, column, number, capacity) {
        super();
        this.row = row;
        this.column = column;
        this.number = number;
        this.capacity = capacity;
        this.reserved = false;
        this.selected = false;
        this.element = document.createElement('div');
        this.tableNumber = document.createElement('span');
        this.tableNumber.classList.add('table-number');
        this.tableNumber.textContent = `میز ${this.number} `;
        this.element.appendChild(this.tableNumber);
        this.element.classList.add('table');
        this.element.addEventListener('click', () => this.toggleSelect());
        this.updateUI();
    }
    toggleSelect() {
        if (this.reserved)
            return;
        this.selected = !this.selected;
        this.updateUI();
        this.showTableInfo();
    }
    getTableCapacity() {
        return this.capacity;
    }
    getTableNumber() {
        return this.number;
    }
    reserve() {
        this.reserved = true;
        this.selected = false;
        this.updateUI();
        this.showTableInfo();
    }
    showTableInfo() {
        const tableNumber = document.getElementById('tableNumber');
        tableNumber.textContent = this.getTableNumber().toString();
        const tableCapacity = document.getElementById('tableCapacity');
        tableCapacity.textContent = this.getTableCapacity().toString();
        if (this.selected === false) {
            tableNumber.textContent = "";
            tableCapacity.textContent = "";
        }
    }
    getElement() {
        return this.element;
    }
    isReserved() {
        return this.reserved;
    }
    isSelected() {
        return this.selected;
    }
    clearTables() {
        this.reserved = false;
        this.selected = false;
        this.updateUI();
    }
    updateUI() {
        this.element.classList.remove('selected', 'reserved');
        if (this.reserved) {
            this.element.classList.add('reserved');
        }
        else if (this.selected) {
            this.element.classList.add('selected');
        }
    }
}
class Restaurant {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    render(container) {
        this.items.forEach((item) => {
            if (item.getElement)
                container.appendChild(item.getElement());
        });
    }
    getReservedTables() {
        return this.items.filter((item) => typeof item.isReserved === 'function' && item.isReserved());
    }
    getSelectedTables() {
        return this.items.filter((item) => typeof item.isSelected === 'function' && item.isSelected());
    }
    getTableNumbers(tables) {
        return tables.map((table) => {
            return table.getTableNumber();
        });
    }
}
const restaurantDiv = document.getElementById('restaurant');
const restaurant = new Restaurant;
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 4; j++) {
        const table_number = (i - 1) * 4 + j;
        let table_capacity;
        if (table_number <= 4) {
            table_capacity = 2;
        }
        else if (table_number <= 8) {
            table_capacity = 4;
        }
        else {
            table_capacity = 6;
        }
        const table = new Table(i, j, table_number, table_capacity);
        restaurant.add(table);
    }
}
restaurant.render(restaurantDiv);
const reserveButton = document.getElementById('reserveButton');
reserveButton === null || reserveButton === void 0 ? void 0 : reserveButton.addEventListener('click', () => {
    const selected_tables = restaurant.getSelectedTables();
    const table_price = 500000;
    if (selected_tables.length < 1) {
        alert('لطفا حداقل یک میز انتخاب نمایید.');
        return;
    }
    const total_price = selected_tables.length * table_price;
    const selected_tables_num = restaurant.getTableNumbers(selected_tables);
    const confirmed = confirm(`شما ${selected_tables.length}  میز با شماره های ${selected_tables_num} انتخاب کردید و هزینه قابل پرداخت ${total_price.toLocaleString()} تومان است. آیا ادامه می دهید؟`);
    if (confirmed) {
        selected_tables.forEach((table) => table.reserve());
    }
});
const clearReservationsButton = document.getElementById('clearReservationsButton');
const reservationDiv = document.getElementById('reservations');
clearReservationsButton === null || clearReservationsButton === void 0 ? void 0 : clearReservationsButton.addEventListener('click', () => {
    const reserved_tables = restaurant.getReservedTables();
    if (reserved_tables.length < 1) {
        alert('میزی رزرو نشده است.');
        return;
    }
    const confirmed = confirm('آیا از پاک کردن میز های رزرو شده مطمئن هستید؟');
    if (confirmed) {
        reserved_tables.forEach((table) => table.clearTables());
        reservationDiv.innerHTML = 'میز های رزرو شده با موفقیت پاک شدند.';
    }
});
const showReservationsButton = document.getElementById('showReservationsButton');
showReservationsButton === null || showReservationsButton === void 0 ? void 0 : showReservationsButton.addEventListener('click', () => {
    const reserved_tables = restaurant.getReservedTables();
    const reserved_tables_num = restaurant.getTableNumbers(reserved_tables);
    reservationDiv.innerHTML = `تعداد میز های رزرو شده: ${reserved_tables.length}
    <br>
    شماره میز های رزرو شده: ${reserved_tables_num}`;
});
