abstract class Reservable{
    abstract reserve():void;
    abstract isReserved():boolean;
}


class Table extends Reservable{

    private reserved:boolean=false;
    private selected:boolean=false;
    private element: HTMLDivElement;
    private tableNumber:HTMLSpanElement;
    

    constructor(private row:number, private column:number, private number:number, private capacity:number){
        super()
        this.element=document.createElement('div') as HTMLDivElement;
        this.tableNumber=document.createElement('span') as HTMLSpanElement;
        this.tableNumber.classList.add('table-number');
        this.tableNumber.textContent=`میز ${this.number} `;
        this.element.appendChild(this.tableNumber);
        this.element.classList.add('table');
        this.element.addEventListener('click', () => this.toggleSelect());
        this.updateUI();
    }

    toggleSelect(){
        if(this.reserved) return
        this.selected =! this.selected;
        this.updateUI();
        this.showTableInfo();
    }

    getTableCapacity():number{
        return this.capacity;
    }

    getTableNumber():number{
        return this.number;
    }

    reserve(): void {
        this.reserved=true;
        this.selected=false;
        this.updateUI();
        this.showTableInfo();
    }

    showTableInfo(){
        const tableNumber=document.getElementById('tableNumber') as HTMLSpanElement;
        tableNumber.textContent=this.getTableNumber().toString();
        const tableCapacity=document.getElementById('tableCapacity') as HTMLSpanElement;
        tableCapacity.textContent=this.getTableCapacity().toString();

        if(this.selected===false){
            tableNumber.textContent="";
            tableCapacity.textContent="";
        }
    }

    getElement():HTMLDivElement{
        return this.element;
    }

    isReserved(): boolean {
        return this.reserved
    }

    isSelected(): boolean{
        return this.selected;
    }

    clearTables():void{
        this.reserved=false;
        this.selected=false;
        this.updateUI();
    }

    updateUI(){
        this.element.classList.remove('selected','reserved');
        if(this.reserved){
            this.element.classList.add('reserved');
        }else if(this.selected){
            this.element.classList.add('selected');
        }
    }
}


class Restaurant <T extends Reservable>{
    private items:T[]=[];

    add(item:T){
        this.items.push(item);
    }

    render(container:HTMLDivElement){
        this.items.forEach((item: any)=>{
            if(item.getElement) container.appendChild(item.getElement());
        })
    }

    getReservedTables():T[]{
        return this.items.filter((item:any)=>typeof item.isReserved==='function' && item.isReserved())
    }

    getSelectedTables():T[]{
        return this.items.filter((item:any)=>typeof item.isSelected==='function' && item.isSelected())
    }

    getTableNumbers(tables:any):number[]{
        return tables.map((table:any)=>{
            return table.getTableNumber()
        })
    }
}

const restaurantDiv=document.getElementById('restaurant') as HTMLDivElement;
const restaurant=new Restaurant<Table>;

for(let i = 1 ; i<=3 ; i++){
    for(let j= 1 ; j<= 4 ; j++){
            const table_number:number = (i-1) * 4 + j;
            let table_capacity:number;
            if(table_number <= 4){
                table_capacity=2;
            } else if(table_number<=8){
                table_capacity=4;
            } else {
                table_capacity=6;
            }
            const table=new Table(i,j,table_number,table_capacity);
            restaurant.add(table);
    }
}

restaurant.render(restaurantDiv);

const reserveButton=document.getElementById('reserveButton') as HTMLButtonElement;

reserveButton?.addEventListener('click',()=>{

    const selected_tables=restaurant.getSelectedTables();
    const table_price:number=500000;

    if(selected_tables.length < 1){
        alert('لطفا حداقل یک میز انتخاب نمایید.');
        return;
    }

    const total_price:number= selected_tables.length * table_price;
    const selected_tables_num:number[]=restaurant.getTableNumbers(selected_tables);
    const confirmed=confirm(`شما ${selected_tables.length}  میز با شماره های ${selected_tables_num} انتخاب کردید و هزینه قابل پرداخت ${total_price.toLocaleString()} تومان است. آیا ادامه می دهید؟`)
    
    if(confirmed){
        selected_tables.forEach((table)=>table.reserve());
    }
})


const clearReservationsButton=document.getElementById('clearReservationsButton') as HTMLButtonElement;

const reservationDiv=document.getElementById('reservations') as HTMLDivElement;

clearReservationsButton?.addEventListener('click',()=>{
    const reserved_tables=restaurant.getReservedTables();

    if(reserved_tables.length<1){
        alert('میزی رزرو نشده است.')
        return;
    }

    const confirmed=confirm('آیا از پاک کردن میز های رزرو شده مطمئن هستید؟')

    if(confirmed){
        reserved_tables.forEach((table)=> table.clearTables())
        reservationDiv.innerHTML='میز های رزرو شده با موفقیت پاک شدند.'
    }


})

const showReservationsButton=document.getElementById('showReservationsButton') as HTMLButtonElement;
showReservationsButton?.addEventListener('click',()=>{
    const reserved_tables=restaurant.getReservedTables();
    const reserved_tables_num:number[]=restaurant.getTableNumbers(reserved_tables);

    reservationDiv.innerHTML=`تعداد میز های رزرو شده: ${reserved_tables.length}
    <br>
    شماره میز های رزرو شده: ${reserved_tables_num}`
})











